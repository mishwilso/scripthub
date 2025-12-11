"use client";

import { useState, useEffect } from "react";
import ChapterCard from "./DraggableChapterCard";
import { Chapter, updateChapterOrder } from "@/lib/api/chapters";
import { IoAdd } from "react-icons/io5";

//TODO: updateChapterOrder,

interface ChaptersListProps {
  initialChapters: Chapter[];
  bookId: string;
}

export default function ChaptersList({
  initialChapters,
  bookId,
}: ChaptersListProps) {
  const [chapters, setChapters] = useState(initialChapters);
  const [draggedChapterId, setDraggedChapterId] = useState<string | null>(null);
  const [dropTargetId, setDropTargetId] = useState<string | null>(null); // Track where we'll drop

  // sync
  useEffect(() => {
    setChapters(initialChapters);
  }, [initialChapters]);

  // 1. Track dragged chapter
  const handleDragStart = (chapterId: string) => {
    setDraggedChapterId(chapterId);
    console.log("Started dragging:", chapterId);
  };

  // 2. when hover
  const handleDragOver = (targetChapterId: string) => {
    if (draggedChapterId && draggedChapterId !== targetChapterId) {
      setDropTargetId(targetChapterId);
    }
  };

  const handleDragLeave = () => {
    setDropTargetId(null);
  };

  // 3. When dropping:
  const handleDrop = async (targetChapterId: string) => {
    // if drop on itself do notion
    if (!draggedChapterId || targetChapterId === draggedChapterId) {
      setDraggedChapterId(null);
      setDropTargetId(null);
      return;
    }

    console.log(`Dropped ${draggedChapterId} on ${targetChapterId}`);

    //Find index of chapters
    const draggedIndex = chapters.findIndex((ch) => ch.id === draggedChapterId);
    const targetIndex = chapters.findIndex((ch) => ch.id === targetChapterId);

    // create new array of chapters - starteing with old chapters
    const newChapters = [...chapters];
    const [draggedChapter] = newChapters.splice(draggedIndex, 1);

    newChapters.splice(targetIndex, 0, draggedChapter);

    const updatedChapters = newChapters.map((chapter, index) => ({
      ...chapter,
      order_index: index,
    }));

    setChapters(updatedChapters);
    setDraggedChapterId(null);
    setDropTargetId(null);

    try {
      await updateChapterOrder(
        bookId,
        updatedChapters.map((ch) => ({
          id: ch.id,
          order_index: ch.order_index,
        }))
      );

      console.log("Order saved to database");
    } catch (error) {
      console.error("Failed to save order: ", error);

      // Go back to original
      setChapters(initialChapters);
    }
  };

  const handleDragEnd = () => {
    setDraggedChapterId(null);
    setDropTargetId(null);
  };

  return (
    <div className={"space-y-4"}>
      {chapters?.map((chapter) => (
        <div key={chapter.id}>
          {/* Drop indicator ABOVE this card */}
          {dropTargetId === chapter.id && draggedChapterId !== chapter.id && (
            <div className="flex items-center gap-2 my-2 animate-pulse">
              <div className="flex-1 h-1 bg-primary-base rounded-full" />
              <div className="w-8 h-8 rounded-full bg-primary-base flex items-center justify-center">
                <IoAdd size={20} className="text-white" />
              </div>
              <div className="flex-1 h-1 bg-primary-base rounded-full" />
            </div>
          )}

          <ChapterCard
            chapter={chapter}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragEnd={handleDragEnd}
            isDragging={draggedChapterId === chapter.id}
          />
        </div>
      ))}
    </div>
  );
}
