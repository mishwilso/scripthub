"use client";

import React from "react";

type InputType = "text" | "email" | "password" | "number" | "tel" | "url" | "search" | "date" | "time";
type Size = "small" | "medium" | "large";

interface InputProps {
  type?: InputType;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  id?: string;
  size?: Size;
  error?: boolean;
  disabled?: boolean;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  required?: boolean;
  autoFocus?: boolean;
}

export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  id,
  size = "medium",
  error = false,
  disabled = false,
  label,
  helperText,
  errorMessage,
  startIcon,
  endIcon,
  fullWidth = false,
  required = false,
  autoFocus = false,
}: InputProps) {
  const sizeStyles = {
    small: "py-1.5 text-sm",
    medium: "py-2 text-base",
    large: "py-3 text-lg",
  };

  // Calculate padding based on icons
  const getPaddingClasses = () => {
    if (startIcon && endIcon) return "pl-10 pr-10";
    if (startIcon) return "pl-10 pr-4";
    if (endIcon) return "pl-4 pr-10";
    return "px-4";
  };

  const baseStyle =
    "border rounded-md transition bg-white-input border-2 border-outline-input text-secondary-dark placeholder-secondary-dark/60 w-full";

  const focusStyle =
    "focus:outline-none focus:ring-2 focus:ring-primary-base focus:ring-opacity-50 focus:border-primary-base";

  const inputClasses = `
        ${baseStyle}
        ${focusStyle}
        ${sizeStyles[size]}
        ${getPaddingClasses()}
        ${disabled ? "opacity-60 cursor-not-allowed bg-neutral-light" : ""}
        ${error ? "ring-2 ring-negative-base ring-opacity-50 bg-negative-light border-negative-base" : ""}
        ${fullWidth ? "w-full" : ""}
    `.trim().replace(/\s+/g, ' ');

  return (
    <div className={`flex flex-col gap-1.5 ${fullWidth ? "w-full" : ""}`}>
      {label && (
        <label
          className={`text-sm font-medium text-secondary-dark ${required ? "after:content-['*'] after:ml-0.5 after:text-negative-base" : ""}`}
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <div className="relative">
        {startIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-secondary-dark/60">
            {startIcon}
          </div>
        )}

        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={inputClasses}
          disabled={disabled}
          required={required}
          autoFocus={autoFocus}
          aria-invalid={error}
          aria-describedby={
            error && errorMessage ? `${id}-error` : helperText ? `${id}-helper` : undefined
          }
        />

        {endIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-secondary-dark/60">
            {endIcon}
          </div>
        )}
      </div>

      {error && errorMessage && (
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
