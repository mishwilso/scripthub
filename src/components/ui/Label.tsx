"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/lib/utils";

function Label({
  className,
  required = false,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root> & { required?: boolean }) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        `flex items-center text-sm leading-none font-medium text-secondary-dark 
        select-none 
        group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 
        peer-disabled:cursor-not-allowed peer-disabled:opacity-50
        ${
            required
              ? "after:content-['*'] after:ml-0.5 after:text-negative-base"
              : ""
        }`,
        className,
      )}
      {...props}
    />
  );
}

export { Label };
