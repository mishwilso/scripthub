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
    .order("order_index", { ascending: true });

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

export async function updateChapterOrder(
  bookId: string, 
  chapters: {id: string, order_index: number}[]
) {
    const updates = chapters.map(chapter =>
      clientSupabase
      .from('chapters')
      .update({order_index: chapter.order_index})
      .eq('id', chapter.id)
      .eq('book_id', bookId)
    )

    const results = await Promise.all(updates)

    const errors = results.filter(r => r.error)
    if (errors.length > 0) {
      throw new Error('Failed to update chapter order')
    }

    return true
}
