import { clientSupabase } from "../supabase/client";
import { Tables, TablesInsert, TablesUpdate } from "../supabase/database.types";

export type BookCollaborator = Tables<"book_collaborators">;
export type NewCollaborators = TablesInsert<"book_collaborators">;
type UpdatedCollaborators = TablesUpdate<"book_collaborators">;

export type CollaboratorRole = "owner" | "editor" | "viewer";

export interface Collaborator {
  book_id: string;
  id: string;
  user_id: string;
  role: CollaboratorRole;
  invited_by: string;
  created_at: string | null;
  user: {
    id: string;
    email: string;
    name?: string | null;
    avatar_url?: string | null;
  };
}

// Get all collaborators for a book
export async function getBookCollaborators(bookId: string) {
  const { data, error } = await clientSupabase
    .from("book_collaborators")
    .select(
      `
      *,
      user:users!book_collaborators_user_id_fkey (
        id,
        email,
        name,
        avatar_url
      )
    `
    )
    .eq("book_id", bookId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data as Collaborator[];
}

export async function addOwner(
  bookId: string
) {
  // Get current user
  const { data: currentUser } = await clientSupabase.auth.getUser();

  if (!currentUser.user?.id) {
    throw new Error("User not authenticated");
  }

  // Add collaborator
  const { data, error } = await clientSupabase
    .from("book_collaborators")
    .insert({
      book_id: bookId,
      user_id: currentUser.user.id,
      role: "owner",
      invited_by: currentUser.user.id,
    })
    .select(
      `
      *,
      user:users!book_collaborators_user_id_fkey (
        id,
        email,
        name,
        avatar_url
      )
    `
    )
    .single();

  if (error) throw error;

  return data as Collaborator;
}

// Add a collaborator
export async function addCollaborator(
  bookId: string,
  userEmail: string,
  role: CollaboratorRole
) {
  // First, find the user by email
  const { data: userData, error: userError } = await clientSupabase
    .from("users") // assuming you have a profiles table
    .select("id, email, name")
    .eq("email", userEmail)
    .single();

  if (userError) throw new Error("User not found");

  // Get current user
  const { data: currentUser } = await clientSupabase.auth.getUser();

  if (!currentUser.user?.id) {
    throw new Error("User not authenticated");
  }

  // Add collaborator
  const { data, error } = await clientSupabase
    .from("book_collaborators")
    .insert({
      book_id: bookId,
      user_id: userData.id,
      role: role,
      invited_by: currentUser.user.id,
    })
    .select(
      `
      *,
      user:users!book_collaborators_user_id_fkey (
        id,
        email,
        name,
        avatar_url
      )
    `
    )
    .single();

  if (error) throw error;

  // Create notification for the invited user
  await clientSupabase.from("notifications").insert({
    user_id: userData.id,
    book_id: bookId,
    notification_type: "collaborator_added",
    title: "You were added as a collaborator",
    message: `${currentUser.user?.email} invited you to collaborate on a book`,
    related_user_id: currentUser.user?.id,
  });

  // Create book activity
  await clientSupabase.from("book_activity").insert({
    book_id: bookId,
    user_id: currentUser.user?.id,
    activity_type: "collaborator_added",
    activity_data: {
      collaborator_email: userData.email,
      role: role,
    },
  });

  return data as Collaborator;
}

// Remove a collaborator
export async function removeCollaborator(collaboratorId: string) {
  const { error } = await clientSupabase
    .from("book_collaborators")
    .delete()
    .eq("id", collaboratorId);

  if (error) throw error;
}

// Update collaborator role
export async function updateCollaboratorRole(
  collaboratorId: string,
  newRole: CollaboratorRole
) {
  const { data, error } = await clientSupabase
    .from("book_collaborators")
    .update({ role: newRole })
    .eq("id", collaboratorId)
    .select(
      `
      *,
      user:users!book_collaborators_user_id_fkey (
        id,
        email,
        name,
        avatar_url
      )
    `
    )
    .single();

  if (error) throw error;
  return data as Collaborator;
}

// Check if current user has specific permission on a book
export async function checkBookPermission(
  bookId: string,
  requiredRole: CollaboratorRole[]
) {
  const { data: user } = await clientSupabase.auth.getUser();

  // Check if owner
  const { data: book } = await clientSupabase
    .from("books")
    .select("owner_id")
    .eq("id", bookId)
    .single();

  if (book?.owner_id === user.user?.id) {
    return true; // Owners have all permissions
  }

  if (!user.user?.id) {
    return { data: null, error: new Error("User not authenticated") };
  }

  // Check collaborator role
  const { data: collaborator } = await clientSupabase
    .from("book_collaborators")
    .select("role")
    .eq("book_id", bookId)
    .eq("user_id", user.user?.id)
    .single();

  return collaborator
    ? requiredRole.includes(collaborator.role as CollaboratorRole)
    : false;
}
