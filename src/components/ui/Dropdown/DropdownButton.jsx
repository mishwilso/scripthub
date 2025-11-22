/**
 * Dropdown.Button:
 * The trigger
 * Toggles dropdown
 */

import { DropdownContext } from '@/components/ui/Dropdown'
import { useContext } from 'react'

export default function DropdownButton({children}){

    const {toggle} = useContext(DropdownContext)

    return (
        <button onClick={toggle}>
            {children}
        </button>
    )
}