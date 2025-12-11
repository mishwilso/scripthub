import { clientSupabase } from "../supabase/client";
import { Tables, TablesInsert, TablesUpdate } from "../supabase/database.types";


export type Notification = Tables<"notifications">;
export type NewNotification = TablesInsert<"notifications">;
type UpdatedNotification = TablesUpdate<"notifications">;

// Create user notification
export async function createNotification(
  userId: string,
  bookId: string,
  notificationType: string,
  title: string,
  message: string,
  relatedUserId?: string
) {
  const { data, error } = await clientSupabase
    .from('notifications')
    .insert({
      user_id: userId,
      book_id: bookId,
      notification_type: notificationType,
      title: title,
      message: message,
      related_user_id: relatedUserId
    })
  
  return { data, error }
}

// Get user notifications
export async function getUserNotifications(limit = 20) {
  const { data: user } = await clientSupabase.auth.getUser()

  if (!user.user?.id) {
    return { data: null, error: new Error('User not authenticated') }
  }
  
  const { data, error } = await clientSupabase
    .from('notifications')
    .select(`
      *,
      book:book_id (
        id,
        title,
        cover_url
      ),
      related_user:users!notifications_related_user_id_fkey (
        name,
        avatar_url
      )
    `)
    .eq('user_id', user.user?.id)
    .order('created_at', { ascending: false })
    .limit(limit)
  
  return { data, error }
}

// Mark notification as read
export async function markNotificationRead(notificationId: string) {
  const { error } = await clientSupabase
    .from('notifications')
    .update({ read: true })
    .eq('id', notificationId)
  
  return { error }
}

// Get unread count
export async function getUnreadCount() {
  const { data: user } = await clientSupabase.auth.getUser()

  if (!user.user?.id) {
    return { data: null, error: new Error('User not authenticated') }
  }
  
  const { count, error } = await clientSupabase
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.user?.id)
    .eq('read', false)
  
  return { count, error }
}