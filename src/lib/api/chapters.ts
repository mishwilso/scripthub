

import { clientSupabase } from "@/lib/supabase/client";
import { Tables, TablesInsert, TablesUpdate } from "../supabase/database.types";

export type Chapter = Tables<"chapters">;
type NewChapter = TablesInsert<"chapters">;
type UpdatedChapter = TablesUpdate<"chapters">;

export async function getBookChapters(bookId: string) {
  const { data, error } = await clientSupabase
    .from("chapters")
    .select("*")
    .eq("book_id", bookId)
    .order("order_index", { ascending: true });

  if (error) throw error;
  return data;
}

/**
 * Get recently updated MAIN chapters for a user (excludes drafts)
 * Used for "Recent Work" dashboard widget.
 */
export async function getRecentChapters(userId: string, limit: number) {
  const { data, error } = await clientSupabase
    .from("chapters")
    .select("*")
    .eq("user_id", userId)
    .eq("is_main", true)
    .limit(limit);

  if (error) throw error;
  return data;
}


export async function createChapter(chapterData: NewChapter) {
  const { data, error } = await clientSupabase
    .from("chapters")
    .insert(chapterData)
    .select();

  if (error) throw error;
  return data[0];
}


export async function getChapter(chapterId: string) {
  // Check localStorage for newer unsaved content
  const localKey = `scripthub_draft_${chapterId}`;
  const localDraft = localStorage.getItem(localKey);

  const { data, error } = await clientSupabase
    .from("chapters")
    .select("*")
    .eq("id", chapterId)
    .single();

  if (error) throw error;

  if (localDraft) {
    const draft = JSON.parse(localDraft);
    const localTimestamp = new Date(draft.timestamp);
    const dbTimestamp = new Date(data?.updated_at || "");

    if (localTimestamp > dbTimestamp) {
      // Local is newer - use it and show a notification
      console.log("📝 Using local draft (newer than database)");

      return { ...data, content: draft.content } as Chapter;
    }
  }

  return data;
}


export async function getBookMainChapters(bookId: string) {
  const { data, error } = await clientSupabase
    .from("chapters")
    .select("*")
    .eq("book_id", bookId)
    .eq("is_main", true)
    .order("order_index", { ascending: true });

  if (error) throw error;
  return data;
}


export async function getChapterCount(bookId: string) {
  const { count, error } = await clientSupabase
    .from("chapters")
    .select("*", { count: "exact", head: true })
    .eq("book_id", bookId)
    .eq("is_main", true)
    .order("order_index", { ascending: true });

  if (error) throw error;
  return count;
}


export async function getDraftCount(mainChapterId: string) {
  const { count, error } = await clientSupabase
    .from("chapters")
    .select("*", { count: "exact", head: true })
    .eq("main_chapter_id", mainChapterId)
    .eq("is_main", false);

  if (error) throw error;

  return count || 0;
}

// updateChapter(chapterId, updates) - update chapter
export async function updateChapter(
  chapterId: string,
  updates: UpdatedChapter,
) {
  const { data, error } = await clientSupabase
    .from("chapters")
    .update(updates)
    .eq("id", chapterId)
    .single();

  if (error) throw error;
  return data;
}

// deleteChapter(chapterId) - delete chapter
export async function deleteChapter(chapterId: string) {
  const response = await clientSupabase
    .from("chapters")
    .delete()
    .eq("id", chapterId);

  return response;
}

export async function updateChapterOrder(
  bookId: string,
  chapters: { id: string; order_index: number }[],
) {
  const updates = chapters.map((chapter) =>
    clientSupabase
      .from("chapters")
      .update({ order_index: chapter.order_index })
      .eq("id", chapter.id)
      .eq("is_main", true)
      .eq("book_id", bookId),
  );

  const results = await Promise.all(updates);

  const errors = results.filter((r) => r.error);
  if (errors.length > 0) {
    throw new Error("Failed to update chapter order");
  }

  return true;
}

// TODO: Run through this to check correctness
export async function getChapterDrafts(mainChapterId: string) {
  const { data, error } = await clientSupabase
    .from("chapters")
    .select("*")
    .eq("main_chapter_id", mainChapterId)
    .eq("is_main", false)
    .order("created_at", { ascending: true });

  if (error) throw error;

  return data;
}

// Create a new draft from an existing chapter/draft
export async function createChapterDraft(
  sourceChapterId: string, // Can be main chapter or another draft
  draftName: string,
) {
  // First, get the source chapter
  const { data: source } = await clientSupabase
    .from("chapters")
    .select("*")
    .eq("id", sourceChapterId)
    .single();

  if (!source) throw new Error("Failed to create draft");

  // Determine the main chapter ID
  const mainChapterId = source.is_main ? source.id : source.main_chapter_id;

  // Create the new draft
  const { data, error } = await clientSupabase
    .from("chapters")
    .insert({
      book_id: source.book_id,
      branch_id: source.branch_id,
      title: source.title,
      content: source.content, // Copy content from source
      word_count: source.word_count,
      is_main: false,
      main_chapter_id: mainChapterId,
      draft_name: draftName,
      branched_from_id: sourceChapterId,
      user_id: source.user_id,
      order_index: source.order_index,
    })
    .select()
    .single();

  return data;
}