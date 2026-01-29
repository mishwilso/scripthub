
import { clientSupabase } from "../supabase/client";
import { Tables, TablesInsert, TablesUpdate } from "../supabase/database.types";
import { Book } from "./books";


export type BookBranch = Tables<"book_branches">;
export type NewBookBranch = TablesInsert<"book_branches">;
export type CreateBranchInput = Omit<NewBookBranch, 'book_id' | 'user_id' | 'created_from_branch_id' | 'is_main'>;
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


export async function getBranchById(branchId: string){
    const { data, error } = await clientSupabase
    .from('book_branches')
    .select('*')
    .eq('id', branchId)
    .single();

    if (error) throw error;

    return data as BookBranch;
 }


export async function getBranchBySlug(bookId: string, branchSlug: string){
    const { data, error } = await clientSupabase
    .from('book_branches')
    .select('*')
    .eq('book_id', bookId)
    .eq('branch_name', branchSlug)
    .single();

    if (error) throw error;

    return data as BookBranch;
}

export async function createBranch(bookId: string, branchData: CreateBranchInput){
    const { data: user } = await clientSupabase.auth.getUser();

    const { data: id } = 
        await clientSupabase
        .from('book_branches')
        .select('id')
        .eq('book_id', bookId)
        .eq('is_main', true)
        .single();

    if (id !== null) {
        const { data, error } = await clientSupabase
        .from('book_branches')
        .insert({...branchData,
            user_id: user.user?.id,
            created_from_branch_id: id.id,
            is_main: false,
            book_id: bookId,
        })
        .select()

        if (error) throw error;

        return data;

    } else {
        throw Error("Owner Book Not Found")
    }
}