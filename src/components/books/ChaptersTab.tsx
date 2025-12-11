// TODO: Implement Drag and Drop Chapters

import Button from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import Card from "@/components/ui/Card";
import { FaPlus } from "react-icons/fa6";
import { useBook } from "@/context/BookContext";
import { getBookChapters, Chapter } from "@/lib/api/chapters";
import { FiGitBranch } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { useState, useEffect, useRef } from "react";
import ChapterCard from "./DraggableChapterCard"
import ChaptersList from "./ChaptersList";


export default function ChaptersTab() {
  const { book, stats } = useBook();
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadChapters() {
      if (!book?.id) return;
      try {
        const chapterData = await getBookChapters(book.id)
        setChapters(chapterData)
      } catch (error) {
        console.log("Error loading chapter data: ", error)
      } finally {
        setLoading(false)
      }
    }

    loadChapters();

  }, [book?.id])

  if (!book?.id) return;

  console.log("This is the chapters array in tab", chapters)

  return (
    <>
      {/* Header */}
      <div className="flex justify-between">
        <div>
          <h3 className="text-xl font-semibold">
            Chapters ({stats?.chapterCount})
          </h3>
          <p className="text-sm">Organize and manage your chapters</p>
        </div>
        <div className="flex gap-4 items-start">
          <BranchOptions />
          <Button startIcon={<FaPlus />}>New Chapter</Button>
        </div>
      </div>

      {/* Divider */}
      <div
        className={`border-b-2 border-outline-light mx-[-2.75rem] p-0 -mt-20`}
      ></div>

      {/* Chapter Section */}
      {loading && <p>Loading chapters...</p>}

      <ChaptersList initialChapters={chapters} bookId={book.id}/>
    </>
  );
}

export function BranchOptions() {
  return (
    <Dropdown>
      <Dropdown.Button>
        <div className="flex md:w-auto gap-8 w-full bg-transparent border-2 border-primary-base text-primary-base hover:bg-secondary-dark/1 active:bg-white-dark px-4 py-2 text-sm rounded-xl cursor-pointer items-center justify-center text-medium font-medium">
          <div className={"flex gap-2 items-center"}>
            {<FiGitBranch />}
            <span>main</span>
          </div>
          {<IoIosArrowDown />}
        </div>
      </Dropdown.Button>

      <Dropdown.Menu position="bottom span-right">
        <Dropdown.Option>Branches coming soon...</Dropdown.Option>
      </Dropdown.Menu>
    </Dropdown>
  );
}


