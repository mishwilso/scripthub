import { clientSupabase } from "../supabase/client";
import { Tables, TablesInsert, TablesUpdate } from "../supabase/database.types";
import { Book } from "./books";


export type BookBranch = Tables<"book_branches">;
export type NewBookBranch = TablesInsert<"book_branches">;
type UpdatedBranch = TablesUpdate<"book_branches">;



export async function getBookBranches(bookId: string){
    const { data, error } = await clientSupabase
    .from('book_branches')
    .select('*')
    .eq('book_id', bookId)

    if (error) throw error

    return data as BookBranch[]
}

export async function getBranchName(branchId: string){
    const { data, error } = await clientSupabase
    .from('book_branches')
    .select('branch_name')
    .eq('id', branchId)
    .single()

    if (error) throw error

    return data 
} 