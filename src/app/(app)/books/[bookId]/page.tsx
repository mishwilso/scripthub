// TODO: Make BookOverview actually navigatable
// TODO: View All Notifications Button?

"use client";

import {
  useEffect,
  useState,
  useLayoutEffect,
  useRef,
  useCallback,
} from "react";
import { useParams, useRouter } from "next/navigation";
import { BookProvider, useBook } from "@/context/BookContext";
import BookNavBar from "@/components/layout/BookNavBar";
import OverviewTab from "@/components/books/OverviewTab";
import ChaptersTab from "@/components/books/ChaptersTab";
import WorldBuildingTab from "@/components/books/WorldBuildingTab";
import VersionsTab from "@/components/books/VersionsTab";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Tags from "@/components/ui/Tags";
import Image from "next/image";
import { FaChevronLeft } from "react-icons/fa";

import {
  getFromLocalStorage,
  setToLocalStorage,
  removeFromLocalStorage,
} from "@/lib/utils/localStorage";

export function BookContent() {
  const params = useParams<{ bookId: string }>();
  const { book, stats, loading, error } = useBook();
  const tabStorageKey = `book-${params.bookId}-activeTab`;

  const [activeTab, setActiveTab] = useState<
    "overview" | "chapters" | "worldbuilding" | "versions"
  >(getFromLocalStorage(tabStorageKey, "overview"));
  const [fullDescription, setFullDescription] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const router = useRouter();

  useEffect(() => {
    setToLocalStorage(tabStorageKey, activeTab);
  }, [activeTab, tabStorageKey]);

  // Clear tab state when user leaves a book
  useEffect(() => {
    return () => {
      // Cleanup on unmount
      removeFromLocalStorage(`book-${params.bookId}-activeTab`);
    };
  }, [params.bookId]);

  const handleReadMore = () => {
    setFullDescription((prevState) => !prevState);
  };

  const checkIfTruncated = useCallback(() => {
    if (descriptionRef.current) {
      // Compare scrollHeight (full content height) with clientHeight (visible height)
      setIsTruncated(
        descriptionRef.current.scrollHeight >
          descriptionRef.current.clientHeight
      );
    }
  }, []);

  useLayoutEffect(() => {
    checkIfTruncated(); // Initial check on mount/layout

    // Use ResizeObserver for efficient element resize detection
    window.addEventListener("resize", checkIfTruncated);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", checkIfTruncated);
    };
  }, [checkIfTruncated, book?.description]);

  if (loading)
    return (
      <div className="mt-6 flex flex-col w-full justify-center items-center">
        Loading...
      </div>
    );

  if (error) {
    return (
      <div className="mt-6 flex flex-col w-full justify-center items-center">
        <h1 className="font-bold text-lg">Book not found</h1>
        <p>Redirecting to My Works...</p>
      </div>
    );
  }

  return (
    <div className="mt-6 flex flex-col w-full">
      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-16 pb-6 lg:pb-0">
        <div className="lg:row-span-2 relative flex items-start justify-center lg:justify-start flex-shrink-0 lg:pl-32">
          <Button
            color="tertiary"
            startIcon={<FaChevronLeft />}
            className="w-auto py-3 rounded-full md:px-3 md:py-1.5 md:rounded-xl absolute left-0 top-0"
            responsive
          >
            Back
          </Button>

          <div
            className="relative w-72 aspect-[2/3] rounded-lg overflow-hidden"
            style={{
              boxShadow: "-8px 10px 10px 6px rgba(0, 0, 0, 0.15)",
            }}
          >
            {book?.cover_url ? (
              <Image
                src={book?.cover_url}
                alt={`Cover of the book ${book?.title}`}
                fill
              ></Image>
            ) : (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center p-6"
                style={{ backgroundColor: book?.book_color || "#E88A7F" }}
              >
                {/* Decorative elements */}
                <div className="absolute top-10 left-6 right-6 pt-2 h-36 bg-white-base/15 rounded-2xl  overflow-hidden">
                  {" "}
                  <h3
                    className="text-white-base text-center px-4 leading-tight line-clamp-3"
                    style={{
                      fontFamily: "serif",
                      fontSize: "2rem",
                      fontWeight: "bold",
                    }}
                  >
                    {book?.title || "Your Book Title"}{" "}
                  </h3>
                </div>
                <div className="absolute top-52 left-6 right-6 h-5 bg-white-base/15 rounded-2xl" />
                <div className="absolute top-60 left-6 right-6 h-5 bg-white-base/15 rounded-2xl" />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6 flex-1">
          <h2 className="font-bold text-3xl">{book?.title}</h2>
          <div className="flex flex-wrap gap-2">
            {book?.genres?.map((genre) => (
              <Tags key={genre} variant="genre">
                {genre}
              </Tags>
            ))}
            {book?.custom_genres?.map((genre) => (
              <Tags key={genre} variant="custom">
                {genre}
              </Tags>
            ))}
          </div>
          <p
            ref={descriptionRef}
            className={!fullDescription ? "line-clamp-5" : ""}
          >
            {book?.description || ""}
          </p>
          {isTruncated && (
            <div className="flex justify-end">
              <Button variant="text" onClick={handleReadMore}>{`${
                fullDescription ? "Read less" : "Read more"
              }`}</Button>
            </div>
          )}
        </div>
      </div>

      <Card className="px-11 py-8 lg:-mt-20 space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-16">
          {/* Empty spacer to match book cover width */}
          <div className="hidden lg:block lg:w-96" />

          <div className="flex flex-1 justify-center lg:justify-start">
            <BookNavBar activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
        </div>

        {/* Divider */}
        <div
          className={`border-b-2 border-outline-light mx-[-2.75rem] p-0 -mt-20`}
        ></div>

        {/* Card Info - Details Page */}
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "chapters" && <ChaptersTab />}
        {activeTab === "worldbuilding" && <WorldBuildingTab />}
        {activeTab === "versions" && <VersionsTab />}
      </Card>
    </div>
  );
}

export default function BookOverview() {
  const params = useParams<{ bookId: string }>();

  return (
    <BookProvider bookId={params.bookId}>
      <BookContent />
    </BookProvider>
  );
}
