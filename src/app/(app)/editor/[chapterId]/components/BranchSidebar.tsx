"use client";

import { useState } from "react";

export default function BranchSidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopOpen, setIsDesktopOpen] = useState();

  return (
    <>
      {/* Mobile Slide Drawer */}
      <aside
        className={`md:hidden fixed z-40 inset-y-0 left-0 w-64 
                    bg-neutral-base border-r border-neutral-dark/20 
                    transform transition-transform duration-300 
                    ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <BranchDetails />
      </aside>

      {/* Mobile Overlay Thingy */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Desktop Sidebar - needs to be sticky to take up space and stay in place :) */}
      <aside
        className={`hidden md:flex md:sticky top-0 shrink-0 h-screen
                    bg-neutral-base border-r border-neutral-dark/20
                    transition-all duration-300 ease-in-out
                    ${isDesktopOpen}`}
      ></aside>
    </>
  );
}

export function BranchDetails() {
  return <p>Branch Stuff</p>;
}
