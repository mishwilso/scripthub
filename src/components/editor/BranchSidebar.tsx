"use client";

import { useChapterEditor } from "@/context/ChapterEditorContext";
import Link from "next/link";
import { toTitleCase } from "@/lib/utils/formatString";
import { useState, useEffect, useContext } from "react";
import { LuBookOpen } from "react-icons/lu";
import Card from "../ui/Card";
import Tooltip from "../ui/Tooltip";

import { IoHome } from "react-icons/io5";


import Dropdown, { DropdownContext } from "../ui/Dropdown";
import IconButton from "../ui/IconButton";

import {
  formatRelativeTime,
  formatExactDateTime,
} from "@/lib/utils/formatDates";

import {
  getFromLocalStorage,
  setToLocalStorage,
} from "@/lib/utils/localStorage";

import { MdCloudUpload, MdCloudDone, MdCloud } from 'react-icons/md'


import { IoChevronDown, IoAdd } from "react-icons/io5";
import { FaLeaf } from "react-icons/fa";
import { FiSidebar } from "react-icons/fi";
import { IoDocumentTextOutline, IoTimeOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { HiOutlineDuplicate } from "react-icons/hi";
import { GoGitCompare, GoGitBranch } from "react-icons/go";
import { IoTrashOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { BookBranch } from "@/lib/api/bookbranches";
import Tag from "../ui/Tags";

interface BranchSidebarProps {
  isOpen: boolean; // Desktop state
  mobileOpen: boolean; // Mobile state
  onToggle: () => void; // Desktop toggle
  onClose: () => void; // Mobile close
}

export default function BranchSidebar({
  isOpen,
  mobileOpen,
  onToggle,
  onClose,
}: BranchSidebarProps) {
  return (
    <>
      {/* Mobile Slide Drawer */}
      <aside
        className={`lg:hidden fixed z-40 inset-y-0 left-0 w-72 
                    bg-neutral-base border-r border-neutral-dark/20 
                    transform transition-transform duration-300 
                    ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <BranchDetails isOpen={mobileOpen} isMobile />
      </aside>

      {/* Mobile Overlay Thingy */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={onClose}
        />
      )}

      {/* Desktop Sidebar - needs to be sticky to take up space and stay in place :) */}
      <aside
        className={`hidden lg:flex lg:sticky top-0 shrink-0 h-screen
                    bg-neutral-base border-r border-neutral-dark/20
                    transition-all duration-300 ease-in-out group/sidebar overflow-hidden
                    ${isOpen ? "w-80" : "w-14"}`}
      >
        <BranchDetails isOpen={isOpen} onToggle={onToggle} />
      </aside>
    </>
  );
}

interface NavProps {
  isOpen: boolean;
  onToggle?: () => void;
  isMobile?: boolean;
}

export function BranchDetails({
  isOpen,
  onToggle,
  isMobile = false,
}: NavProps) {
  const { currentBranch, branches, mainBranch, book, isSaving, lastSaved } = useChapterEditor();
  const [isBranchsOpen, setIsBranchsOpen] = useState(false);

  // TODO: make better safety
  if (!book) return;

  return (
    <nav className="flex flex-col w-full h-full">
      {/* Mobile Header */}
      <div className="md:hidden"></div>

      {/* Desktop Header */}
      <div className="hidden md:flex relative items-center justify-between h-14 px-6 py-5 border-b border-neutral-dark/10 overflow-hidden shrink-0">
        {/* Home Icon */}
        <Link
          href={`/books/${currentBranch?.book_id}`}
          className={`transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-label="Go to book overview"
        >
          <IoHome size={22} className="text-secondary-dark/70 hover:text-primary-base transition-colors" />
        </Link>

        {/* Toggle button - shows on sidebar hover */}
        {!isMobile && onToggle && (
          <button
            onClick={onToggle}
            className={`flex items-center justify-center w-8 h-8 rounded-md hover:bg-neutral-light transition-all shrink-0 ${
              isOpen
                ? "opacity-0 group-hover/sidebar:opacity-100"
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

      <div className="hidden lg:flex relative items-center justify-center">
        {/* Cloud Save */}
        { !isOpen && (
          isSaving ? (
            <Tooltip text="Saving..." position="right">
              <div className="mt-4">
                <MdCloudUpload size={24} className="text-secondary-dark animate-pulse" />
              </div>
            </Tooltip>
            ) : lastSaved ? (
              <Tooltip text={`Last saved: ${formatExactDateTime(lastSaved)}`} position="right">
                <div className="mt-4">
                  <MdCloudDone size={24} className="text-secondary-dark" />
                </div>
              </Tooltip>
            ) : (
              <Tooltip text="Not saved yet" position="right">
                <div className="mt-4">
                  <MdCloud size={24} className="text-secondary-dark" />
                </div>
              </Tooltip>
            )
        )}
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto">
        {/* Main Branch */}
        {isOpen && (
          <div className="px-6 pt-6 pb-8">
            <BranchCard branch={mainBranch as BookBranch} isMain />
          </div>
        )}

        {/* Branches Section */}
        {isOpen && (
          <div className="px-6 pb-4">
            {/* Section Header */}
            <div className="mb-4 flex items-center justify-between">
              <button
                onClick={() => setIsBranchsOpen(!isBranchsOpen)}
                className="flex items-center gap-2.5"
              >
                <GoGitBranch size={16} className="text-secondary-dark" />
                <h2 className="text-sm font-semibold text-secondary-dark">
                  Branches
                </h2>
                <span className="text-sm font-semibold text-secondary-dark/60">
                  ({branches?.length - 1 || 0})
                </span>
                <IoChevronDown
                  size={14}
                  className={`text-secondary-dark transition-transform duration-200 ${
                    isBranchsOpen ? "rotate-0" : "-rotate-90"
                  }`}
                />
              </button>

              {/* Add Branch Icon Button */}
              <button
                onClick={() => {
                  // TODO: Implement create branch
                }}
                className="w-6 h-6 flex items-center justify-center bg-primary-base hover:bg-primary-dark rounded-full transition-colors shrink-0"
                aria-label="Create new branch"
              >
                <IoAdd size={16} className="text-white-base text-semibold" />
              </button>
            </div>

            {/* Branches List */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isBranchsOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <ul className="flex flex-col gap-2.5">
                {branches?.map((branch) => {
                  if (branch.id === mainBranch?.id) {
                    return null;
                  }
                  return (
                    <li key={branch.id}>
                      <BranchCard branch={branch} />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Green Leaf Button at Bottom Left */}
      <div className="px-2 pb-2 flex shrink-0">
        <div className="relative group">
          <button
            className="developer-button flex items-center justify-center w-10 h-10 rounded-md"
            aria-label="Meet the Developer"
          >
            <FaLeaf size={18} color="#FFFFFF" />
          </button>
          {/* Tooltip - only show when closed */}
          {!isOpen && (
            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-neutral-dark text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
              Meet the Developer
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export function BranchCard({
  branch,
  isMain = false,
}: {
  branch: BookBranch;
  isMain?: boolean;
}) {
  const { currentBranch } = useChapterEditor();
  const isActive = currentBranch?.id === branch?.id;

  return (
    <Card
      className={`px-3 py-2.5 transition-all cursor-pointer group bg-[#FFFDFB]/80 border border-secondary-dark/20 
        hover:border-2 hover:border-neutral-dark hover:shadow-sm hover:bg-[#FFFDFB]
      ${
        isActive ? "border-2 border-neutral-dark": ""
      }`}
      variant="shadow"
      rounded="sm"
    >
      {/* Row 1: Title with Badge and Options Menu */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <h3 className="font-semibold text-secondary-dark truncate text-base">
            {isMain ? "Main Branch" : toTitleCase(branch?.branch_name || "")}
          </h3>
          {/* {branch?.is_merged && <Tag variant="current">MERGED</Tag>} */}
        </div>

        {/* Options Menu */}
        <div
          className="shrink-0 -mx-1 relative z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <BranchOptions isMain={isMain} branchId={branch?.id} />
        </div>
      </div>

      {/* Row 2: Creator */}
      <p className="text-sm text-secondary-dark/70 mb-4">
        {/* {branch?.created_by || "snoople"} */}
      </p>

      {/* Row 3: Timestamp and User Avatar */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <IoTimeOutline size={15} className="text-secondary-base/60" />
          <p className="text-xs text-secondary-dark/60">
            {formatRelativeTime(new Date(branch?.updated_at as string))}
          </p>
        </div>

        {/* User Avatar - only show on active branch */}
        {isActive && (
          <div
            className="flex items-center justify-center shrink-0 mb-1"
            title="You are here"
          >
            <FaUserCircle size={28} className="text-primary-base/70" />
          </div>
        )}
      </div>
    </Card>
  );
}

export function BranchOptions({
  isMain,
  branchId,
}: {
  isMain?: boolean;
  branchId?: string;
}) {
  return (
    <Dropdown>
      <Dropdown.Button asChild>
        <IconButton altText="Branch options" variant="standard">
          <BsThreeDotsVertical size={16} className="rotate-90"/>
        </IconButton>
      </Dropdown.Button>

      <Dropdown.Menu position="top span-left">
        {!isMain && (
          <Dropdown.Option startIcon={<GoGitCompare />}>
            Compare with Main
          </Dropdown.Option>
        )}

        <Dropdown.Option startIcon={<HiOutlineDuplicate />}>
          Duplicate Branch
        </Dropdown.Option>

        <Dropdown.Option startIcon={<MdOutlineRemoveRedEye />}>
          View Details
        </Dropdown.Option>

        {!isMain && (
          <>
            <Dropdown.Divider />

            <Dropdown.Option startIcon={<IoTrashOutline />} danger>
              Delete Branch
            </Dropdown.Option>
          </>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}
