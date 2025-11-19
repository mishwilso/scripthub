import React from "react";

interface CardProps {
  variant?: "outline" | "shadow" | "none";
  color?: "light" | "dark";
  children: React.ReactNode;
  className?: React.CSSProperties | string;
}

export default function Card({ variant = "outline", color="dark", children, className }: CardProps) {
  const colorStyles = {
    light: "bg-white-light",
    dark: "bg-white-dark"
  }
  
  const variantStyles = {
    outline: "border-2 border-outline-light",
    shadow: "shadow-md",
    none: ""
  };

  const classes = `
    w-full bg-white-light rounded-[35px]
    ${variantStyles[variant]}
    ${colorStyles[color]}
    ${className ? className : ""}
  `;

  return <div className={classes}>{children}</div>;
}
