// Activity Type
// -- 'commit', 'branch_created', 'branch_merged', 'chapter_created',
// -- 'chapter_updated', 'collaborator_added', etc.

import { json } from "stream/consumers";
import { clientSupabase } from "../supabase/client";
import { Json, Tables, TablesInsert, TablesUpdate } from "../supabase/database.types";

import { formatRelativeTime } from '@/lib/utils/formatDates'

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

interface BookActivityData {
  activity_type: string
  activity_data: string
  created_at: string
  user: {
    username?: string
    email: string
  }
}

interface ActivityDisplay {
  message: string
  timestamp: string // "2 hours ago", "4 days ago"
}

export function formatBookActivity(activity: BookActivity): ActivityDisplay {
  const { activity_type, activity_data, created_at} = activity

  const parsed_activity = JSON.parse(JSON.stringify(activity_data))

  let message: string;

  if (!activity_data) return {
    message:activity_type.replace(/_/g, ' '),
    timestamp: formatRelativeTime(created_at),
    }

  switch (activity_type) {
    case 'commit':
      message = `Committed "${parsed_activity.commit_message}"`
      break

    case 'branch_created':
      message = `Created branch "${parsed_activity.branch_name}"`
      break

    case 'branch_merged':
      message = `Merged "${parsed_activity.branch_name}" into ${parsed_activity.into_branch}`
      break

    case 'chapter_created':
      message = `Created new chapter "${parsed_activity.chapter_name}"`
      break

    case 'chapter_updated':
      message = `Updated "${parsed_activity.chapter_name}"`
      break

    case 'chapter_deleted':
      message = `Deleted chapter "${parsed_activity.chapter_name}"`
      break

    case 'collaborator_added':
      message = `Added ${parsed_activity.collaborator_email} as ${parsed_activity.role}`
      break

    case 'book_settings_updated':
      message = 'Updated book settings'
      break

    default:
      message = activity_type.replace(/_/g, ' ')
  }

  return {
    message,
    timestamp: formatRelativeTime(created_at),
  }
}


export async function createBookActivity(
  bookId: string,
  activityType: string,
  activityData: object
) {
  const { data: user } = await clientSupabase.auth.getUser();

  const { data, error } = await clientSupabase
    .from("book_activity")
    .insert({
      book_id: bookId,
      user_id: user.user?.id,
      activity_type: activityType,
      activity_data: JSON.stringify(activityData),
    })
    .select();

  return { data, error };
}

export async function getBookActivity(bookId: string, limit = 10) {
    const { data, error } = await clientSupabase
    .from("book_activity")
    .select(
        `
            *, user:users!book_activity_invited_by_fkey(
                id,
                name,
                avatar_url
            )
        `
    )
    .eq("book_id", bookId)
    .order("created_at", { ascending: false })
    .limit(limit);

    if (error) throw error;


    return data as BookActivity[];
}
