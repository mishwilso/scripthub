"use client";

import BookCard from "@/app/(app)/dashboard/components/BookCard";
import Button from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import {
  formatRelativeTime,
  formatExactDateTime,
} from "@/lib/utils/formatDates";
import { CgMathPlus } from "react-icons/cg";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FiEdit2, FiArchive, FiTrash2 } from "react-icons/fi";
import { IoDocumentTextOutline, IoTimeOutline } from "react-icons/io5";
import { TbGitBranch } from "react-icons/tb";
import { BsFillGridFill, BsListUl } from "react-icons/bs";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Image from "next/image";

import battle_fate from "@/assets/test_books/battle_fate.jpg";
import city_orange from "@/assets/test_books/city_orange.jpg";
import giant_peach from "@/assets/test_books/giant_peach.jpg";
import { useState } from "react";

// Dummy data for books (defined outside component to avoid recalculation)
const dummyBooks = [
  {
    id: 1,
    title: "Battle of Fate",
    description:
      "An epic tale of warriors fighting for their destiny in a world where magic and steel collide. Follow the journey of heroes as they navigate through betrayal, love, and the ultimate battle for survival.",
    coverImage: battle_fate,
    color: "#EF6C65",
    chapterCount: 24,
    draftCount: 3,
    wordCount: 87340,
    lastUpdated: new Date("2025-11-25T10:30:00"), // 3 days ago
  },
  {
    id: 2,
    title: "City of Orange Skies",
    description:
      "A dystopian thriller set in a futuristic city where the sky is permanently stained orange.",
    coverImage: city_orange,
    color: "#F4A261",
    chapterCount: 18,
    draftCount: 5,
    wordCount: 52180,
    lastUpdated: new Date("2025-11-27T14:20:00"), // 1 day ago
  },
  {
    id: 3,
    title: "The Giant Peach",
    description:
      "A whimsical adventure about friendship, courage, and a very large piece of fruit that changes everything.",
    coverImage: giant_peach,
    color: "#E9C46A",
    chapterCount: 32,
    draftCount: 2,
    wordCount: 102340,
    lastUpdated: new Date("2025-11-21T09:15:00"), // 7 days ago
  },
  {
    id: 4,
    title: "Untitled Romance",
    description:
      "A heartwarming story of two souls finding each other against all odds in the bustling streets of Paris.",
    color: "#A46278",
    chapterCount: 12,
    draftCount: 8,
    wordCount: 34560,
    lastUpdated: new Date("2025-11-14T16:45:00"), // 14 days ago
  },
  {
    id: 5,
    title: "Mystery at Midnight",
    description:
      "When the clock strikes twelve, secrets come alive. Detective Sarah Chen must solve the case before time runs out.",
    color: "#617767",
    chapterCount: 45,
    draftCount: 1,
    wordCount: 128750,
    lastUpdated: new Date("2025-11-28T08:00:00"), // Today
  },
  {
    id: 6,
    title: "Chronicles of the Lost Kingdom",
    description:
      "An ancient kingdom forgotten by time holds the key to saving the future. A young archaeologist discovers more than she bargained for.",
    color: "#B65733",
    chapterCount: 67,
    draftCount: 0,
    wordCount: 215680,
    lastUpdated: new Date("2025-10-29T11:30:00"), // 30 days ago
  },
];

// Utility function to format word count
const formatWordCount = (count: number): string => {
  return count.toLocaleString();
};

