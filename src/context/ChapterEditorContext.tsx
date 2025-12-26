"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import { Book, getBookById } from "@/lib/api/books";
import {
  Chapter,
  getChapter,
  getChapterDrafts,
  updateChapter,
  createChapterDraft,
} from "@/lib/api/chapters";
import { createBookActivity } from "@/lib/api/bookactivity";
import { BookBranch, getBookBranches } from "@/lib/api/bookbranches";

interface ChapterEditorContextType {
  // Branch and Book
  book: Book | null;
  mainBranch: BookBranch | null;
  currentBranch: BookBranch | null;
  branches: BookBranch[];
  switchBranch: (branchId: string) => Promise<void>;

  // Chapter and Draft
  chapter: Chapter | null;
  currentDraft: Chapter | null;
  drafts: Chapter[];
  switchDraft: (draftId: string) => Promise<void>;

  // Editor content
  content: string;
  updateContent: (newContent: string) => void;
  wordCount: number;

  // Save status
  isSaving: boolean;
  lastSaved: Date | null;
  hasUnsavedChanges: boolean;

  // Actions
  changeTitle: (newTitle: string) => Promise<void>;
  saveContent: () => Promise<void>;
  commitChanges: (message: string) => Promise<void>;
  createDraft: (name: string) => Promise<void>;

  // Permissions
  canEdit: boolean;
  canComment: boolean;

  // Refresh functions
  refreshChapter: () => Promise<void>;
  refreshBranches: () => Promise<void>;
}

const ChapterEditorContext = createContext<
  ChapterEditorContextType | undefined
>(undefined);

export function ChapterEditorProvider({
  bookId,
  chapterId,
  children,
}: {
  bookId: string;
  chapterId: string;
  children: ReactNode;
}) {
  const [book, setBook] = useState<Book | null>(null);
  const [mainBranch, setMainBranch] = useState<BookBranch | null>(null);
  const [currentBranch, setCurrentBranch] = useState<BookBranch | null>(null);
  const [branches, setBranches] = useState<BookBranch[]>([]);

  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [currentDraft, setCurrentDraft] = useState<Chapter | null>(null);
  const [drafts, setDrafts] = useState<Chapter[]>([]);

  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const wordCount = useMemo(() => {
    return content.trim().split(/\s+/).filter(Boolean).length;
  }, [content]);

  // Load initial data
  useEffect(() => {
    async function loadEditorData() {
      //Load book, branch, chapter, drafts
      const bookData = await getBookById(bookId);
      const branchData = await getBookBranches(bookId);
      const chapterData = await getChapter(chapterId);
      const draftData = await getChapterDrafts(chapterId);

      setBook(bookData);
      setBranches(branchData);
      setMainBranch(branchData.find((b) => b.is_main) || branchData[0])
      setCurrentBranch(branchData.find((b) => b.is_main) || branchData[0]);
      setChapter(chapterData);
      setCurrentDraft(chapterData);
      setDrafts(draftData);
      setContent(chapterData.content || "");
    }

    loadEditorData();
  }, [bookId, chapterId]);

  // Update unchaved changed when content change
  useEffect(() => {
    setHasUnsavedChanges(true);
  }, [content]);

  // Autosave every 30 seconds
  useEffect(() => {
    if (!hasUnsavedChanges) return;

    const timer = setTimeout(() => {
      saveContent();
    }, 30000);

    return () => clearTimeout(timer);
  }, [content, hasUnsavedChanges]);

  const updateContent = (newContent: string) => {
    setContent(newContent);
  };

  const changeTitle = async (newTitle: string) => {
    if (!currentDraft) return;

    await updateChapter(currentDraft!.id, { title: newTitle });
  };

  const saveContent = async () => {
    if (!currentDraft) return;

    setIsSaving(true);
    try {
      await updateChapter(currentDraft!.id, { content, word_count: wordCount });

      setLastSaved(new Date());
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error("Error saving:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const switchBranch = async (branchId: string) => {
    const branch = branches.find((b) => b.id === branchId);
    if (!branch) return;

    setCurrentBranch(branch);
  };

  const switchDraft = async (draftId: string) => {
    const draft = drafts.find((d) => d.id === draftId) || chapter;
    if (!draft) return;

    // Save current draft first if there are changes
    if (hasUnsavedChanges) {
      await saveContent();
    }

    setCurrentDraft(draft);
    setContent(draft.content || "");
  };

  const commitChanges = async (message: string) => {
    // Save first
    await saveContent();

    // Create commit in book_activity
    await createBookActivity(bookId, "commit", {
      commit_message: message,
      chapter_name: chapter?.title,
      branch_name: "main",
    });
  };

  const createDraft = async (name: string) => {
    if (!currentDraft) {
      console.error("No current draft to branch from");
      return;
    }

    const newDraft = await createChapterDraft(currentDraft!.id, name);

    if (!newDraft) {
      console.error("Failed to create draft");
      return;
    }

    setDrafts((prevDrafts) => [...prevDrafts, newDraft]);
  };

  const refreshChapter = async () => {
    const chapterData = await getChapter(chapterId);
    setChapter(chapterData);
  };

  const refreshBranches = async () => {
    const branchData = await getBookBranches(bookId);
    setBranches(branchData);
  };

  return (
    <ChapterEditorContext.Provider
      value={{
        book,
        mainBranch,
        currentBranch,
        branches,
        chapter,
        currentDraft,
        drafts,
        switchBranch,
        switchDraft,
        content,
        updateContent,
        wordCount, // This is now derived, not state
        isSaving,
        lastSaved,
        hasUnsavedChanges,
        changeTitle,
        saveContent,
        commitChanges,
        createDraft,
        canEdit: true,
        canComment: true,
        refreshChapter,
        refreshBranches,
      }}
    >
      {children}
    </ChapterEditorContext.Provider>
  );
}

export function useChapterEditor() {
  const context = useContext(ChapterEditorContext);
  if (!context) {
    throw new Error(
      "useChapterEditor must be used within ChapterEditorProvider"
    );
  }

  return context;
}
