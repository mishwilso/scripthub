import * as React from "react";

import { cn } from "@/lib/utils";

export default function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
    const baseStyle =
    "border rounded-2xl transition bg-white-input border-2 border-outline-input text-secondary-dark  placeholder-secondary-dark/60 w-full min-h-16";

  const focusStyle =
    "focus:outline-none focus:ring-2 focus:ring-primary-base focus:ring-opacity-50 focus:border-primary-base";

  
    return (

    <textarea
      data-slot="textarea"
      className={cn(focusStyle, baseStyle, 
        `resize-none border-input 
        placeholder:text-muted-foreground 
        field-sizing-content 
        px-3 py-2
        disabled:cursor-not-allowed 
        disabled:opacity-50 md:text-sm
        aria-invalid:ring-2 aria-invalid:ring-negative-base 
        aria-invalid:ring-opacity-50 aria-invalid:bg-negative-light 
        aria-invalid:border-negative-base`,        
        className
      )}
      {...props}
    />
  );
}



