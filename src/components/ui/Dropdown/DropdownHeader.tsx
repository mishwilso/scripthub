/**
 * Dropdown.Header:
 * Non-clickable section label
 */

interface DropdownHeaderProps {
  children: React.ReactNode;
}

export default function DropdownHeader({
  children,

}: DropdownHeaderProps) {

  return (
    <div className="relative flex flex-1 py-3 px-4"
    role="menuheader">
          {children}
    </div>
  );
}