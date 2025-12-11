"use client";

import React from "react";
import { cn } from "@/lib/utils";

import { Label } from "./Label";

type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "search"
  | "date"
  | "time";

interface InputProps {
  type?: InputType;
  placeholder?: string;
  label?: string;
  value?: string;
  width?: "small" | "medium" | "large";
  error?: boolean;
  helperText?: string;
  errorMessage?: string | null;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export default function Input({
  className,
  type = "text",
  width = "medium" as const,
  placeholder,
  value,
  label,
  id,
  error = false,
  helperText,
  errorMessage,
  startIcon,
  endIcon,
  required = false,
  ...props
}: InputProps & React.ComponentProps<"input">) {
  const sizeStyles = {
    small: "py-1.5 text-sm rounded-xl",
    medium: "py-2 text-base rounded-2xl",
    large: "py-3 text-lg rounded-2xl",
  };

  // Calculate padding based on icons
  const getPaddingClasses = () => {
    if (startIcon && endIcon) return "pl-10 pr-10";
    if (startIcon) return "pl-10 pr-4";
    if (endIcon) return "pl-4 pr-10";
    return "px-4";
  };

  const baseStyle =
    "border  transition bg-white-input border-2 border-outline-input text-secondary-dark placeholder-secondary-dark/60 min-w-0 w-full";

  const focusStyle =
    "focus:outline-none focus:ring-2 focus:ring-primary-base focus:ring-opacity-50 focus:border-primary-base";

  const inputClasses = `
        ${baseStyle}
        ${focusStyle}
        ${sizeStyles[width]}
        ${getPaddingClasses()}
        ${"disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-neutral-light"}
        ${" file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium "}
        ${
          error
            ? "ring-2 ring-negative-base ring-opacity-50 bg-negative-light border-negative-base"
            : ""
        }
    `;

  return (
    <div className={`space-y-2 w-full`}>

      {label && <Label htmlFor={id} required={required}>{label}</Label>}

      <div className="relative">
        {startIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-secondary-dark/60">
            {startIcon}
          </div>
        )}

        <input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          className={cn(inputClasses, className)}
          required={required}
          aria-invalid={error}
          aria-describedby={
            error && errorMessage
              ? `${id}-error`
              : helperText
              ? `${id}-helper`
              : undefined
          }
          {...props}
        />

        {endIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-secondary-dark/60">
            {endIcon}
          </div>
        )}
      </div>

      {errorMessage && (
        <p id={`${id}-error`} className="text-sm text-negative-base">
          {errorMessage}
        </p>
      )}

      {!error && helperText && (
        <p id={`${id}-helper`} className="text-sm text-secondary-dark/70">
          {helperText}
        </p>
      )}
    </div>
  );
}
