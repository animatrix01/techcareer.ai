import { headers } from "next/headers";
import { Webhook } from "svix";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

type ClerkWebhookEvent = {
  type: string;
  data: {
    id: string;
    first_name?: string | null;
    last_name?: string | null;
    email_addresses?: Array<{
      email_address: string;
    }>;
  };
};

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Missing WEBHOOK_SECRET");
  }

  const headerPayload = await headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Error occured -- no svix headers", { status: 400 });
  }

  // ── Replay attack protection ──────────────────────────────────────────────
  // Reject webhooks older than 5 minutes to prevent captured payloads
  // being replayed later to create duplicate or fraudulent user records.
  const webhookAgeSeconds = Math.abs(Date.now() / 1000 - parseInt(svixTimestamp, 10));
  if (webhookAgeSeconds > 300) {
    return new Response("Webhook timestamp too old", { status: 400 });
  }

  const payload = await req.text();
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: ClerkWebhookEvent;
  try {
    evt = wh.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as ClerkWebhookEvent;
  } catch {
    return new Response("Error occured", { status: 400 });
  }

  if (evt.type === "user.created") {
    const id = evt.data.id;
    const emailAddress = evt.data.email_addresses?.[0]?.email_address;
    const fullName =
      `${evt.data.first_name || ""} ${evt.data.last_name || ""}`.trim() ||
      "Unknown User";

    if (!id || !emailAddress) {
      return new Response("Missing user fields", { status: 400 });
    }

    await db
      .insert(users)
      .values({ clerkUserId: id, email: emailAddress, fullName });
  }

  return new Response("User created", { status: 200 });
}
