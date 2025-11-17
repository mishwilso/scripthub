import React from "react";

interface CardProps {
  variant?: "outline" | "shadow";
  color?: "light" | "dark";
  children: React.ReactNode;
}

export default function Card({ variant = "outline", color="dark", children }: CardProps) {
  const colorStyles = {
    light: "bg-white-light",
    dark: "bg-white-dark"
  }
  
  const variantStyles = {
    outline: "border-2 border-outline-light",
    shadow: "shadow-md",
  };

  const classes = `
    bg-white-light rounded-lg p-4
    ${variantStyles[variant]}
    ${colorStyles[color]}

  `;

  return <div className={classes}>{children}</div>;
}
