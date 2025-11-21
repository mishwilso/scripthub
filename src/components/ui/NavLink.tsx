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
    <Link
      href={href}
      className={`flex items-center gap-4 py-2 px-1 rounded hover:bg-neutral-light/50 transition delay-75 duration-300 ease-in-out hover:scale-105 ${isActiveStyle}`}
      aria-label={altText}
    >
      {/* Always render icon - doesn't move */}
      <span className="text-secondary-dark flex-shrink-0 w-8 flex items-center justify-center" aria-label={altText}>
        {icon}
      </span>

      {/* Only render text when open */}
      {isOpen && (
        <span className="text-secondary-dark text-sm whitespace-nowrap">
          {label}
        </span>
      )}
    </Link>
  );
}
