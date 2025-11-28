import React from "react";

interface CardProps {
  variant?: "outline" | "shadow" | "none";
  color?: "light" | "dark";
  rounded?: "sm" | "md" | "lg"
  children: React.ReactNode;
  className?: React.CSSProperties | string;
  style?: React.CSSProperties
}

export default function Card({ variant = "outline", color="dark", rounded="md", children, style, className }: CardProps) {
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

  const classes = `
    w-full bg-white-light 
    ${roundedStyles[rounded]}
    ${variantStyles[variant]}
    ${colorStyles[color]}
    ${className ? className : ""}
  `;

  return <div className={classes} style={style}>{children}</div>;
}
