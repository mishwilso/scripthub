// In lib/api/books.ts:

// getUserBooks(userId) - get all books for a user
// getBookById(bookId) - get single book details
// createBook(bookData) - create new book
// updateBook(bookId, updates) - update book info
// deleteBook(bookId) - delete a book
// archiveBook(bookId) - archive a book
import { clientSupabase } from '@/lib/supabase/client'
import { Tables, TablesInsert, TablesUpdate } from '../supabase/database.types'


type Book = Tables<'books'>;
type NewBook = TablesInsert<'books'>;
type UpdatedBook = TablesUpdate<'books'>;

export async function getUserBooks(userId: string) {
    const {data, error} = await clientSupabase
    .from('books')
    .select('*')
}