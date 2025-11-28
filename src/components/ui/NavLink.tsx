import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavLinkProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isOpen: boolean;
  altText: string;
}

export default function NavLink({
  icon,
  label,
  href,
  isOpen,
  altText,
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive: boolean = pathname === href;

  const isActiveStyle = isActive ? "bg-secondary-dark/10" : "";

  return (
    <div className="relative group">
      <Link
        href={href}
        className={`relative flex items-center h-10 rounded-md hover:bg-neutral-light/50 transition-colors overflow-hidden ${isActiveStyle}`}
        aria-label={altText}
      >
        {/* Icon - stays in fixed position */}
        <span className="absolute left-2 text-secondary-dark flex items-center justify-center w-6" aria-label={altText}>
          {icon}
        </span>

        {/* Text - fades in/out, positioned after icon */}
        <span
          className={`ml-10 text-secondary-dark text-sm whitespace-nowrap transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          {label}
        </span>
      </Link>

      {/* Tooltip - only show when closed */}
      {!isOpen && (
        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-neutral-dark text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
          {label}
        </div>
      )}
    </div>
  );
}
