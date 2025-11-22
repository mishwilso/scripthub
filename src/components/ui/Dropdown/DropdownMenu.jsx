/**
 * Dropdown.Menu:
 * The popup container
 * Positioned absolutely
 * Wraps all options
 */
import { DropdownContext } from '@/components/ui/Dropdown'
import { useContext } from 'react'

export default function DropdownMenu({children}){

    const {isOpen} = useContext(DropdownContext)

    return (
        <>
        {isOpen && <div className='absolute bg-secondary-base border-2 rounded-md'>
           {children} 
        </div>}
        </>
    )
}