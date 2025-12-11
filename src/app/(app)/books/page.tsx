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

import type { BookData } from "@/lib/api/books";
import { getUserBooks } from "@/lib/api/books";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

import { useRouter } from "next/navigation";

// Utility function to format word count
const formatWordCount = (count: number): string => {
  return count.toLocaleString();
};

export default function BooksPage() {
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState<BookData[]>([] as BookData[]);
  const [error, setError] = useState(false);

  const { user } = useAuth();
  
  const router = useRouter();

  useEffect(() => {
    async function loadData() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const booksData = await getUserBooks(user.id);
        setBooks(booksData);
      } catch (err) {
        console.error("Error loading books: ", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [user]);

  const createNewBook = () => {
    router.push("/create-book");
  };

  const handleEdit = (bookId: string) => {
    console.log("Edit book:", bookId);
  };

  const handleArchive = (bookId: string) => {
    console.log("Archive book:", bookId);
  };

  const handleDelete = (bookId: string) => {
    console.log("Delete book:", bookId);
  };

  const handleDescriptionClick = (bookId: string) => {
    setSelectedBook(selectedBook === bookId ? null : bookId);
  };

  // Filter books based on search query
  const filteredBooks = books.filter((book) => {
    const query = searchQuery.toLowerCase();
    return (
      book.title.toLowerCase().includes(query) ||
      book.description?.toLowerCase().includes(query)
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
              className="bg-white-dark border-2 border-outline-light rounded-[18px] p-5 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200 cursor-pointer group"
              onClick={() => {router.push(`/books/${book.id}`)}}
            >
              {/* Book Cover and Title */}
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0">
                  <BookCard
                    coverImage={book.cover_url}
                    title={book.title}
                    color={book.book_color}
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
                      {/* TODO: decide if I want to include description expand/collapse on my works. */}
                      <div>
                        <p
                          className={`text-sm text-neutral-dark ${
                            selectedBook === book.id ? "" : "line-clamp-4"
                          } cursor-pointer hover:text-secondary-dark transition-colors`}
                          onClick={() => console.log("May implement descriptione expansion later")}
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
                          title={`${book.chapter_count} chapters`}
                        >
                          <IoDocumentTextOutline
                            size={18}
                            className="text-secondary-base"
                          />
                          <span>{book.chapter_count}</span>
                        </div>
                        
                        {/* TODO: Figure out Draft/Version Count per chapter */}
                        {/* Draft ?? count  */}
                        {/* <div
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
                        </div> */}

                        {/* Last updated */}
                        <div
                          className="flex items-center gap-1.5"
                          title={formatExactDateTime(new Date(book.updated_at))}
                        >
                          <IoTimeOutline
                            size={18}
                            className="text-secondary-base"
                          />
                          <span>{formatRelativeTime(new Date(book.updated_at))}</span>
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
          <div className="hidden md:grid grid-cols-[60px_1fr_100px_100px_120px_50px] gap-4 px-4 py-3 bg-neutral-base/30 rounded-t-lg border-2 border-b-0 border-outline-light text-sm font-semibold text-secondary-dark">
            <div></div>
            <div>Title</div>
            <div>Chapters</div>
            <div>Words</div>
            <div>Updated</div>
            <div></div>
          </div>

          {/* Table Rows */}
          <div className="flex flex-col">
            {filteredBooks.map((book, index) => (
              <div
                key={book.id}
                className={`grid grid-cols-1 md:grid-cols-[60px_1fr_100px_100px_120px_50px] gap-4 px-4 py-3 border-2 border-outline-light hover:bg-neutral-base/20 transition-colors ${
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
                    style={{ backgroundColor: book.book_color ? book.book_color : "#FFFFFF" }}
                  >
                    {book.cover_url ? (
                      <Image
                        src={book.cover_url}
                        alt={book.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div>

                      </div>
                    )}
                  </div>
                </div>

                {/* Title - Mobile full width, desktop in grid */}
                <div className="flex items-center min-w-0 md:col-span-1">
                  <div className="flex items-center gap-3 md:gap-0 flex-1 min-w-0">
                    {/* Mobile cover */}
                    <div
                      className="md:hidden w-10 h-14 rounded overflow-hidden flex-shrink-0 relative"
                      style={{ backgroundColor: book.book_color ? book.book_color : "#FFFFFF" }}
                    >
                      {book.cover_url && (
                        <Image
                          src={book.cover_url}
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
                  <span>{book.chapter_count}</span>
                </div>


                {/* Word Count */}
                <div className="flex items-center text-sm text-neutral-dark">
                  <span className="md:hidden font-medium mr-2">Words:</span>
                  <span>{formatWordCount(book.word_count)}</span>
                </div>

                {/* Last Updated */}
                <div className="flex items-center text-sm text-neutral-dark">
                  <span className="md:hidden font-medium mr-2">Updated:</span>
                  <span title={formatExactDateTime(new Date(book.updated_at))}>
                    {formatRelativeTime(new Date(book.updated_at))}
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
