/**
 * Dropdown.Button:
 * The trigger
 * Toggles dropdown
 */

import { DropdownContext } from "@/components/ui/Dropdown";
import React, { useContext } from "react";
import { Slot } from "@radix-ui/react-slot";

interface DropdownButtonProps {
  children: React.ReactNode;
  asChild?: boolean
}

export default function DropdownButton({
  asChild = false,
  children,
  className,
}: React.ComponentProps<"button"> & DropdownButtonProps) {
  const Comp = asChild ? Slot : "button";

  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("Dropdown.Button must be used within a Dropdown provider");
  }
  const { isOpen, toggle, anchorName } = context;

  return (
    <Comp
      onClick={toggle}
      style={{ anchorName }}
      className={`relative inline-flex w-full justify-center rounded-lg hover:bg-neutral-dark/10  ${
        isOpen ? "bg-neutral-dark/10" : ""
      } ${className} `}
      aria-haspopup="menu"
      aria-expanded={isOpen ? "true" : "false"}
    >
      {children}
    </Comp>
  );
}
