"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
  useCallback,
  RefObject,
} from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { Book, getBookById } from "@/lib/api/books";
import {
  Chapter,
  getChapter,
  getChapterDrafts,
  updateChapter,
  createChapterDraft,
} from "@/lib/api/chapters";
import { createBookActivity } from "@/lib/api/bookactivity";
import {
  BookBranch,
  getBookBranches,
  createBranch as createBranchAPI,
} from "@/lib/api/bookbranches";
import { timeStamp } from "console";

interface ChapterEditorContextType {
  // Branch and Book
  book: Book | null;
  mainBranch: BookBranch | null;
  currentBranch: BookBranch | null;
  branches: BookBranch[];
  switchBranch: (branchId: string) => Promise<void>;

  // Chapter and Draft
  mainChapter: Chapter | null;
  currentDraft: Chapter | null;
  drafts: Chapter[];
  switchDraft: (draftId: string) => Promise<void>;

  // Editor content
  content: string;
  updateContent: (newContent: string) => void;
  wordCount: number;
  updateWordCount: (newWordCount: number) => void;

  // Save status
  isSaving: boolean;
  lastSaved: Date | null;
  hasUnsavedChanges: RefObject<boolean>;

  // Actions
  changeTitle: (newTitle: string) => Promise<void>;
  saveContent: () => Promise<void>;
  commitChanges: (message: string) => Promise<void>;
  createDraft: (
    name: string,
  ) => Promise<{ success: boolean; error?: string; draft?: Chapter }>;
  createBranch: (
    name: string,
  ) => Promise<{ success: boolean; error?: string; branch?: BookBranch }>;

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

  const [mainChapter, setMainChapter] = useState<Chapter | null>(null);
  const [currentDraft, setCurrentDraft] = useState<Chapter | null>(null);
  const [drafts, setDrafts] = useState<Chapter[]>([]);

  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const [wordCount, setWordCount] = useState(currentDraft?.word_count || 0);

  // Save after 2 secs of no typing
  const debouncedContent = useDebounce(content, 2000);

