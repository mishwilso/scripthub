"use client";

import * as React from "react";
// Grab Checkbox primitive to base our cutom checkbox on
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { FaCheck } from "react-icons/fa";

import { cn } from "@/lib/utils";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    // peer clas in tailwind enable syou to style sibling elements based ont he state of a "peer" elemnt. In this case our peer in input type checkbox
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        `peer bg-white-input data-[state=checked]:bg-white-input
        data-[state=checked]:text-primary-base  data-[state=checked]:border-outline-input 
        focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
        aria-invalid:ring-negative-base/20 aria-invalid:border-negative-base 
        size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none  border-2 border-outline-input
        disabled:cursor-not-allowed disabled:opacity-50"`,       
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <FaCheck className="size-2.5" color="#B65733"/>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
