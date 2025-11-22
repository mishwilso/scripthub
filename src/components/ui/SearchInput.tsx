'use client';

import { FaMagnifyingGlass } from "react-icons/fa6";


export default function SearchInput(){
    const searchStyle =
    "border rounded-l-2xl transition bg-neutral-base border-2 text-secondary-dark placeholder-secondary-dark/80 w-full";

    const buttonStyle ="border rounded-r-2xl transition bg-neutral-base border-2 text-secondary-dark border-l-2 border-l-neutral-dark pl-3 hover:bg-secondary-dark/70 hover:text-white-base"
    
    const paddingStyle = "pl-10 pr-4"

    const focusStyle =
    "focus:ring-2 focus:ring-primary-base focus:ring-opacity-50 focus:border-primary-base";
    
    return (<>
        <form action="/search" method="get" className={`flex items-center`}>
            <div className={`${searchStyle} ${focusStyle} flex py-1 px-3 items-center`}>
                <label htmlFor="search-input" className="pr-3"><FaMagnifyingGlass size={14} color="#7E7065"/></label>
                <input
                type="search"
                id="search-input"
                name="q"
                placeholder="Search for book..."
                className="bg-transparent flex-1 placeholder-neutral-dark focus:outline-none"
                />
            </div>
            <button type="submit" className={`${buttonStyle} py-1 px-3`}>Search</button>

        </form>

        </>
    )
}