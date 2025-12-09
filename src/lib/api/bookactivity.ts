// Activity Type
// -- 'commit', 'branch_created', 'branch_merged', 'chapter_created', 
// -- 'chapter_updated', 'collaborator_added', etc.

import { clientSupabase } from "../supabase/client";
import { Tables, TablesInsert, TablesUpdate } from "../supabase/database.types";


export type BookActivity = Tables<"book_activity">;
export type NewActivity = TablesInsert<"book_activity">;
type UpdatedActivity = TablesUpdate<"book_activity">;

// Activity Data

//// Commit
// {
//   "commit_message": "Chapter 12 - The Betrayal",
//   "branch_name": "main",
//   "chapter_id": "uuid..."
// }

// // Branch created
// {
//   "branch_name": "alternate-ending"
// }

// // Chapter created
// {
//   "chapter_name": "Secrets of the Archive",
//   "chapter_number": 13
// }

// // Collaborator added
// {
//   "collaborator_email": "user@example.com",
//   "role": "editor"
// }

export async function createBookActivity(
    bookId: string, 
    activityType: string,
    activityData: object,
) {
    const { data: user } = await clientSupabase.auth.getUser()

    const { data, error } = await clientSupabase
        .from('book_activity')
        .insert({
            book_id: bookId,
            user_id: user.user?.id,
            activity_type: activityType,
            activity_data: JSON.stringify(activityData)
        })
        .select()

    return {data, error}
}

export async function getBookActivity(bookId: string, limit = 10) {
    const { data, error } = await clientSupabase
        .from('book_activity')
        .select(`
            *, user:user_id(
                id,
                username,
                avatar_url
            )
        `)
        .eq('book_id', bookId)
        .order('created_at', {ascending: false})
        .limit(limit)

    return { data, error }
}