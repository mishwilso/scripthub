"use client";

import React from "react";

type Size = "small" | "medium" | "large" | "extralarge";
type Width = "narrow" | "default" | "wide";
type ButtonType = "button" | "submit" | "reset";
type Color = "primary" | "secondary" | "error";
type Variant = "filled" | "tonal" | "outlined" | "standard";

interface IconButtonProps {
  color?: Color;
  variant?: Variant;
  size?: Size;
  width?: Width;
  onClick?: () => void;
  disabled?: boolean;
  type?: ButtonType;
  children?: React.ReactNode;
  shape?: "round" | "square";
  altText: string;
  className?: string
}

export default function IconButton({
  color = "primary",
  variant = "standard",
  size = "medium",
  width = "default",
  shape = "square",
  onClick,
  disabled = false,
  type = "button",
  children,
  altText,
  className
}: IconButtonProps) {

  const colorStyles = {
    primary: {
      standard: "bg-transparent text-secondary-dark hover:bg-neutral-dark/10",
      tonal:
        "bg-neutral-dark/10 text-secondary-dark hover:secondary-dark hover:text-white-base",
      filled:
        "bg-neutral-light text-secondary-dark hover:secondary-dark hover:text-white-base",
      outlined:
        "bg-transparent border-2 border-secondary-dark text-secondary-dark hover:bg-neutral-dark/10 hover:text-secondary-dark",
    },

    secondary: {
      standard: "bg-transparent text-primary-base hover:bg-primary-dark/10",
      tonal:
        "bg-primary-dark/10 text-primary-base hover:primary-dark hover:text-white-base",
      filled:
        "bg-primary-base text-text-white-base hover:primary-dark",
      outlined:
        "bg-transparent border-2 border-primary-base text-primary-base hover:text-primary-dark",
    },

    error: {
      standard: "bg-transparent text-red-600 hover:bg-red-700/10",
      tonal: "bg-red-700/10 text-red-600 hover:red-700 hover:text-white-base",
      filled: "bg-red-600 text-white-base hover:red-700",
      outlined:
        "bg-transparent border-2 border-red-600 text-red-600 hover:text-red-700",
    },
  };

  const shapeStyles = {
    round: "rounded-full",
    square: "rounded-lg",
  };

  const sizeStyles = {
    small: {
      narrow: "py-1.5 px-.75 text-sm",
      default: "p-1.5 text-sm",
      wide: "py-1.5 px-3 text-sm",
    },
    medium: {
      narrow: "py-2.5 px-1.25 text-base",
      default: "p-2.5 text-base",
      wide: "py-2.5 px-5 text-base",
    },
    large: {
      narrow: "py-3.5 px-1.75 text-lg",
      default: "p-3.5 text-lg",
      wide: "py-3.5 px-7 text-lg",
    },
    extralarge: {
      narrow: "py-5 px-2.5 text-xl",
      default: "p-5 text-xl",
      wide: "py-5 px-10 text-xl",
    },
  };

  const iconSizeClasses = {
    small: "text-sm",
    medium: "text-lg",
    large: "text-2xl",
    extralarge: "text-4xl",
  };

  const baseStyle = "cursor-pointer flex items-center justify-center";

  const transitionStyle =
    "transition delay-60 duration-300 ease-in-out hover:-translate-y-.25 hover:scale-105 hover:shadow-sm/20 motion-reduce:transition-none motion-reduce:hover:translate-y-0";

  const disabledStyle =
    "disabled:opacity-50 disabled:transition-none disabled:hover-none pointer-events-none";

  return (
    <button
      className={`
        ${baseStyle}
        ${colorStyles[color][variant]}
        ${sizeStyles[size][width]}
        ${disabled ? disabledStyle : transitionStyle}
        ${shapeStyles[shape]}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
      aria-label={altText}
    >
      <span className={`${iconSizeClasses[size]}`}>{children}</span>
    </button>
  );
}
