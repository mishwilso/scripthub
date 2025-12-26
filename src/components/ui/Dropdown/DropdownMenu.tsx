/**
 * Dropdown.Menu:
 * The popup container
 * Positioned absolutely
 * Wraps all options
 * Separates scrollable content from fixed footer
 */
import { DropdownContext } from "@/components/ui/Dropdown";
import { useContext, Children, isValidElement } from "react";

interface DropdownMenuProps {
  children: React.ReactNode;
  position?:
    | "bottom span-right"
    | "bottom span-left"
    | "bottom"
    | "top span-right"
    | "top span-left"
    | "top";
  size?: string;
  maxVisibleItems?: number;
}

export default function DropdownMenu({
  children,
  position = "bottom span-left",
  size = "w-56",
  maxVisibleItems,
}: DropdownMenuProps) {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error("Dropdown.Menu must be used within a Dropdown provider");
  }

  const { isOpen, anchorName } = context;

  // Separate footer children from scrollable children
  const childrenArray = Children.toArray(children);
  const footerChild = childrenArray.find(
    (child) =>
      isValidElement(child) &&
      typeof child.type !== "string" &&
      child.type.name === "DropdownFooter"
  );
  const scrollableChildren = childrenArray.filter((child) => child !== footerChild);

  // Calculate max height based on maxVisibleItems
  // Each item is approximately 44px (py-2 + text + margins)
  const getMaxHeight = () => {
    if (!maxVisibleItems) return undefined;
    const itemHeight = 44; // Approximate height per item (includes margins)
    return `${maxVisibleItems * itemHeight}px`;
  };

  const maxHeight = getMaxHeight();

  const containerClassStyle = `
    ${size} rounded-md
    bg-white-light outline-1 -outline-offset-1 outline-outline-light
    shadow-md
    transition-all duration-200 ease-in-out
    ${
      isOpen
        ? "opacity-100 scale-100"
        : "visually-hidden opacity-0 scale-95 pointer-events-none"
    }
    z-10
    flex flex-col
  `;

  const scrollableClassStyle = `
    ${maxVisibleItems ? 'overflow-y-auto' : ''}
  `;

  return (
    <div
      className={containerClassStyle}
      style={{
        positionArea: position,
        positionAnchor: anchorName,
        position: 'fixed',
        margin: '5px 0 0 5px',
      }}
      role="menu"
    >
      {/* Scrollable content area */}
      <div
        className={scrollableClassStyle}
        style={maxHeight ? { maxHeight } : undefined}
      >
        {scrollableChildren}
      </div>

      {/* Fixed footer (doesn't scroll) */}
      {footerChild}
    </div>
  );
}
