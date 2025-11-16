"use client";

import React from "react";

export default function Button({ variant }) {
  // variant: "primary" | "secondary" | "ghost" | "outline"
  // size: "small" | "medium" | "large" | "full"
  // onClick: function
  // children: text/content
  // disabled: boolean (optional)
  // type: "button" | "submit" | "reset" (optional, defaults to "button")

  const handleClick = () => {
    console.log("Button clicked!");
    // Add your desired logic here
  };

  const variantStyles = {
    primary: "bg-primary-base hover:bg-primary-dark text-white",
    secondary: "",
    outlinePrimary: "",
    outlineSecondary: "",
  };

  return (
    <button className={`${variantStyles[variant]}`} onClick={handleClick}>
      Click Me!
    </button>
  );
}
