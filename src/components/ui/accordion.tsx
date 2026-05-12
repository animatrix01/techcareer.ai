"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import {
  Content,
  Header,
  Item,
  Root,
  Trigger,
} from "@radix-ui/react-accordion";

import { cn } from "@/lib/utils";

const Accordion = Root;

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof Item>) {
  return <Item className={cn(className)} {...props} />;
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Trigger>) {
  return (
    <Header className="flex">
      <Trigger
        className={cn(
          "flex flex-1 items-center justify-between gap-3 py-3 pr-1 text-left text-sm font-medium transition-colors outline-none",
          "hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60 [&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon
          className="size-4 shrink-0 text-muted-foreground transition-transform duration-200"
          aria-hidden
        />
      </Trigger>
    </Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Content>) {
  return (
    <Content className="overflow-hidden" {...props}>
      <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
