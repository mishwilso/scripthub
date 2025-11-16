"use client";

import React from "react";

export default function Button({
  variant = "primary",
  size = "medium",
  onClick,
  children,
  disabled = false,
  type = "button",
}) {
  // variant: "primary" | "secondary" | "ghost" | "outline"
  // size: "small" | "medium" | "large" | "full"
  // onClick: function
  // children: text/content
  // disabled: boolean (optional)
  // type: "button" | "submit" | "reset" (optional, defaults to "button")

  const variantStyles = {
    primary: "bg-primary-base hover:bg-primary-dark text-white",
    secondary:
      "bg-neutral-base text-secondary-dark hover:bg-secondary-base hover:text-white",
    outlinePrimary:
      "bg-transparent border-2 border-primary-base text-primary-base hover:bg-primary-base hover:text-white",
    outlineSecondary:
      "bg-neutral-light border-2 border-neutral-dark text-neutral-dark hover:bg-neutral-dark hover:text-white",
  };

  const sizeStyles = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-6 py-2 text-base",
    large: "px-8 py-3 text-lg",
    full: "w-full px-4 py-2 text-base",
  };

  const baseStyle = "rounded-md  cursor-pointer";

  const transitionStyle =
    "transition delay-60 duration-300 ease-in-out hover:-translate-y-.25 hover:scale-105 hover:shadow-sm/20 motion-reduce:transition-none motion-reduce:hover:translate-y-0";

  const disabledStyle =
    "disabled:opacity-50 disabled:transition-none disabled:hover-none pointer-events-none";

  return (
    <button
      className={`
        ${baseStyle}
        ${variantStyles[variant]} 
        ${sizeStyles[size]} rounded-md 
        ${disabled ? disabledStyle : transitionStyle}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