  // Ref for unsaved changes
  const hasUnsavedChanges = useRef(false);

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
      setMainBranch(branchData.find((b) => b.is_main) || branchData[0]);
      setCurrentBranch(branchData.find((b) => b.is_main) || branchData[0]);
      setMainChapter(chapterData);
      setCurrentDraft(chapterData);
      setDrafts(draftData);
      setContent(chapterData.content || "");
    }

    loadEditorData();
  }, [bookId, chapterId]);

  // Update unchaved changed when content change
  // useEffect(() => {
  //   setHasUnsavedChanges(true);
  // }, [content]);

  // Autosave every 30 seconds
  // useEffect(() => {
  //   if (!hasUnsavedChanges) return;

  //   const timer = setTimeout(() => {
  //     saveContent();
  //   }, 30000);

  //   return () => clearTimeout(timer);
  // }, [content, hasUnsavedChanges]);

  // Saving Logic!
  const saveContent = useCallback(async () => {
    if (!currentDraft) return;

    setIsSaving(true);
    try {
      console.log("Saving Content for ChapterId: ", currentDraft.id);

      // Update chapter content
      await updateChapter(currentDraft!.id, { content, word_count: wordCount });

      hasUnsavedChanges.current = false;
      setLastSaved(new Date());
      console.log("Saved to database");

      // clear local after succeful db save
      const localKey = `scripthub_draft_${chapterId}`;
      localStorage.removeItem(localKey);
    } catch (error) {
      console.error("Error saving:", error);
    } finally {
      setIsSaving(false);
    }
  }, [chapterId, content, currentDraft, wordCount]);

  // Immediate: goes to state happens everytime we type
  const updateContent = useCallback((newContent: string) => {
    setContent(newContent);
    hasUnsavedChanges.current = true;
  }, []);

  // Debounced: whenever theres a pause with the user typing
  useEffect(() => {
    if (!chapterId) return;

    const localKey = `scripthub_draft_${chapterId}`;
    const draftData = {
      content: debouncedContent,
      timeStamp: new Date().toISOString(),
      chapterId: chapterId,
      bookId: bookId,
    };

    localStorage.setItem(localKey, JSON.stringify(draftData));
    console.log("Saved to localStorage");
  }, [debouncedContent, chapterId, bookId]);

  // Periodic: push to databse every 30 secs
  useEffect(() => {
    const intervalId = setInterval(async () => {
      if (!chapterId || !hasUnsavedChanges.current) return;

      await saveContent();
    }, 30000);

    return () => clearInterval(intervalId);
  }, [chapterId, saveContent]);

  // On unmount aka when user reloads page: save immediately
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges.current) {
        // goes to localStorage
        const localKey = `scripthub_draft_${chapterId}`;
        localStorage.setItem(
          localKey,
          JSON.stringify({
            content,
            timestamp: new Date().toISOString(),
            chapterId: chapterId,
          }),
        );

        // TODO: Implement warning user of unsaved changes
        e.preventDefault();
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden && hasUnsavedChanges.current) {
        saveContent(); // Try to save when tab becomes hidden
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      // Save
      if (hasUnsavedChanges.current) {
        saveContent();
      }
    };
  }, [content, chapterId]);

  const updateWordCount = (newWordCount: number) => {
    setWordCount(newWordCount);
  };

  const changeTitle = async (newTitle: string) => {
    if (!currentDraft) return;

    await updateChapter(currentDraft!.id, { title: newTitle });
  };

  const switchBranch = async (branchId: string) => {
    const branch = branches.find((b) => b.id === branchId);
    if (!branch) return;

    setCurrentBranch(branch);
  };

  const switchDraft = async (draftId: string) => {
    const draft = drafts.find((d) => d.id === draftId) || mainChapter;
    if (!draft) return;

    // Save current draft first if there are changes
    if (hasUnsavedChanges.current) {
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
      chapter_name: mainChapter?.title,
      branch_name: "main",
    });
  };

  const createDraft = async (name: string) => {
    if (!currentDraft) {
      console.error("No current draft to branch from");
      return { success: false, error: "No current draft to branch from" };
    }

    const newDraft = await createChapterDraft(currentDraft!.id, name);

    if (!newDraft) {
      console.error("Failed to create draft");
      return { success: false, error: "Failed to create draft" };
    }

    setDrafts((prevDrafts) => [...prevDrafts, newDraft]);
    return { success: true, draft: newDraft };
  };

  const createBranch = async (
    name: string,
  ): Promise<{ success: boolean; error?: string; branch?: BookBranch }> => {
    try {
      const branchData = await createBranchAPI(bookId, { branch_name: name });

      if (branchData && branchData.length > 0) {
        // Refresh branches list
        const updatedBranches = await getBookBranches(bookId);
        setBranches(updatedBranches);

        return { success: true, branch: branchData[0] as BookBranch };
      }

      return { success: false, error: "Failed to create draft" };
    } catch (error: unknown) {
      // Check for duplicate name error (Supabase unique constraint violation)
      if (
        error &&
        typeof error === "object" &&
        "code" in error &&
        error.code === "23505"
      ) {
        return {
          success: false,
          error:
            "A draft with this name already exists. Please choose a different name.",
        };
      }

      // Check for error message containing duplicate indication
      if (
        error instanceof Error &&
        error.message?.toLowerCase().includes("duplicate")
      ) {
        return {
          success: false,
          error:
            "A draft with this name already exists. Please choose a different name.",
        };
      }

      console.error("Error creating branch:", error);
      return {
        success: false,
        error: "Failed to create draft. Please try again.",
      };
    }
  };

  const refreshChapter = async () => {
    const chapterData = await getChapter(chapterId);
    setMainChapter(chapterData);
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
        mainChapter,
        currentDraft,
        drafts,
        switchBranch,
        switchDraft,
        content,
        updateContent,
        wordCount,
        updateWordCount, // This is now derived, not state
        isSaving,
        lastSaved,
        hasUnsavedChanges,
        changeTitle,
        saveContent,
        commitChanges,
        createDraft,
        createBranch,
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
      "useChapterEditor must be used within ChapterEditorProvider",
    );
  }

  return context;
}
