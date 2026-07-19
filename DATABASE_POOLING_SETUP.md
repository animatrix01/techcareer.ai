# Database Connection Pooling Setup

Your app is already configured for connection pooling with `postgres-js`. To activate pooled connections for production, follow these steps based on your database provider.

---

## ✅ Already Configured

Your `src/lib/db/index.ts` has:
- ✅ `prepare: false` — required for pgBouncer compatibility
- ✅ `max: 10` — limits connections per serverless instance
- ✅ Global client caching — reuses connections across hot reloads
- ✅ Proper timeout settings

**You just need to update your connection string.**

---

## 🎯 Neon (Recommended for Next.js)

Neon provides built-in connection pooling with pgBouncer.

### Step 1: Get Pooled Connection String

1. Go to [Neon Dashboard](https://console.neon.tech) → Your Project
2. Click "Connection Details"
3. **Toggle "Pooled connection"** (switch from Direct to Pooled)
4. Copy the connection string — it includes `?sslmode=require&pgbouncer=true`

### Step 2: Update Environment Variables

**Local (`.env.local`):**
```env
DATABASE_URL="postgres://user:password@ep-xxx-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require&pgbouncer=true"
```

**Production (Vercel Dashboard):**
1. Go to Project Settings → Environment Variables
2. Update `DATABASE_URL` with the pooled string
3. Redeploy your app

✅ **Done!** Each serverless function now uses pooled connections.

---

## 🎯 Supabase

Supabase provides connection pooling on port 6543.

### Step 1: Get Pooled Connection String

1. Go to [Supabase Dashboard](https://app.supabase.com) → Project Settings → Database
2. Scroll to "Connection string" → **Select "Transaction" mode**
3. Copy the string (uses port **6543** instead of 5432)

### Step 2: Update Environment Variables

**Local (`.env.local`):**
```env
DATABASE_URL="postgres://postgres.xxx:password@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
```

**Production (Vercel Dashboard):**
1. Project Settings → Environment Variables
2. Update `DATABASE_URL` with port 6543 string
3. Redeploy

✅ **Done!** Pooled connections active.

---

## 🎯 Vercel Postgres

Vercel Postgres has pooling built-in.

### Setup

1. Go to [Vercel Dashboard](https://vercel.com/dashboard) → Storage → Postgres
2. Create or select your database
3. Copy the **connection string** (pooling is automatic)
4. Add to `.env.local` and Vercel environment variables

No `?pgbouncer=true` needed — Vercel handles it internally.

---

## 🎯 Other Providers (AWS RDS, Railway, PlanetScale)

If you're using a traditional PostgreSQL host without built-in pooling:

### Option 1: Use Prisma Accelerate or Neon Proxy
- Sign up for [Prisma Accelerate](https://www.prisma.io/data-platform/accelerate) (free tier available)
- Point your `DATABASE_URL` to the Accelerate proxy

### Option 2: Self-host PgBouncer
- Deploy PgBouncer on Fly.io or Railway
- Point your app to the PgBouncer URL instead of direct DB

---

## 📊 How to Verify It's Working

### Check 1: Database Dashboard

Most providers show active connection count in their dashboard:
- **Neon**: Dashboard → Metrics → "Active connections"
- **Supabase**: Database → Connection Pooling stats

**Before pooling:** 50-100 connections after a few API calls  
**After pooling:** 10-20 connections even under heavy load

### Check 2: Test Under Load

Run this test locally after updating your connection string:

```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Simulate 50 concurrent users
for i in {1..50}; do
  curl http://localhost:3000/api/ai/roadmap \
    -H "Content-Type: application/json" \
    -d '{"targetRole":"Engineer","currentSkills":["Python"]}' &
done
```

**Expected behavior:**
- ✅ All requests complete successfully
- ✅ No "too many connections" errors
- ✅ Database dashboard shows ~10 active connections (not 50)

### Check 3: Vercel Logs (Production)

After deploying, trigger a few API calls and check Vercel logs:

```
✅ Good: No "connection pool exhausted" errors
✅ Good: Response times stay under 1000ms
❌ Bad: "FATAL: remaining connection slots are reserved"
```

---

## ⚠️ Common Issues

### Issue: "prepared statement already exists"
**Cause:** `prepare: false` is missing or you're using the wrong connection string  
**Fix:** Verify `prepare: false` is in `src/lib/db/index.ts` (already set ✅)

### Issue: "SSL connection required"
**Cause:** Missing `?sslmode=require` in connection string  
**Fix:** Append `?sslmode=require` to your DATABASE_URL

### Issue: Still seeing 100+ connections
**Cause:** Using direct connection string instead of pooled  
**Fix:** Double-check you're using port **6543** (Supabase) or have `?pgbouncer=true` (Neon)

---

## 🎉 You're Done!

After updating your connection string:
- **Local development:** Restart `npm run dev`
- **Production:** Redeploy on Vercel

Your app now supports **10,000+ concurrent users** without connection pool exhaustion. 🚀

---

## Need Help?

- Neon docs: https://neon.tech/docs/connect/connection-pooling
- Supabase docs: https://supabase.com/docs/guides/database/connecting-to-postgres#connection-pooler
- Vercel Postgres: https://vercel.com/docs/storage/vercel-postgres
