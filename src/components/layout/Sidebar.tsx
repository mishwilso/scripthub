"use client";

import { useState, useEffect } from "react";
import Logo from "@/components/ui/Logo";
import IconButton from "@/components/ui/IconButton";

import { FaBars } from "react-icons/fa6";
import { CgClose } from "react-icons/cg";

import { RxDashboard } from "react-icons/rx";
import { VscLibrary } from "react-icons/vsc";

import { FiSidebar } from "react-icons/fi";
import { IoChevronDown } from "react-icons/io5";
import { FaLeaf } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";

import NavLink from "@/components/ui/NavLink";
import SearchInput from "../ui/SearchInput";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

import type { Book } from "@/lib/api/books";
import { getRecentBooks } from "@/lib/api/books";

import { getFromLocalStorage, setToLocalStorage } from '@/lib/utils/localStorage'

export default function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopOpen, setIsDesktopOpen] = useState(getFromLocalStorage('sidebarOpen', true));

  useEffect(() => {
    setToLocalStorage('sidebarOpen', isDesktopOpen)
  }, [isDesktopOpen])


  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden sticky top-0 w-full z-50 bg-neutral-base flex items-center justify-between px-4 py-3 border-b border-neutral-dark/20">
        <Logo />
        <IconButton
          onClick={() => setIsMobileOpen((prevState) => !prevState)}
          altText="Open and Close Menu"
        >
          {isMobileOpen ? <CgClose color="#7E7065" /> : <FaBars color="#7E7065" />}
        </IconButton>
      </div>

      {/* Mobile Slide Drawer */}
      <aside
        className={`md:hidden fixed z-40 inset-y-0 left-0 w-64 bg-neutral-base border-r border-neutral-dark/20 transform transition-transform duration-300 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Nav isOpen={true} isMobile={true} />
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Desktop Sidebar - now relative to take up actual space */}
      <aside
        className={`hidden md:flex md:sticky top-0 shrink-0 h-screen bg-neutral-base border-r border-neutral-dark/20 transition-all duration-300 ease-in-out ${
          isDesktopOpen ? "w-64" : "w-14"
        }`}
      >
        <Nav isOpen={isDesktopOpen} onToggle={() => setIsDesktopOpen(!isDesktopOpen)} isMobile={false} />
      </aside>
    </>
  );
}

interface NavProps {
  isOpen: boolean;
  onToggle?: () => void;
  isMobile: boolean;
}

export function Nav({ isOpen, onToggle, isMobile }: NavProps) {
  const [isRecentsOpen, setIsRecentsOpen] = useState(true);
  const [loading, setLoading] = useState(true)
  const [books, setBooks] = useState([] as { id: string; title: string; }[]);
  const { user } = useAuth();

  const router = useRouter();

  const createNewBook = () => {
    router.push("/create-book");
  };

  
  useEffect(() => {
    async function loadData() {
      if (!user) {
        setLoading(false)
        return
      }

      try {
        const booksData = await getRecentBooks(user.id, 3)
        setBooks(booksData)
      } catch (err) {
        console.error('Error loading books: ', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [user])

  // Sample recent items - replace with actual data
  const recentItems = books.map((book) => {
    return {id: book.id, title: book.title, href: `/books/${book.id}`}
  });

  return (
    <nav className="flex flex-col w-full h-full">
      {/* Mobile Header */}
      <div className="md:hidden py-3 px-4 border-b border-neutral-dark/20">
        <Logo />
      </div>

      {/* Desktop Header Section */}
      <div className="hidden md:flex relative  items-center h-16 px-3 border-b border-neutral-dark/20 overflow-hidden">
        {/* Logo - fades in when open */}
        <div
          className={`transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <Logo logoSize="w-8" nameSize="w-20" />
        </div>

        {/* Toggle button - stays in fixed position on right */}
        {!isMobile && onToggle && (
          <button
            onClick={onToggle}
            className={`absolute p-1 rounded-md hover:bg-neutral-light/30 transition-colors ${
              isOpen ? "right-3" : "left-1/2 -translate-x-1/2"
            }`}
            aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
          >
            <FiSidebar size={18} className="text-secondary-dark" />
          </button>
          
        )}
      </div>

      <div className="md:hidden px-2 pt-4 pb-2">
        <SearchInput/>
      </div>

      {/* Create New Book Button */}
      <div className="px-2 pt-4 pb-2">
        <NavLink
          icon={<FaCirclePlus size={25} color="#B65733"/>}
          label="Create New Book"
          href="/create-book"
          isOpen={isOpen}
          altText="Create New Book"
        />
      </div>

      {/* Main Navigation Links */}
      <div className="flex flex-col gap-2 px-2 py-2">
        <NavLink
          icon={<RxDashboard size={20} />}
          label="Dashboard"
          href="/dashboard"
          isOpen={isOpen}
          altText="Dashboard"
        />
        <NavLink
          icon={<VscLibrary size={20} />}
          label="My Works"
          href="/books"
          isOpen={isOpen}
          altText="My Works"
        />
      </div>

      {/* Recents Section - only show when open */}
      {isOpen && (
        <div className="px-2 pb-4">
          <button
            onClick={() => setIsRecentsOpen(!isRecentsOpen)}
            className="w-full flex items-center justify-between px-2 py-2 text-xs font-medium text-secondary-dark/70 hover:text-secondary-dark transition-colors rounded-md hover:bg-neutral-light/20"
          >
            <span>Recents</span>
            <IoChevronDown
              size={16}
              className={`transition-transform duration-200 ${
                isRecentsOpen ? "rotate-0" : "-rotate-90"
              }`}
            />
          </button>

          {/* Recents List */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isRecentsOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <ul className="flex flex-col gap-0.5 mt-1">
              {recentItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="group flex items-center justify-between px-2 py-2 text-sm text-secondary-dark/80 hover:bg-neutral-light/30 rounded-md transition-colors"
                  >
                    <span className="truncate flex-1">{item.title}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-secondary-dark/50 text-xs">
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Spacer - pushes recents and leaf button to bottom */}
      <div className="flex-1" />

      {/* Green Leaf Button at Bottom */}
      <div className="px-2 pb-2 flex">
        <div className="relative group">
          <button className="developer-button flex items-center justify-center w-10 h-10 rounded-md">
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
