import Link from 'next/link'
import {usePathname} from 'next/navigation'
import React from 'react'

interface NavLinkProps {
    icon: React.ReactNode,
    label: string,
    href: string,
    isOpen: boolean
}

export default function NavLink({icon, label, href, isOpen}:NavLinkProps) {

    const pathname = usePathname()
    const isActive:boolean = pathname === href

    const isActiveStyle = isActive ? "bg-secondary-base/10" : ""
    

    return (
        <Link 
            href={href}
            className={`flex items-center rounded hover:bg-neutral-light ${
                isOpen 
                ? "gap-3 px-3 py-2 justify-start"  // Expanded: gap + left align
                : "px-0 py-2 justify-center"        // Collapsed: centered
            }`}
            >
            <span className='text-secondary-dark flex-shrink-0'>{icon}</span>
            {isOpen && <span className='text-secondary-dark text-sm whitespace-nowrap'>{label}</span>}
        </Link>
        
    )
}