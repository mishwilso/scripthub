// TODO: Conditional read more, only if there is more to read
// TODO: Change Chapter Icon
// TODO: Make BookOverview actually navigatable
// TODO: View All Notifications Button?

"use client";

import { useEffect, useState, useLayoutEffect, useRef, useCallback } from "react";

import { BookData, getBookById, getBookWordCount } from "@/lib/api/books";
import { BookStats, getBookStats } from "@/lib/api/bookStats";

import Button from "@/components/ui/Button";
import IconButton from "@/components/ui/IconButton";
import Card from "@/components/ui/Card";
import Tags from "@/components/ui/Tags";
import BookNavBar from "@/components/layout/BookNavBar";

import Avatar from "@/components/ui/Avatar";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

import { FaChevronLeft } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaRegCalendar } from "react-icons/fa6";
import { FaCodeBranch } from "react-icons/fa6";

import {
  CollaboratorRole,
  getBookCollaborators,
} from "@/lib/api/collaborators";

import {
  BookActivity,
  getBookActivity,
  formatBookActivity,
} from "@/lib/api/bookactivity";

import { capitalizeFirstLetter, toTitleCase } from "@/lib/utils/formatString";

interface Collaborator {
  user_profile: string | null | undefined;
  name: string | null | undefined;
  role: CollaboratorRole;
}

export default function BookOverview() {
  const params = useParams<{ bookId: string }>();
  const [book, setBook] = useState<BookData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [bookActivity, setBookActivity] = useState<BookActivity[]>([]);
  const [fullDescription, setFullDescription] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);

  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const [stats, setStats] = useState<BookStats>();

  const router = useRouter();

  const handleReadMore = () => {
    setFullDescription((prevState) => !prevState);
  };

  const checkIfTruncated = useCallback(() => {
    if (descriptionRef.current) {
      // Compare scrollHeight (full content height) with clientHeight (visible height)
      setIsTruncated(descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight);
    }
  }, []);

  useLayoutEffect(() => {
    checkIfTruncated(); // Initial check on mount/layout

    // Use ResizeObserver for efficient element resize detection  
    window.addEventListener('resize', checkIfTruncated);

    // Cleanup function
    return () => {
        window.removeEventListener('resize', checkIfTruncated);
    };
    
  }, [checkIfTruncated, book?.description]);


  useEffect(() => {
    async function loadBook() {
      try {
        const [bookData, collaboratorsData, bookActivityData, statsData] =
          await Promise.all([
            getBookById(params.bookId),
            getBookCollaborators(params.bookId),
            getBookActivity(params.bookId, 3),
            getBookStats(params.bookId),
          ]);

        setBook(bookData);
        setBookActivity(bookActivityData);
        setCollaborators(
          collaboratorsData.map((collab) => {
            return {
              user_profile: collab.user.avatar_url,
              name: collab.user.name,
              role: collab.role,
            };
          })
        );
        setStats(statsData);
      } catch (error) {
        console.error("Error loading book:", error);
        setError(true);

        router.push("/books");
      } finally {
        setLoading(false);
      }
    }

    if (params.bookId) {
      loadBook();
    }
  }, [params.bookId, router]);

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
        <div className="lg:row-span-2 relative flex items-start justify-center lg:justify-start flex-shrink-0 lg:pl-24">
          <Button
            color="tertiary"
            startIcon={<FaChevronLeft />}
            size="small"
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
          <p ref={descriptionRef} className={!fullDescription ? "line-clamp-5" : ""}>
            {book?.description || ""}
          </p>
          {isTruncated &&<div className="flex justify-end">
            <Button variant="text" onClick={handleReadMore}>{`${
              fullDescription ? "Read less" : "Read more"
            }`}</Button>
          </div>}
        </div>
      </div>

      <Card className="px-11 py-8 lg:-mt-20 space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-16">
          {/* Empty spacer to match book cover width */}
          <div className="hidden lg:block lg:w-96" />

          <div className="flex flex-1 justify-center lg:justify-start">
            <BookNavBar />
          </div>
        </div>

        <div
          className={`border-b-2 border-outline-light mx-[-2.75rem] p-0 -mt-20`}
        ></div>

        {/* Card Info - Details Page */}

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-4">
          <Card className="p-4 space-y-4" rounded="sm">
            <div className="flex justify-between">
              <h3 className="font-medium">Chapters</h3>
              <IoDocumentTextOutline size={20} />
            </div>

            <div>
              <p className="font-light text-2xl">{stats?.chapterCount}</p>
              <p className="text-xs text-primary-base">
                ~ {stats?.avgWordsPerChapter} per chapter
              </p>
            </div>
          </Card>

          <Card className="p-4 space-y-4" rounded="sm">
            <div className="flex justify-between">
              <h3 className="font-medium">Word Count</h3>
              <FaArrowTrendUp size={20} />
            </div>

            <div>
              <p className="font-light text-2xl">{stats?.totalWordCount}</p>
              <p className="text-xs text-primary-base">
                + {stats?.recentWordCount}
              </p>
            </div>
          </Card>

          <Card className="p-4 space-y-4" rounded="sm">
            <div className="flex justify-between">
              <h3 className="font-medium">Branches</h3>
              <FaCodeBranch size={20} />
            </div>

            <div>
              <p className="font-light text-2xl">{stats?.branchCount}</p>
              <p className="text-xs text-primary-base">
                {stats?.activeBranches} active
              </p>
            </div>
          </Card>

          <Card className="p-4 space-y-4" rounded="sm">
            <div className="flex justify-between">
              <h3 className="font-medium">Last Updated</h3>
              <FaRegCalendar size={20} />
            </div>

            <div>
              <p className="font-light text-2xl">{stats?.lastUpdatedDate}</p>
              <p className="text-xs text-primary-base">
                {stats?.lastUpdatedTime}
              </p>
            </div>
          </Card>
        </div>

        <Card className="p-4 space-y-3" rounded="sm">
          <div>
            <h3 className="text-xl font-semibold">Recent Activity</h3>
            <p className="text-sm">Changes and updates to this book</p>
          </div>

          <ul className="space-y-1 list-none bullet-line-list [&>*:not(:last-child)]:pb-5">
            {bookActivity.map((activity) => {
              const formatted = formatBookActivity(activity);
              const branchName = formatted.branchName;
              return (
                <li
                  key={activity.id}
                  className="bullet-line-list items-start gap-4 text-sm "
                >
                  {/* Content */}
                  <p>{formatted.message}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-secondary-dark/90">
                      {formatted.timestamp}
                    </span>

                    {branchName && <Tags variant="version">{branchName}</Tags>}
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>

        <Card variant="none" className="p-4 space-y-3">
          <h3 className="text-xl font-semibold">Collaborators</h3>

          <div className="flex flex-wrap lg:gap-28 gap-10">
            {collaborators.map((collaborator, index) => (
              <div
                key={`${index}-${collaborator.name}`}
                className="flex gap-4 h-9 items-center px-2 py-6"
              >
                <Avatar src={collaborator.user_profile} />
                <div>
                  <p className="font-semibold text-secondary-dark">
                    {toTitleCase(collaborator.name)}
                  </p>
                  <p
                    className={`${
                      collaborator.role === "owner"
                        ? "text-primary-base"
                        : "text-secondary-base"
                    } text-left`}
                  >
                    {capitalizeFirstLetter(collaborator.role)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Card>
    </div>
  );
}
