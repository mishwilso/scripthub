// TODO:
// need optional dropdown header.
// dropdown options can have dividers based on div? using tailwind divide-y for dividers :)
// make dropdown item? so i dont have to style?
// optional start icon  and end icon inclusion
// Pass in size from drop down (mainly just width.... and then seperate field for text size?)
// dropdown option can either be a link or an action...
// does dropdown open on top or the bottom? let prop decide? maybe? placement (topstart, top, topend, bottomstart, bottom, bottomend)
// could use element plus or...implement my own??

/**
Dropdown (parent):

Manages open/closed state
Provides context to children
Handles click outside
 */

import React, {
  useRef,
  useEffect,
  useState,
  useContext,
  createContext,
} from "react";
import DropdownMenu from "./Dropdown/DropdownMenu";
import DropdownButton from "./Dropdown/DropdownButton";
import DropdownOption from "./Dropdown/DropdownOption";
import DropdownDivider from "./Dropdown/DropdownDivider";
import DropdownHeader from "./Dropdown/DropdownHeader";

export interface DropdownContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: () => void;
}

export const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

export function Dropdown({ children }:{children:React.ReactNode}) {
  // Use to track the location of the dropdown
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // attach to document to handle mousedown?
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as HTMLDivElement)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
    

  }, [dropdownRef]);

  function toggle() {
    setIsOpen((prevState) => !prevState);
  }

  const contextValues : DropdownContextType = {
    isOpen,
    setIsOpen,
    toggle
  }

  return (
    <DropdownContext.Provider value={contextValues}>
      <div ref={dropdownRef} className="inline-block">
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

Dropdown.Button = DropdownButton;
Dropdown.Menu = DropdownMenu;
Dropdown.Option = DropdownOption;
Dropdown.Divider = DropdownDivider;
Dropdown.Header = DropdownHeader

export default Dropdown;
