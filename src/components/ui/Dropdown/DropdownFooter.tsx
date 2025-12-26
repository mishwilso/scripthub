/**
 * Dropdown.Footer:
 * Fixed footer section that doesn't scroll
 * Stays at bottom with a top divider
 */

interface DropdownFooterProps {
  children: React.ReactNode;
}

export default function DropdownFooter({ children }: DropdownFooterProps) {
  return (
    <div className="border-t border-neutral-dark/15 mt-1">
      {children}
    </div>
  );
}
