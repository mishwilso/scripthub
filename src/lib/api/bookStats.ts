import { clientSupabase } from "../supabase/client";

export interface BookStats {
  chapterCount: number;
  totalWordCount: number;
  avgWordsPerChapter: number;
  recentWordCount: number;
  branchCount: number;
  activeBranches: number;
  lastUpdatedDate: string;
  lastUpdatedTime: string;
}

export async function getBookStats(bookId: string): Promise<BookStats> {
  const { data: chapters, error: chaptersError } = await clientSupabase
    .from("chapters")
    .select("word_count")
    .eq("book_id", bookId)
    .eq("is_main", true);

  if (chaptersError) throw chaptersError;

  const chapterCount = chapters?.length || 0;
  const totalWordCount =
    chapters?.reduce((sum, chapter) => sum + chapter.word_count || 0, 0) || 0;
  const avgWordsPerChapter =
    chapterCount > 0 ? Math.round(totalWordCount / chapterCount) : 0;
  const recentWordCount = 0;

  // TODO HANDLE BRANCH DATA WHEN IMPLEMENTED

  const branchCount = 1;
  const activeBranches = 1;

  const { data: lastUpdatedData, error: lastUpdatedError } =
    await clientSupabase
      .from("books")
      .select("updated_at")
      .eq("id", bookId)
      .single();

  if (lastUpdatedError) throw lastUpdatedError;

  const dateFormat: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const timeFormat: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };
  const lastUpdatedDate = lastUpdatedData.updated_at
    ? new Date(lastUpdatedData.updated_at).toLocaleDateString(
        undefined,
        dateFormat
      )
    : "";
  const lastUpdatedTime = lastUpdatedData.updated_at
    ? new Date(lastUpdatedData.updated_at).toLocaleTimeString(
        "en-US",
        timeFormat
      )
    : "";

  return {
    chapterCount,
    totalWordCount,
    avgWordsPerChapter,
    recentWordCount,
    branchCount,
    activeBranches,
    lastUpdatedDate,
    lastUpdatedTime,
  };
}
