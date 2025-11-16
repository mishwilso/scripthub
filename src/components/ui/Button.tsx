"use client";

import React from "react";

type Size = "small" | "medium" | "large" | "full";
type ButtonType = "button" | "submit" | "reset";
type Color = "primary" | "secondary" | "tertiary" | "success" | "error";
type Variant = "text" | "outlined" | "contained";

interface ButtonProps {
  color?: Color;
  variant?: Variant;
  size?: Size;
  onClick?: () => void;
  disabled?: boolean;
  type?: ButtonType;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children?: React.ReactNode;
}

export default function Button({
  color = "primary",
  variant = "contained",
  size = "medium",
  onClick,
  disabled = false,
  type = "button",
  startIcon,
  endIcon,
  children,
}: ButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Button Clicked", e.currentTarget);
    onClick?.();
  };

  const colorStyles = {
    primary: {
      contained: "bg-primary-base text-white-base hover:bg-primary-dark",
      outlined:
        "bg-transparent border-2 border-primary-base text-primary-base hover:bg-primary-base hover:text-white-base",
      text: "bg-transparent text-primary-base hover:bg-primary-base/10",
    },
    secondary: {
      contained:
        "bg-neutral-base text-secondary-dark hover:bg-secondary-base hover:text-white-base",
      outlined:
        "bg-transparent border-2 border-secondary-base text-secondary-base hover:bg-secondary-base hover:text-white-base",
      text: "bg-transparent text-secondary-base hover:bg-secondary-base/10",
    },
    tertiary: {
      contained: "bg-neutral-dark hover:bg-secondary-dark text-white-base",
      outlined:
        "bg-neutral-light border-2 border-neutral-dark text-secondary-dark hover:bg-neutral-dark hover:text-white-base",
      text: "bg-transparent text-neutral-dark hover:bg-neutral-dark/10",
    },
    success: {
      contained: "bg-green-600 hover:bg-green-700 text-white-base",
      outlined:
        "bg-transparent border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white-base",
      text: "bg-transparent text-green-600 hover:bg-green-600/10",
    },
    error: {
      contained: "bg-red-600 hover:bg-red-700 text-white-base",
      outlined:
        "bg-transparent border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white-base",
      text: "bg-transparent text-red-600 hover:bg-red-600/10",
    },
  };

  const sizeStyles = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-6 py-2 text-base",
    large: "px-8 py-3 text-lg",
    full: "w-full px-4 py-2 text-base",
  };

  const baseStyle =
    "rounded-md cursor-pointer flex items-center justify-center";

  const transitionStyle =
    "transition delay-60 duration-300 ease-in-out hover:-translate-y-.25 hover:scale-105 hover:shadow-sm/20 motion-reduce:transition-none motion-reduce:hover:translate-y-0";

  const disabledStyle =
    "disabled:opacity-50 disabled:transition-none disabled:hover-none pointer-events-none";

  return (
    <button
      className={`
        ${baseStyle}
        ${colorStyles[color][variant]}
        ${sizeStyles[size]}
        ${disabled ? disabledStyle : transitionStyle}
        gap-2`}
      onClick={handleClick}
      type={type}
      disabled={disabled}
    >
      {startIcon}
      {children}
      {endIcon}
    </button>
  );
}
