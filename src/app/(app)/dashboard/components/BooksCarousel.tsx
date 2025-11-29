import { CgMathPlus } from "react-icons/cg";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

import Button from "@/components/ui/Button";
import IconButton from "@/components/ui/IconButton";
import BookCard from "./BookCard";
import Image, { StaticImageData } from "next/image";

import { useAuth } from "@/context/AuthContext";
import type { Book } from "@/lib/api/books";
import { getUserBooks } from "@/lib/api/books";

import battle_fate from "@/assets/test_books/battle_fate.jpg";
import city_orange from "@/assets/test_books/city_orange.jpg";
import giant_peach from "@/assets/test_books/giant_peach.jpg";
import orange_door from "@/assets/test_books/ocean_door.jpg";
import court_roses from "@/assets/test_books/test_book_cover.jpg";
import { useRef, useState, useEffect } from "react";

import no_books from "@/assets/vectors/no-books.png";

export default function BooksCarousel() {


  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true)
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState<Book[]>([] as Book[]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    async function loadData() {
      if (!user) {
        setLoading(false)
        return
      }

      try {
        const booksData = await getUserBooks(user.id)
        setBooks(booksData)
      } catch (err) {
        console.error('Error loading books: ', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [user])

  const createNewBook = () => {
    console.log("Create New Book");
  };

  const checkScrollPosition = () => {
    if (!scrollContainerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;

    // Can scroll left if not at start
    setCanScrollLeft(scrollLeft > 0);

    // Can scroll right if not at end
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  const scrollLeft = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({
      left: -300, // scroll 300px left
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({
      left: 300, // scroll 300px right
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Check on mount
    checkScrollPosition();

    // Check on scroll
    container.addEventListener("scroll", checkScrollPosition);

    // Cleanup
    return () => container.removeEventListener("scroll", checkScrollPosition);
  }, []);

  return (
    <section className="flex flex-col">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-xl font-semibold text-secondary-dark">
            Your Works
          </h2>
          <p className="text-sm text-secondary-dark">
            Manage your writing projects
          </p>
        </div>
        <div className="flex flex-shrink-0 gap-5">
          <Button endIcon={<CgMathPlus />} onClick={createNewBook} size="small">
            Add New Book
          </Button>
          <IconButton
            variant="filled"
            altText="Previous"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            size="small"
          >
            <MdKeyboardArrowLeft size={24} />
          </IconButton>
          <IconButton
            variant="filled"
            altText="Next"
            onClick={scrollRight}
            disabled={!canScrollRight}
            size="small"
          >
            <MdKeyboardArrowRight size={24} />
          </IconButton>
        </div>
      </div>
      <div className="border-b-2 border-[#917F74]/39 mt-2"></div>
      {/* Carousel Time */}

      {loading && (
        <div className="flex flex-col gap-3 text-center items-center justify-center w-full h-64">
          <h3>Loading...</h3>
        </div>
      )}

      {!loading && error && (
        <div className="flex flex-col gap-3 items-center justify-center w-full h-64">
          <Image
            src={no_books}
            alt="Girl uploading pages from her phone in a cloud holding a book"
            width={100}
            height={100}
          />
          <div className="text-center">
            <h3>Something&apos;s Not Right...</h3>
            <p>
              Sorry, it seems like an error occurred. Try refreshing your page.
            </p>
          </div>
        </div>
      )}

      {!loading && !error && books.length === 0 && (
        <div className="flex flex-col gap-3 items-center justify-center w-full h-64">
          <Image
            src={no_books}
            alt="Girl uploading pages from her phone in a cloud holding a book"
            width={100}
            height={100}
          />
          <div className="text-center">
            <h3>No books yet</h3>
            <p>
              Every great story starts with a blank page. Ready to write yours?
            </p>
          </div>
          <Button color="secondary" endIcon={<CgMathPlus />} onClick={createNewBook}>
            Add New Book
          </Button>
        </div>
      )}

      {!loading && !error && books.length > 0 && (
        <div
          className="flex overflow-x-scroll w-full gap-8 pt-6 pl-1 h-72"
          ref={scrollContainerRef}
        >
          {books.map((book) => (
            <div key={book.id} className="group flex flex-col gap-3 w-36">
              <BookCard coverImage={book.cover_url || ""} title={book.title} />
              <div>
                <h3 className="text-md text-secondary-dark group-hover:font-semibold">
                  {book.title}
                </h3>
                <p className="text-primary-base text-xs group-hover:font-semibold">
                  Drafts 15
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
