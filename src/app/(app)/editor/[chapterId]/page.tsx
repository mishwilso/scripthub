"use client"

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getChapter, Chapter } from "@/lib/api/chapters";
import { useBook } from "@/context/BookContext";

export default function ChapterEditor() {
  const params = useParams<{ chapterId: string }>();
  const [mainChapter, setMainChapter] = useState<Chapter>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadChapter() {
      try {
        const chapterData = await getChapter(params.chapterId);
        setMainChapter(chapterData);
      } catch (error) {
        console.error("Error fetching chapter data ", error);
      } finally {
        setLoading(false);
      }
    }

    loadChapter();
  }, [params.chapterId]);

  return (
    <div>
      <p>{params.chapterId}</p>
      <p>{JSON.stringify(mainChapter)}</p>
    </div>
  );
}
