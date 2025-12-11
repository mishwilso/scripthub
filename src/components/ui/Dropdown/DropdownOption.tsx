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
    if (endIcon) return "px-4 justify-between";
    return "px-2";
  };

  const disabledStyle = disabled ? "cursor-not-allowed pointer-events-none opacity-50" : "cursor-pointer"
  const dangerStyle = danger ? "text-negative-base/80 hover:text-negative-base hover:bg-negative-base/10" : "text-secondary-dark/80 hover:text-secondary-dark hover:bg-[#917F74]/15"

  const classStyle = `
  flex flex-1 py-2 
  text-sm
  hover:outline-hidden  
  rounded-md
  ${dangerStyle}
  ${disabledStyle}
  gap-3 items-center
  ${getPaddingClasses()}
  `;


  return (
    <div className="relative flex flex-1 mx-2 my-1"
    role="menuitem">
      {href ? (
        <Link href={href} className={classStyle}>
          {startIcon}
          {children}
          {endIcon}
        </Link>
      ) : (
        <button disabled={disabled} onClick={onClick} className={classStyle}>
          {startIcon}
          {children}
          {endIcon}
        </button>
      )}
    </div>
  );
}
