"use client";

import { useState } from "react";
import Logo from "@/components/ui/Logo";
import IconButton from "@/components/ui/IconButton";

import { FaBars } from "react-icons/fa6";
import { CgClose } from "react-icons/cg";

import { RxDashboard } from "react-icons/rx";
import { VscLibrary } from "react-icons/vsc";
import { IoBookOutline } from "react-icons/io5";
import { PiNoteLight } from "react-icons/pi";
import { BiGitBranch } from "react-icons/bi";
import { GrGroup } from "react-icons/gr";

import { FaAnglesRight } from "react-icons/fa6";
import { FaAnglesLeft } from "react-icons/fa6";


import NavLink from "@/components/ui/NavLink";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showToggle, setShowToggle] = useState(false);

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
        className={`md:hidden fixed z-40 inset-y-0 left-0 w-64 bg-neutral-base transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Nav isOpen={isOpen} />
      </aside>

      {/* Mobile: Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/** Desktop Stuff!! */}
      <aside
          className={`hidden md:flex md:flex-col md:sticky md:top-0 md:h-screen md:bg-neutral-base transition-all duration-300 rounded-r-3xl ${
            isOpen ? "w-48" : "w-16"
          }`}
          onMouseEnter={() => setShowToggle(true)}
          onMouseLeave={() => setShowToggle(false)}
        >
        {/* Toggle widget - slides in from right edge */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`fixed bottom-6 bg-secondary-base rounded-r-md p-2 shadow-md transition-all ease-in-out${
            showToggle ? `${isOpen ? "translate-x-48" : "translate-x-16"} opacity-100` : "translate-x-0 opacity-0"
          }`}
          aria-label={`${isOpen ? "Close Menu" : "Open Menu"}`}
        >
          {isOpen ? (
            <FaAnglesLeft  color="#FFFFFF" size={20} />
          ) : (
            <FaAnglesRight color="#FFFFFF" size={20} />
          )}
        </button>

        {/* Nav */}
        <Nav isOpen={isOpen} />
      </aside>
    </>
  );
}

export function Nav({ isOpen }: { isOpen: boolean }) {
  return (
    <nav className="">
      <div className="md:hidden py-3 px-4">
        <Logo />
      </div>

      <div className="hidden md:flex md:gap-4 md:px-4 md:py-8 md:border-b-2 md:border-neutral-dark/20">
        <Logo logoSize="w-7" nameSize="hidden" />
        {isOpen && <Logo logoSize="hidden" />}
      </div>

      <div className="flex flex-col gap-8 px-3 py-8">
        <NavLink
          icon={<RxDashboard size={18} />}
          label="Dashboard"
          href="/dashboard"
          isOpen={isOpen}
          altText="Dashboard"
        />
        <NavLink
          icon={<VscLibrary size={18} />}
          label="My Works"
          href="/myworks"
          isOpen={isOpen}
          altText="My Works"
        />
      </div>

      <div className="sticky border-y-2 border-neutral-dark/20 py-2 flex items-center justify-center">
        {isOpen && (
          <p className="text-xs text-secondary-dark font-semibold">
            A Court of Thorns and Roses
          </p>
        ) }
      </div>

      <div className="flex flex-col gap-8 px-3 py-8">
        <NavLink
          icon={<IoBookOutline size={18} />}
          label="Overview"
          href="/test/navtest"
          isOpen={isOpen}
          altText="Overview"
        />
        <NavLink
          icon={<PiNoteLight size={18} />}
          label="Chapters"
          href="/test"
          isOpen={isOpen}
          altText="Chapters"
        />
        <NavLink
          icon={<GrGroup size={18} />}
          label="Worldbuilding"
          href="/test"
          isOpen={isOpen}
          altText="Worldbuilding"
        />
        <NavLink
          icon={<BiGitBranch size={18} />}
          label="Versions"
          href="/test"
          isOpen={isOpen}
          altText="Versions"
        />
      </div>
    </nav>
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
