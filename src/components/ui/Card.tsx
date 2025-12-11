// Todo. Have Card extend on a div


import React from "react";
import { cn } from '@/lib/utils'

interface CardProps {
  variant?: "outline" | "shadow" | "none";
  color?: "light" | "dark";
  rounded?: "sm" | "md" | "lg"
}

export default function Card({ className, variant = "outline", color="dark", rounded="md", children, ...props }: React.ComponentProps<"div"> & CardProps) {
  const colorStyles = {
    light: "bg-white-light",
    dark: "bg-white-dark"
  }
  
  const variantStyles = {
    outline: "border-2 border-outline-light",
    shadow: "shadow-md",
    none: ""
  };

  const roundedStyles = {
    sm: "rounded-[18px]",
    md: "rounded-[35px]",
    lg: ""
  };

  const classStyles = `
    w-full bg-white-light 
    ${roundedStyles[rounded]}
    ${variantStyles[variant]}
    ${colorStyles[color]}
  `;

  return <div className={cn(classStyles, className)} {...props}>{children}</div>;
}
