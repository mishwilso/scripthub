"use client";

import { useState } from "react";
import Logo from "@/components/ui/Logo";
import IconButton from "@/components/ui/IconButton";

import { FaBars } from "react-icons/fa6";
import { CgClose } from "react-icons/cg";

import { RxDashboard } from "react-icons/rx";
import { VscLibrary } from "react-icons/vsc";
import { IoLibraryOutline } from "react-icons/io5";
import { IoBookOutline } from "react-icons/io5";
import { PiNoteLight } from "react-icons/pi";
import { BiGitBranch } from "react-icons/bi";
import { GrGroup } from "react-icons/gr";


import NavLink from "@/components/ui/NavLink";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

            //   <NavLink icon={<IoBookOutline />} label="Overview" href="/books/[bookId]/?view=overview" isOpen={isOpen}/>
            // <NavLink icon={<PiNoteLight />} label="Chapters" href="/books/[bookId]/?view=chapters" isOpen={isOpen}/>
            // <NavLink icon={<GrGroup />} label="Worldbuilding" href="/books/[bookId]/?view=worldbuilding" isOpen={isOpen}/>
            // <NavLink icon={<BiGitBranch />} label="Versions" href="/books/[bookId]/?view=versions" isOpen={isOpen}/>

  return (
    <>
      {/* Mobile Top Bar - hidden on md, fixed, top, z-50 */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-neutral-base flex items-center justify-between px-4 py-3">
        <Logo />
        <IconButton
          onClick={() => setIsOpen((prevState) => !prevState)}
          altText="Open and Close Menu"
        >
          {isOpen ? <CgClose color="#7E7065" /> : <FaBars color="#7E7065" />}
        </IconButton>
      </div>

      {/* Mobile Slide drawer - hidden fixed, z-50  inset-0 bg-neutral-base transform trans trans-0 trans-x-full*/}
      <aside
        className={`md:hidden fixed z-50 inset-y-0 left-0 w-64 bg-neutral-base transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      ></aside>

      {/* Mobile: Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/** Desktop Stuff!! */}
      <aside
        className={`hidden md:fixed md:flex md:flex-col md:inset-y-0  md:left-0 md:bg-neutral-base transition-all duration-300 ${
          isOpen ? "w-48" : "w-16"
        }`}
      >
        {/* Toglle Button - Tempor */}
        <IconButton
          onClick={() => setIsOpen((prevState) => !prevState)}
          altText="Open and Close Menu"
        >
          {isOpen ? <CgClose color="#7E7065" /> : <FaBars color="#7E7065" />}
        </IconButton>

        {/* Nav */}
        <nav className="">
            <div className="flex gap-1 px-4 py-8 border-b-2 border-neutral-dark/20">
                <Logo logoSize="w-7" nameSize="hidden"/>
                {isOpen && <Logo logoSize="hidden"/>}
            </div>

            <div className="flex flex-col gap-8 px-4 py-8">
                <NavLink icon={<RxDashboard size={18}/>} label="Dashboard" href="/dashboard" isOpen={isOpen}/>
                <NavLink icon={<VscLibrary size={18}/>} label="My Works" href="/myworks" isOpen={isOpen}/>
                <NavLink icon={<IoLibraryOutline size={18}/>} label="My Works" href="/myworks" isOpen={isOpen}/>
            </div>

            <p>Book Name</p>


            <NavLink icon={<IoBookOutline size={18}/>} label="Overview" href="/test/navtest" isOpen={isOpen}/>
            <NavLink icon={<PiNoteLight size={18}/>} label="Chapters" href="/test" isOpen={isOpen}/>
            <NavLink icon={<GrGroup size={18}/>} label="Worldbuilding" href="/test" isOpen={isOpen}/>
            <NavLink icon={<BiGitBranch size={18}/>} label="Versions" href="/test" isOpen={isOpen}/>
        </nav>
      </aside>
    </>
  );
}

/**
 * components/
└── layout/
    ├── Sidebar.tsx       # Main component with responsive logic
    ├── NavLinks.tsx      # Shared nav items
    ├── MobileTopBar.tsx  # Optional: extract if it gets complex
    └── SearchInput.tsx   # Search component
 */
