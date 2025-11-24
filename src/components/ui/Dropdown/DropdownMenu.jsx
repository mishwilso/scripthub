/**
 * Dropdown.Menu:
 * The popup container
 * Positioned absolutely
 * Wraps all options
 */
import { DropdownContext } from "@/components/ui/Dropdown/Dropdown";
import { useContext } from "react";

// interface DropdownMenuProps {
//   position?: 'bottom span-right' | 'bottom span-left' | 'bottom' | 'top bottom span-right' | 'top bottom span-left' | 'top'
// }

export default function DropdownMenu({ children, position='bottom span-left' }) {
    const { isOpen } = useContext(DropdownContext);

    const classStyle = `
    dropdown-menu w-56 rounded-md 
    bg-white-light outline-1 -outline-offset-1 outline-outline-light 
    shadow-md
    transition-all duration-200 ease-in-out
        ${isOpen 
        ? 'opacity-100 scale-100' 
        : 'visually-hidden opacity-0 scale-95 pointer-events-none'
        }
    `

  return (
    <div popover className={classStyle}
        style={{ positionArea: position}} role="menu" open={isOpen ? "true" : ""}>
          {children}
    </div>
  );
}
