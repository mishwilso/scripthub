"use client";
// TODO:
// Chapter Name
// Word Count
// Fun Stuff
// Mobile sidebar toggles
// Branch name
// Commit Button
// Merge Button

import IconButton from "@/components/ui/IconButton";
import Button from "@/components/ui/Button";
import Tags from "@/components/ui/Tags";

import { useChapterEditor } from "@/context/ChapterEditorContext";

import { useState, useContext, useEffect, useRef } from "react";

import { FaCodeBranch } from "react-icons/fa6";
import { FiGitBranch } from "react-icons/fi";
import { IoGitCommit } from "react-icons/io5";
import { FiCoffee } from "react-icons/fi";
import { LuTimer } from "react-icons/lu";
import { IoMdNotificationsOutline } from "react-icons/io";
import { ChangeEvent, FormEvent } from "react";

import Dropdown, { DropdownContext } from "../ui/Dropdown";
import { Chapter, getBookMainChapters } from "@/lib/api/chapters";
import { IoDocumentTextOutline, IoTimeOutline } from "react-icons/io5";
import { IoChevronDown, IoAdd } from "react-icons/io5";
import { getBookById } from "@/lib/api/books";
import { useBook } from "@/context/BookContext";

import { IoMenu } from "react-icons/io5";


interface EditorHeaderProps {
  onToggleLeftSideBar: () => void;
  onToggleRightSideBar: () => void;
  wordCount: number;
}

export default function EditorHeader({
  onToggleLeftSideBar,
  onToggleRightSideBar,
  wordCount,
}: EditorHeaderProps) {
  const { mainChapter, currentBranch, changeTitle } = useChapterEditor();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { book } = useBook();

  useEffect(() => {
    if (titleRef.current && titleRef.current.textContent !== mainChapter?.title) {
      titleRef.current.textContent = mainChapter?.title || "";
    }
  }, [mainChapter?.title]);

  function onChangeTitle(e: React.FormEvent<HTMLHeadingElement>) {
    console.log(`changing to: ${e.currentTarget.textContent}`);
    changeTitle(e.currentTarget.textContent);
  }

  const handleBlur = () => {
    // Save title when user clicks away
    // You can call an API here to persist
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLHeadingElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  return (
    <header className="flex-col py-3 border-b border-neutral-dark/10 px-7 z-20">
      <div className="flex flex-col lg:flex-row items-center lg:items-start ">
          {/* Chapter title */}
          <h1
            ref={titleRef}
            className="lg:hidden font-normal text-lg text-neutral-dark"
            contentEditable={true}
            suppressContentEditableWarning
            onInput={onChangeTitle}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onChange={onChangeTitle}
          >
            {mainChapter?.title}
          </h1>

        <ChapterOptions bookTitle={book?.title || ""}/>

        
        {/* Commit Button
        <Button startIcon={<IoGitCommit />}>Commit</Button> */}

      </div>
      <div className="flex items-center justify-between">
        {/* Left Widgets */}
        <div className="flex items-center gap-3">
          {/* Mobile only left side bar toggle */}
          <IconButton
            onClick={onToggleLeftSideBar}
            altText="Toggle Branch Sidebar"
            className="lg:hidden"
            variant="standard"
          >
            <FaCodeBranch size={16} />
          </IconButton>

          {/* Chapter title */}
          <h1
            ref={titleRef}
            className="hidden lg:block   font-normal text-lg text-neutral-dark"
            contentEditable={true}
            suppressContentEditableWarning
            onInput={onChangeTitle}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onChange={onChangeTitle}
          >
            {mainChapter?.title}
          </h1>

          {/* Branch tag */}
          <Tags className="hidden lg:flex" variant="version">
            <>
              <FiGitBranch />
              {currentBranch?.branch_name}
            </>
          </Tags>
        </div>

        {/* Right Widgets */}
        <div className="flex items-center gap-4">
          {/* Word Count */}
          <span className="font-medium">
            <b>{wordCount}</b> words
          </span>

          {/* Vertical Divider */}
          <div className="border-l border-neutral-dark h-6"></div>

          {/* Action Icons */}
          <FiCoffee size={20} />
          <LuTimer size={20} />
          <IoMdNotificationsOutline size={20} />

          {/* Mobile only left side bar toggle */}
          <IconButton
            onClick={onToggleRightSideBar}
            altText="Toggle Tool Sidebar"
            className="lg:hidden"
            variant="standard"
          >
            <IoMenu size={16} />
          </IconButton>
        </div>
      </div>
    </header>
  );
}


function ChapterDropdownButton({ bookTitle }: { bookTitle: string }) {
  const { isOpen } = useContext(DropdownContext) || { isOpen: false };

  return (
    <Dropdown.Button asChild>
      <Button 
      variant="text" 
      className="font-bold px-1" 
      color="tertiary" 
      endIcon={<IoChevronDown
          size={16}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-0" : "-rotate-90"
          }`}
        />}>
        {bookTitle}
        
      </Button>
    </Dropdown.Button>
  );
}

export function ChapterOptions({ bookTitle }: { bookTitle: string }) {
  const { book } = useChapterEditor();
  const [chapters, setChapters] = useState<Chapter[]>([]);

  useEffect(() => {
    async function loadChapters() {
      if (!book?.id) return;
      try {
        const bookChapters = await getBookMainChapters(book.id);
        setChapters(bookChapters);
      } catch (error) {
        console.error("Error loading chapters:", error);
      }
    }

    loadChapters();
  }, [book?.id]);

  return (
    <Dropdown>
      <ChapterDropdownButton bookTitle={bookTitle} />


      <Dropdown.Menu maxVisibleItems={6} size="w-64">
        {chapters.map((chapter) => (
          <Dropdown.Option
            key={chapter.id}
            href={`/books/${book?.id}/chapters/${chapter.id}`}
          >
            {chapter.title || "Untitled Chapter"}
          </Dropdown.Option>
        ))}

        <Dropdown.Footer>
          <Dropdown.Option
            primary
            startIcon={<IoAdd />}
            onClick={() => {
              // TODO: Implement create chapter
            }}
          >
            Create New Chapter
          </Dropdown.Option>
        </Dropdown.Footer>
      </Dropdown.Menu>
    </Dropdown>
  );
}
