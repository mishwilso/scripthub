/**
 * Dropdown.Button:
 * The trigger
 * Toggles dropdown
 */

import { DropdownContext } from "@/components/ui/Dropdown";
import React, { useContext } from "react";

export default function DropdownButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("Dropdown.Button must be used within a Dropdown provider");
  }
  const { isOpen, toggle } = context;

  return (
    <button
      onClick={toggle}
      className={`anchor inline-flex w-full justify-center rounded-lg hover:bg-neutral-dark/10 ${
        isOpen ? "bg-neutral-dark/10" : ""
      } ${className} `}
      aria-haspopup="menu"
      aria-expanded={isOpen ? "true" : "false"}
    >
      {children}
    </button>
  );
}
