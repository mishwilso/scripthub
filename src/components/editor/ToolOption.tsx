import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Tooltip from "../ui/Tooltip";

interface ToolOptionProps {
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
  altText: string;
  onClick?: () => void;
}

export default function ToolOption({
  icon,
  label,
  isOpen,
  altText,
  onClick,
}: ToolOptionProps) {
// [#E6DBCD]
  return (
    <Tooltip text={label} position="left" disabled={isOpen}>
      <button
        className={`relative flex items-center group justify-between h-10 hover:bg-[#E6DBCD] py-7 overflow-hidden gap-3 w-full px-2 transition-colors delay-60 duration-500 `}
        aria-label={altText}
        onClick={onClick}
      >
        <div className="flex items-center gap-3">
          {/* Icon - stays in fixed position */}
          <span className="bg-[#E6DBCD] border-2 border-[#E6DBCD] group-hover:bg-neutral-light group-hover:border-secondary-dark/75 transition-colors delay-60 duration-500 ml-2 text-secondary-dark flex items-center justify-center p-2 shrink-0 rounded-lg" aria-label={altText}>
            {icon}
          </span>

          {/* Text - fades in/out, positioned after icon */}
          <span
            className={`text-secondary-dark text-sm whitespace-nowrap transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            {label}
          </span>
        </div>

        {/* Right arrow - only show when open */}
        {isOpen && (
          <span className="mr-3 text-secondary-dark">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        )}
      </button>
    </Tooltip>
  );
}
