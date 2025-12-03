// Chapters API Functions
// In lib/api/chapters.ts:

import { clientSupabase } from "@/lib/supabase/client";
import { Tables, TablesInsert, TablesUpdate } from "../supabase/database.types";

export type Chapter = Tables<"chapters">;
type NewChapter = TablesInsert<"chapters">;
type UpdatedChapter = TablesUpdate<"chapters">;

// getBookChapters(bookId) - all chapters for a book
export async function getBookChapters(bookId: string) {
  const { data, error } = await clientSupabase
    .from("chapters")
    .select("*")
    .eq("book_id", bookId)
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return data;
}

// getRecentChapters(userId, limit) - recently updated chapters
export async function getRecentChapters(userId: string, limit: number) {
  const { data, error } = await clientSupabase
    .from("chapters")
    .select("id, book_id, title, word_count, branch, updated_at")
    .eq("user_id", userId)
    .limit(limit);

  if (error) throw error;
  return data;
}

// createChapter(chapterData) - create new chapter
export async function createChapter(chapterData: NewChapter) {
  const { data, error } = await clientSupabase
    .from("chapters")
    .insert(chapterData)
    .select();

  if (error) throw error;
  return data[0];
}

// updateChapter(chapterId, updates) - update chapter
export async function updateChapter(
  chapterId: string,
  updates: UpdatedChapter
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
