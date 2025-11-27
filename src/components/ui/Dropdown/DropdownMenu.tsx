/**
 * Dropdown.Menu:
 * The popup container
 * Positioned absolutely
 * Wraps all options
 */
import { DropdownContext } from "@/components/ui/Dropdown";
import { useContext } from "react";

interface DropdownMenuProps {
  children: React.ReactNode;
  position?: 'bottom span-right' | 'bottom span-left' | 'bottom' | 'top span-right' | 'top span-left' | 'top';
  size?: string;
}

export default function DropdownMenu({ children, position='bottom span-left', size="w-56"}: DropdownMenuProps) {
    
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error("Dropdown.Menu must be used within a Dropdown provider");
  }

  const { isOpen } = context

    const classStyle = `
    dropdown-menu ${size} rounded-md 
    bg-white-light outline-1 -outline-offset-1 outline-outline-light 
    shadow-md
    transition-all duration-200 ease-in-out
        ${isOpen 
        ? 'opacity-100 scale-100' 
        : 'visually-hidden opacity-0 scale-95 pointer-events-none'
        }
    `

  return (
    <div popover="" className={classStyle}
        style={{ positionArea: position}} role="menu">
          {children}
    </div>
  );
}
