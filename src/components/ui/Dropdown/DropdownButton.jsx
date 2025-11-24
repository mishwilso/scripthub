/**
 * Dropdown.Button:
 * The trigger
 * Toggles dropdown
 */

import { DropdownContext } from '@/components/ui/Dropdown/Dropdown'
import { useContext } from 'react'

export default function DropdownButton({children}){

    const {isOpen, toggle} = useContext(DropdownContext)

    return (
        <button onClick={toggle} className='anchor inline-flex w-full justify-center' aria-haspopup="menu" aria-expanded={isOpen ? "true" : "false"}>
            {children}
        </button>
    )
}