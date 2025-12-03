// TODO: Handle Errors properly rather than just throwing them

import { clientSupabase } from "@/lib/supabase/client";
import { Tables, TablesInsert, TablesUpdate } from "../supabase/database.types";

import { v4 as uuidv4 } from "uuid";

export type Book = Tables<"books">;
export type NewBook = TablesInsert<"books">;
export type BookData = Book & {chapter_count: number};
type UpdatedBook = TablesUpdate<"books">;

// getUserBooks(userId) - get all books for a user
export async function getUserBooks(userId: string) {
  const { data, error } = await clientSupabase
    .from("books")
    .select(`
      *,
      chapters(count)
    `)
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error) throw error;

  return data.map(book => ({
    ...book,
    chapter_count: book.chapters[0]?.count || 0
  }));
}

// getRecentBooks(userId, limit) - recently updated chapters
export async function getRecentBooks(userId: string, limit: number) {
  const { data, error } = await clientSupabase
    .from("books")
    .select("id, title")
    .eq("user_id", userId)
    .limit(limit);

  if (error) throw error;
  return data;
}

// getBookById(bookId) - get single book details
export async function getBookById(bookId: string) {
  const { data, error } = await clientSupabase
    .from("books")
    .select(`
      *,
      chapters(count)`)
    .eq("id", bookId)
    .single();

  if (error) throw error;
  return {
    ...data,
    chapter_count: data.chapters[0]?.count || 0
  };
}

// createBook(bookData) - create new book
export async function createBook(insertData: NewBook) {
  const { data, error } = await clientSupabase
    .from("books")
    .insert(insertData)
    .select();

  if (error) throw error;
  return data[0];
}

// updateBook(bookId, updates) - update book info
export async function updateBook(bookId: string, updates: UpdatedBook) {
  const { data, error } = await clientSupabase
    .from("books")
    .update(updates)
    .eq("id", bookId)
    .single();

  if (error) throw error;
  return data;
}

// deleteBook(bookId) - delete a book
export async function deleteBook(bookId: string) {
  const response = await clientSupabase.from("books").delete().eq("id", bookId);

  return response;
}

// archiveBook(bookId) - archive a book
export async function archiveBook(bookId: string) {
  const { data, error } = await clientSupabase
    .from("books")
    .update({ status: "archive" })
    .eq("id", bookId)
    .single();

  if (error) throw error;
  return data;
}

// upload bookcover
export async function uploadBookCover(
  bookFile: File,
  fileName: string,
  userId: string
) {
  const { data, error } = await clientSupabase.storage
    .from("book-covers")
    .upload(`${userId}/${uuidv4()}-${fileName}`, bookFile, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw error;
  return data;
}

// get coverUrl
export async function getBookCoverURL(filePath: string) {
  const { data } = clientSupabase.storage
    .from("book-covers")
    .getPublicUrl(filePath);

  return data;
}
