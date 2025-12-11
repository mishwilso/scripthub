"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getBookById, BookData } from "@/lib/api/books";
import { getBookStats, BookStats } from "@/lib/api/bookStats";
import { getBookCollaborators, Collaborator } from "@/lib/api/collaborators";

interface BookContextType {
  book: BookData | null;
  stats: BookStats | null;
  collaborators: Collaborator[] | null;
  loading: boolean;
  error: boolean;
  refreshBook: () => Promise<void>;
  refreshStats: () => Promise<void>;
  refreshCollaborators: () => Promise<void>;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export function BookProvider({
  bookId,
  children,
}: {
  bookId: string;
  children: ReactNode;
}) {
  const [book, setBook] = useState<BookData | null>(null);
  const [stats, setStats] = useState<BookStats | null>(null);
  const [collaborators, setCollaborators] = useState<Collaborator[] | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadBook = async () => {
    try {
      const bookData = await getBookById(bookId);
      setBook(bookData);
    } catch (error) {
      console.error("Error loading book:", error);
      setError(true);
    }
  };

  const loadStats = async () => {
    try {
      const statsData = await getBookStats(bookId);
      setStats(statsData);
    } catch (error) {
      console.error("Error loading book stats:", error);
      setError(true);
    }
  };



  const loadCollaborators = async () => {
    try {
      const collaboratorsData = await getBookCollaborators(bookId);
      setCollaborators(collaboratorsData);
    } catch (error) {
      console.error("Error loading book collaborators:", error);
      setError(true);
    }
  };

  const refreshBook = async () => {
    await loadBook();
  };

  const refreshStats = async () => {
    await loadStats();
  };

  const refreshCollaborators = async () => {
    await loadCollaborators();
  };



  useEffect(() => {
    async function loadBookData() {
      setLoading(true);
      await Promise.all([
        loadBook(),
        loadStats(),
        loadCollaborators(),
      ]);
      setLoading(false);
    }

    loadBookData();
  }, [bookId]);

  return (
    <BookContext.Provider
      value={{
        book,
        stats,
        collaborators,
        loading,
        error,
        refreshBook,
        refreshStats,
        refreshCollaborators,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}

export function useBook() {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error("useBook must be used within a BookProvider");
  }
  return context;
}
