"use client";

import React from "react";
import Link from "next/link";

type Size = "small" | "medium" | "large" | "full";
type Color = "primary" | "secondary" | "tertiary" | "success" | "error";
type Variant = "text" | "outlined" | "contained";

interface LinkProps {
  color?: Color;
  variant?: Variant;
  size?: Size;
  href: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children?: React.ReactNode;
  responsive?: boolean;
}

export default function CustomLink({
  color = "primary",
  variant = "contained",
  size = "medium",
  href,
  startIcon,
  endIcon,
  children,
  responsive = true,
}: LinkProps) {
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
    small: "px-2 py-1.5 text-sm",
    medium: "px-5 py-2 text-base",
    large: "px-7 py-3 text-lg",
    full: "w-full px-4 py-2 text-base",
  };

  const baseStyle =
    "rounded-md cursor-pointer flex items-center justify-center";

  const transitionStyle =
    "transition delay-60 duration-300 ease-in-out hover:-translate-y-.25 hover:scale-105 hover:shadow-sm/20 motion-reduce:transition-none motion-reduce:hover:translate-y-0";

  const classes = `
            ${baseStyle}
            ${transitionStyle}
            ${colorStyles[color][variant]}
            ${sizeStyles[size]}
            gap-3 w-full md:w-auto
        `;

  return (
    <Link href={href} className={classes}>
      {startIcon}
      <div className={`${responsive ? "hidden  md:inline" : "inline"}`}>
        {children}
      </div>
      {endIcon}
    </Link>
  );
}