export default function BooksPage() {
  const [selectedBook, setSelectedBook] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const createNewBook = () => {
    console.log("Create New Book");
  };

  const handleEdit = (bookId: number) => {
    console.log("Edit book:", bookId);
  };

  const handleArchive = (bookId: number) => {
    console.log("Archive book:", bookId);
  };

  const handleDelete = (bookId: number) => {
    console.log("Delete book:", bookId);
  };

  const handleDescriptionClick = (bookId: number) => {
    setSelectedBook(selectedBook === bookId ? null : bookId);
  };

  // Filter books based on search query
  const filteredBooks = dummyBooks.filter((book) => {
    const query = searchQuery.toLowerCase();
    return (
      book.title.toLowerCase().includes(query) ||
      book.description.toLowerCase().includes(query)
    );
  });

  return (
    <div className="mt-6 flex flex-col w-full gap-6">
      {/* Header Section */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          {/* Search Input */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaMagnifyingGlass size={16} className="text-neutral-dark" />
              </div>
              <input
                type="search"
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white-input border-2 border-transparent rounded-2xl text-secondary-dark placeholder-neutral-dark focus:outline-none focus:border-outline-input transition-colors"
              />
            </div>
          </div>

          {/* View Mode Toggle and Add Button */}
          <div className="flex items-center gap-3">
            {/* View Mode Toggles */}
            <div className="flex items-center gap-1 bg-neutral-base border-2 border-outline-light rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded transition-colors ${
                  viewMode === "grid"
                    ? "bg-white-dark text-secondary-dark"
                    : "text-neutral-dark hover:text-secondary-dark"
                }`}
                aria-label="Grid view"
                title="Grid view"
              >
                <BsFillGridFill size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded transition-colors ${
                  viewMode === "list"
                    ? "bg-white-dark text-secondary-dark"
                    : "text-neutral-dark hover:text-secondary-dark"
                }`}
                aria-label="List view"
                title="List view"
              >
                <BsListUl size={18} />
              </button>
            </div>

            {/* Add New Book Button */}
            <Button
              endIcon={<CgMathPlus />}
              onClick={createNewBook}
              size="medium"
            >
              Add New Book
            </Button>
          </div>
        </div>
        <div className="border-b-2 border-[#917F74]/39"></div>
      </section>

      {/* Books Display */}
      {filteredBooks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-neutral-dark text-lg">
            No books found matching your search.
          </p>
        </div>
      ) : viewMode === "grid" ? (
        // Grid View
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white-dark border-2 border-outline-light rounded-[18px] p-5 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200 group"
            >
              {/* Book Cover and Title */}
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0">
                  <BookCard
                    coverImage={book.coverImage}
                    title={book.title}
                    color={book.color}
                  />
                </div>
                <div className="flex-1 min-w-0 h-full">
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-lg font-semibold text-secondary-dark line-clamp-2">
                        {book.title}
                      </h3>
                      {/* Three-dot menu */}
                      <Dropdown>
                        <Dropdown.Button>
                          <button
                            className="p-1 hover:bg-neutral-base/30 rounded-md transition-colors flex-shrink-0"
                            aria-label="Book options"
                          >
                            <HiOutlineDotsVertical
                              className="text-neutral-dark"
                              size={20}
                            />
                          </button>
                        </Dropdown.Button>
                        <Dropdown.Menu>
                          <Dropdown.Option onClick={() => handleEdit(book.id)}>
                            <div className="flex items-center gap-2">
                              <FiEdit2 size={16} />
                              <span>Edit</span>
                            </div>
                          </Dropdown.Option>
                          <Dropdown.Option
                            onClick={() => handleArchive(book.id)}
                          >
                            <div className="flex items-center gap-2">
                              <FiArchive size={16} />
                              <span>Archive</span>
                            </div>
                          </Dropdown.Option>
                          <Dropdown.Divider />
                          <Dropdown.Option
                            onClick={() => handleDelete(book.id)}
                          >
                            <div className="flex items-center gap-2 text-negative-base">
                              <FiTrash2 size={16} />
                              <span>Delete</span>
                            </div>
                          </Dropdown.Option>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>

                    <div className="flex flex-col flex-1 justify-between">
                      {/* Description */}
                      <div>
                        <p
                          className={`text-sm text-neutral-dark ${
                            selectedBook === book.id ? "" : "line-clamp-4"
                          } cursor-pointer hover:text-secondary-dark transition-colors`}
                          onClick={() => handleDescriptionClick(book.id)}
                          title="Click to expand/collapse"
                        >
                          {book.description}
                        </p>
                      </div>

                      {/* Metadata Row */}
                      <div className="flex items-center gap-4 text-sm text-neutral-dark flex-wrap">
                        {/* Chapter count */}
                        <div
                          className="flex items-center gap-1.5"
                          title={`${book.chapterCount} chapters`}
                        >
                          <IoDocumentTextOutline
                            size={18}
                            className="text-secondary-base"
                          />
                          <span>{book.chapterCount}</span>
                        </div>

                        {/* Draft count */}
                        <div
                          className="flex items-center gap-1.5"
                          title={`${book.draftCount} ${
                            book.draftCount === 1 ? "Draft" : "Drafts"
                          }`}
                        >
                          <TbGitBranch
                            size={18}
                            className="text-secondary-base"
                          />
                          <span>{book.draftCount}</span>
                        </div>

                        {/* Last updated */}
                        <div
                          className="flex items-center gap-1.5"
                          title={formatExactDateTime(book.lastUpdated)}
                        >
                          <IoTimeOutline
                            size={18}
                            className="text-secondary-base"
                          />
                          <span>{formatRelativeTime(book.lastUpdated)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      ) : (
        // List View
        <section className="flex flex-col pb-8">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-[60px_1fr_100px_100px_120px_120px_50px] gap-4 px-4 py-3 bg-neutral-base/30 rounded-t-lg border-2 border-b-0 border-outline-light text-sm font-semibold text-secondary-dark">
            <div></div>
            <div>Title</div>
            <div>Chapters</div>
            <div>Drafts</div>
            <div>Words</div>
            <div>Updated</div>
            <div></div>
          </div>

          {/* Table Rows */}
          <div className="flex flex-col">
            {filteredBooks.map((book, index) => (
              <div
                key={book.id}
                className={`grid grid-cols-1 md:grid-cols-[60px_1fr_100px_100px_120px_120px_50px] gap-4 px-4 py-3 border-2 border-outline-light hover:bg-neutral-base/20 transition-colors ${
                  index === 0 ? "rounded-t-lg md:rounded-t-none" : ""
                } ${
                  index === filteredBooks.length - 1
                    ? "rounded-b-lg"
                    : "border-b-0"
                }`}
              >
                {/* Book Cover Thumbnail */}
                <div className="hidden md:flex items-center justify-center">
                  <div
                    className="w-10 h-14 rounded overflow-hidden flex-shrink-0 relative"
                    style={{ backgroundColor: book.color }}
                  >
                    {book.coverImage && (
                      <Image
                        src={book.coverImage}
                        alt={book.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                </div>

                {/* Title - Mobile full width, desktop in grid */}
                <div className="flex items-center min-w-0 md:col-span-1">
                  <div className="flex items-center gap-3 md:gap-0 flex-1 min-w-0">
                    {/* Mobile cover */}
                    <div
                      className="md:hidden w-10 h-14 rounded overflow-hidden flex-shrink-0 relative"
                      style={{ backgroundColor: book.color }}
                    >
                      {book.coverImage && (
                        <Image
                          src={book.coverImage}
                          alt={book.title}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <h3
                      className="font-semibold text-secondary-dark truncate"
                      title={book.title}
                    >
                      {book.title}
                    </h3>
                  </div>
                </div>

                {/* Chapters */}
                <div className="flex items-center text-sm text-neutral-dark">
                  <span className="md:hidden font-medium mr-2">Chapters:</span>
                  <span>{book.chapterCount}</span>
                </div>

                {/* Drafts */}
                <div className="flex items-center text-sm text-neutral-dark">
                  <span className="md:hidden font-medium mr-2">Drafts:</span>
                  <span>{book.draftCount}</span>
                </div>

                {/* Word Count */}
                <div className="flex items-center text-sm text-neutral-dark">
                  <span className="md:hidden font-medium mr-2">Words:</span>
                  <span>{formatWordCount(book.wordCount)}</span>
                </div>

                {/* Last Updated */}
                <div className="flex items-center text-sm text-neutral-dark">
                  <span className="md:hidden font-medium mr-2">Updated:</span>
                  <span title={formatExactDateTime(book.lastUpdated)}>
                    {formatRelativeTime(book.lastUpdated)}
                  </span>
                </div>

                {/* Actions Menu */}
                <div className="flex items-center justify-end md:justify-center">
                  <Dropdown>
                    <Dropdown.Button>
                      <button
                        className="p-1 hover:bg-neutral-base/50 rounded-md transition-colors"
                        aria-label="Book options"
                      >
                        <HiOutlineDotsVertical
                          className="text-neutral-dark"
                          size={20}
                        />
                      </button>
                    </Dropdown.Button>
                    <Dropdown.Menu>
                      <Dropdown.Option onClick={() => handleEdit(book.id)}>
                        <div className="flex items-center gap-2">
                          <FiEdit2 size={16} />
                          <span>Edit</span>
                        </div>
                      </Dropdown.Option>
                      <Dropdown.Option onClick={() => handleArchive(book.id)}>
                        <div className="flex items-center gap-2">
                          <FiArchive size={16} />
                          <span>Archive</span>
                        </div>
                      </Dropdown.Option>
                      <Dropdown.Divider />
                      <Dropdown.Option onClick={() => handleDelete(book.id)}>
                        <div className="flex items-center gap-2 text-negative-base">
                          <FiTrash2 size={16} />
                          <span>Delete</span>
                        </div>
                      </Dropdown.Option>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
