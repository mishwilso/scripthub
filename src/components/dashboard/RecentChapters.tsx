import Image from "next/image";
import ChapterCard from "./ChapterCard";
import { ChapterCardProps } from "./ChapterCard";

import { useAuth } from "@/context/AuthContext";
import type { Chapter } from "@/lib/api/chapters";
import { getRecentChapters } from "@/lib/api/chapters";
import { getBookById } from "@/lib/api/books";

import { useEffect, useState } from "react";

import no_chapters from "@/assets/vectors/no-chapters.png";

export default function RecentChapters() {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [recentChapter, setRecentChapter] = useState<ChapterCardProps[]>(
    [] as ChapterCardProps[]
  );

  useEffect(() => {
    async function loadData() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const chapterData = await getRecentChapters(user.id, 3);

        // Map chapters to ChapterCardProps with book titles
        const chaptersWithBookTitles = await Promise.all(
          chapterData.map(async (chapter) => {
            try {
              const book = await getBookById(chapter.book_id);

              return {
                book_id: chapter.book_id,
                title: chapter.title,
                word_count: chapter.word_count,
                updated_at: chapter.updated_at,
                book_title: book.title,
                href: `books/${chapter.book_id}/chapters/${chapter.id}`, // or wherever chapters are edited
              } as ChapterCardProps;
            } catch (err) {
              console.error("Error fetching book:", err);
              return {
                book_id: chapter.book_id,
                title: chapter.title,
                word_count: chapter.word_count,
                updated_at: chapter.updated_at,
                book_title: "Unknown Book",
                href: `books/${chapter.book_id}/chapters/${chapter.id}`,
              } as ChapterCardProps;
            }
          })
        );

        setRecentChapter(chaptersWithBookTitles);
      } catch (error) {
        console.error("Error loading chapters:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [user]);

  return (
    <section className="flex flex-col">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-xl font-semibold text-secondary-dark">
            Continue Writing
          </h2>
          <p className="text-sm text-secondary-dark">
            Jump back into your recent works
          </p>
        </div>
      </div>
      <div className="border-b-2 border-[#917F74]/39 mt-2"></div>
      {/* Carousel Time */}
      {recentChapter.length > 0 ? (
        <div className="flex flex-col w-full gap-4 pt-3">
          {recentChapter.map((chapter, idx) => (
            <ChapterCard
              key={`${chapter.book_id}-${chapter.title}`}
              {...chapter}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3 items-center justify-center w-full h-64">
          <Image
            src={no_chapters}
            alt="Man typing on a document on his computer"
            width={100}
            height={100}
          />
          <div className="text-center">
            <h3>Nothing to continue...yet</h3>
            <p>
              Once you start writing chapters, you can pick up right where you
              left off.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
