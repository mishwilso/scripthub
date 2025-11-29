// TODO: Handle Errors properly rather than just throwing them

import { clientSupabase } from "@/lib/supabase/client";
import { Tables, TablesInsert, TablesUpdate } from "../supabase/database.types";

export type Book = Tables<"books">;
type NewBook = TablesInsert<"books">;
type UpdatedBook = TablesUpdate<"books">;

// getUserBooks(userId) - get all books for a user
export async function getUserBooks(userId: string) {
  const { data, error } = await clientSupabase
    .from("books")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return data;
}

// getRecentBooks(userId, limit) - recently updated chapters
export async function getRecentBooks(userId: string, limit: number) {
  const { data, error } = await clientSupabase
    .from("books")
    .select("book_id, title")
    .eq("user_id", userId)
    .limit(limit);

  if (error) throw error;
  return data;
}

// getBookById(bookId) - get single book details
export async function getBookById(bookId: string) {
  const { data, error } = await clientSupabase
    .from("books")
    .select("*")
    .eq("id", bookId)
    .single();

  if (error) throw error;
  return data;
}

// createBook(bookData) - create new book
export async function createBook(insertData: NewBook) {
  const { data, error } = await clientSupabase
    .from("books")
    .insert(insertData)
    .single();

  if (error) throw error;
  return data;
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
