/**
 * Dropdown.Option:
 * Individual clickable item
 * Takes onClick, icon, danger prop
 */

import Link from "next/link";

interface DropdownOptionProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  danger?: boolean;
  disabled?: boolean;
}

export default function DropdownOption({
  children,
  href,
  onClick,
  startIcon,
  endIcon,
  danger,
  disabled,
}: DropdownOptionProps) {
  const getPaddingClasses = () => {
    if (startIcon && endIcon) return "pl-10 pr-10";
    if (startIcon) return "pl-10 pr-4";
    if (endIcon) return "pl-4 pr-10";
    return "px-4";
  };

  const classStyle = `${getPaddingClasses}`;

  return (
    <div className="relative">
      {href ? (
        <Link href={href} className={classStyle}>
          {startIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-secondary-dark/60">
              {startIcon}
            </div>
          )}
          {children}
        </Link>
      ) : (
        <button onClick={onClick}></button>
      )}
    </div>
  );
}
