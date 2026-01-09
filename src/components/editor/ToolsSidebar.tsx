"use client";

import { FiSidebar } from "react-icons/fi";
import { FaLeaf } from "react-icons/fa";

import { BsFonts } from "react-icons/bs";

import { FiChevronLeft, FiChevronDown } from 'react-icons/fi';
import { LuBook } from "react-icons/lu";
import { FiTable } from "react-icons/fi";
import { SlMagnifier } from "react-icons/sl";
import { FiEdit3 } from "react-icons/fi";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { FaRegComments } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import { TbUpload } from "react-icons/tb";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { MdTitle } from "react-icons/md";

import DeveloperModal from "@/components/ui/DeveloperModal";

import ToolOption from "./ToolOption";
import Format from "./Tools/Format";

import { useState } from "react";

interface ToolsSidebarProps {
  isOpen: boolean; // Desktop state
  mobileOpen: boolean; // Mobile state
  onToggle: () => void; // Desktop toggle
  onClose: () => void; // Mobile close
}

export default function ToolsSidebar({
  isOpen,
  mobileOpen,
  onToggle,
  onClose,
}: ToolsSidebarProps) {

  return (
    <>
      {/* Mobile Slide Drawer */}
      <aside
        className={`lg:hidden fixed z-40 inset-y-0 right-0 w-72
                    bg-white-input border-l border-neutral-dark/20
                    transform transition-transform duration-300
                    ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <ToolsDetails isOpen={mobileOpen} isMobile />
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={onClose}
        />
      )}

      {/* Desktop Sidebar - needs to be sticky to take up space and stay in place :) */}
      <aside
        className={`hidden lg:flex lg:sticky top-0 shrink-0 h-screen
                    bg-white-input border-l border-neutral-dark/20
                    transition-all duration-300 ease-in-out group/toolsbar overflow-hidden
                    ${isOpen ? "w-64" : "w-14"}`}
      >
        <ToolsDetails isOpen={isOpen} onToggle={onToggle} />
      </aside>
    </>
  );
}

interface ToolsDetailsProps {
  isOpen: boolean;
  onToggle?: () => void;
  isMobile?: boolean;
}

export function ToolsDetails({
  isOpen,
  onToggle,
  isMobile = false,
}: ToolsDetailsProps) {

  const [activeView, setActiveView] = useState<string>('menu');


  return (
    <nav className="flex flex-col w-full h-full">
      {/* Mobile Header */}
      <div className="md:hidden"></div>

      {/* Desktop Header */}
      <div className="hidden md:flex relative items-center justify-between h-14 px-4 py-5 border-b border-neutral-dark/10 overflow-hidden shrink-0">
        {activeView !== 'menu' && (
          <button onClick={() => setActiveView('menu')}>
            <FiChevronLeft />
          </button>
        )}

        {/* Header Title - only show when open */}
        {activeView === 'menu' && 
        <h2
          className={`text-lg font-semibold text-secondary-dark transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          Tools
        </h2>
        }

        {/* Toggle button - shows on sidebar hover */}
        {!isMobile && onToggle && (
          <button
            onClick={onToggle}
            className={`flex items-center justify-center w-8 h-8 rounded-md hover:bg-neutral-light transition-all shrink-0 ${
              isOpen
                ? "opacity-0 group-hover/toolsbar:opacity-100"
                : "absolute left-1/2 -translate-x-1/2 opacity-100"
            }`}
            aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
          >
            <FiSidebar
              size={18}
              className="text-secondary-dark/70 hover:text-primary-base transition-colors"
            />
          </button>
        )}
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-1 h-full">
        {activeView === 'menu' && <ToolMenu onSelectTool={setActiveView} isOpen={isOpen}/>}
        {activeView === 'format' && <Format isOpen={isOpen} />}
        {activeView !== 'menu' && activeView !=='format' && <Placeholder isOpen={isOpen} />}
      </div>
      
    </nav>
  );
}


const ToolMenu = ({onSelectTool, isOpen}: {onSelectTool: (tool: string) => void, isOpen: boolean}) => {
  const [isDeveloperModalOpen, setIsDeveloperModalOpen] = useState(false);

  return (
    <>
      {/* Tools Content Area - Fixed height to fit on screen */}
      <div className="flex flex-col  py-2 gap-1">
        <ToolOption
          icon={<LuBook size={20} />}
          label="World Building"
          isOpen={isOpen}
          altText="World Building"
          onClick={() => onSelectTool('worldbuilding')}
        />
        <ToolOption
          icon={<MdTitle size={20} />}
          label="Format"
          isOpen={isOpen}
          altText="Format"
          onClick={() => onSelectTool('format')}
        />
        <ToolOption
          icon={<FiTable size={20} />}
          label="Outline"
          isOpen={isOpen}
          altText="Outline"
          onClick={() => onSelectTool('outline')}
        />
        <ToolOption
          icon={<SlMagnifier size={20} />}
          label="Find and Replace"
          isOpen={isOpen}
          altText="Find and Replace"
          onClick={() => onSelectTool('find')}
        />
        <ToolOption
          icon={<FiEdit3 size={20} />}
          label="Spell Check"
          isOpen={isOpen}
          altText="Spell Check"
          onClick={() => onSelectTool('spellcheck')}
        />
        <ToolOption
          icon={<RxCounterClockwiseClock size={20} />}
          label="Version History"
          isOpen={isOpen}
          altText="Version History"
          onClick={() => onSelectTool('history')}
        />
        <ToolOption
          icon={<FaRegComments size={20} />}
          label="Comment"
          isOpen={isOpen}
          altText="Comment"
          onClick={() => onSelectTool('comment')}
        />
        <ToolOption
          icon={<FiUsers size={20} />}
          label="Collaborators"
          isOpen={isOpen}
          altText="Collaborators"
          onClick={() => onSelectTool('collaborators')}
        />
        <ToolOption
          icon={<TbUpload size={20} />}
          label="Share and Export"
          isOpen={isOpen}
          altText="Share and Export"
          onClick={() => onSelectTool('export')}
        />
        <ToolOption
          icon={<AiOutlineInfoCircle size={20} />}
          label="Draft Info"
          isOpen={isOpen}
          altText="Draft Info"
          onClick={() => onSelectTool('info')}
        />
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Footer - Green Leaf Button at Bottom Right */}
      <div className="px-2 pb-2 flex justify-end shrink-0">
        <div className="relative group">
          <button
            onClick={() => setIsDeveloperModalOpen(true)}
            className="developer-button flex items-center justify-center w-10 h-10 rounded-md"
            aria-label="Meet the Developer"
          >
            <FaLeaf size={18} color="#FFFFFF" />
          </button>
          {/* Tooltip - only show when closed */}
          {!isOpen && (
            <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-neutral-dark text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
              Meet the Developer
            </div>
          )}
        </div>
      </div>

      {/* Developer Modal */}
      <DeveloperModal
        isOpen={isDeveloperModalOpen}
        onClose={() => setIsDeveloperModalOpen(false)}
      />
    </>
  );
};



const Placeholder = ({ isOpen }: {isOpen: boolean}) => {
  return (
    <div className="flex flex-col items-center justify-center flex-1"> 
    </div>
  )
}

