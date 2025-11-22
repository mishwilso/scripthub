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

import React, {useRef, useEffect, useState, useContext, createContext } from 'react';
import DropdownMenu from './DropdownMenu';
import DropdownButton from './DropdownButton';
import DropdownOption from './DropdownOption';

export const DropdownContext = createContext(undefined);


export function Dropdown({children}){

    // Use to track the location of the dropdown
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {

        // attach to document to handle mousedown?
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)){
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return (() => document.removeEventListener('mousedown', handleClickOutside))

    }, [dropdownRef])

    function toggle(){
        setIsOpen((prevState) => !prevState)
    }

    return (
        <DropdownContext.Provider value={{isOpen, setIsOpen, toggle}}>
            <div ref={dropdownRef} className='relative'>
                {children}
            </div>
        </DropdownContext.Provider>
    )

}

Dropdown.Button = DropdownButton
Dropdown.Menu = DropdownMenu
Dropdown.Option = DropdownOption

export default Dropdown

