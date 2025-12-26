"use client";

import React, { ReactNode } from "react";

interface TooltipProps {
  children: ReactNode;
  text: string;
  position?: "top" | "bottom" | "left" | "right";
  disabled?: boolean;
  className?: string;
}

export default function Tooltip({
  children,
  text,
  position = "right",
  disabled = false,
  className = "",
}: TooltipProps) {
  if (disabled) {
    return <>{children}</>;
  }

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div className="relative group">
      {children}
      <div
        className={`absolute ${positionClasses[position]} px-2 py-1 bg-neutral-dark text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 ${className}`}
      >
        {text}
      </div>
    </div>
  );
}
