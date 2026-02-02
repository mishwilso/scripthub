export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      book_activity: {
        Row: {
          activity_data: Json | null
          activity_type: string
          book_id: string | null
          created_at: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          activity_data?: Json | null
          activity_type: string
          book_id?: string | null
          created_at?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          activity_data?: Json | null
          activity_type?: string
          book_id?: string | null
          created_at?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "book_activity_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_activity_invited_by_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      book_branches: {
        Row: {
          book_id: string
          branch_name: string
          created_at: string | null
          created_from_branch_id: string | null
          description: string | null
          id: string
          is_main: boolean | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          book_id: string
          branch_name: string
          created_at?: string | null
          created_from_branch_id?: string | null
          description?: string | null
          id?: string
          is_main?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          book_id?: string
          branch_name?: string
          created_at?: string | null
          created_from_branch_id?: string | null
          description?: string | null
          id?: string
          is_main?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "book_branches_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_branches_created_from_branch_id_fkey"
            columns: ["created_from_branch_id"]
            isOneToOne: false
            referencedRelation: "book_branches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_branches_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      book_collaborators: {
        Row: {
          book_id: string
          created_at: string | null
          id: string
          invited_by: string
          role: string
          user_id: string
        }
        Insert: {
          book_id: string
          created_at?: string | null
          id?: string
          invited_by: string
          role: string
          user_id: string
        }
        Update: {
          book_id?: string
          created_at?: string | null
          id?: string
          invited_by?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "book_collaborators_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_collaborators_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_collaborators_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      books: {
        Row: {
          book_color: string | null
          cover_url: string | null
          created_at: string
          custom_genres: string[] | null
          description: string | null
          genres: string[] | null
          id: string
          is_public: boolean
          owner_id: string
          status: string
          title: string
          updated_at: string
          word_count: number
        }
        Insert: {
          book_color?: string | null
          cover_url?: string | null
          created_at?: string
          custom_genres?: string[] | null
          description?: string | null
          genres?: string[] | null
          id?: string
          is_public?: boolean
          owner_id: string
          status?: string
          title: string
          updated_at?: string
          word_count?: number
        }
        Update: {
          book_color?: string | null
          cover_url?: string | null
          created_at?: string
          custom_genres?: string[] | null
          description?: string | null
          genres?: string[] | null
          id?: string
          is_public?: boolean
          owner_id?: string
          status?: string
          title?: string
          updated_at?: string
          word_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "books_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      chapters: {
        Row: {
          book_id: string
          branch_id: string
          branched_from_id: string | null
          content: string
          created_at: string
          draft_count: number
          draft_name: string | null
          id: string
          is_main: boolean | null
          main_chapter_id: string | null
          notes: string | null
          order_index: number
          title: string
          updated_at: string
          user_id: string | null
          word_count: number
        }
        Insert: {
          book_id: string
          branch_id: string
          branched_from_id?: string | null
          content?: string
          created_at?: string
          draft_count?: number
          draft_name?: string | null
          id?: string
          is_main?: boolean | null
          main_chapter_id?: string | null
          notes?: string | null
          order_index: number
          title: string
          updated_at?: string
          user_id?: string | null
          word_count?: number
        }
        Update: {
          book_id?: string
          branch_id?: string
          branched_from_id?: string | null
          content?: string
          created_at?: string
          draft_count?: number
          draft_name?: string | null
          id?: string
          is_main?: boolean | null
          main_chapter_id?: string | null
          notes?: string | null
          order_index?: number
          title?: string
          updated_at?: string
          user_id?: string | null
          word_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "chapters_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chapters_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "book_branches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chapters_branched_from_id_fkey"
            columns: ["branched_from_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chapters_main_chapter_id_fkey"
            columns: ["main_chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chapters_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          book_id: string | null
          created_at: string | null
          id: string
          message: string
          notification_data: Json | null
          notification_type: string
          read: boolean | null
          related_user_id: string | null
          title: string
          user_id: string | null
        }
        Insert: {
          book_id?: string | null
          created_at?: string | null
          id?: string
          message: string
          notification_data?: Json | null
          notification_type: string
          read?: boolean | null
          related_user_id?: string | null
          title: string
          user_id?: string | null
        }
        Update: {
          book_id?: string | null
          created_at?: string | null
          id?: string
          message?: string
          notification_data?: Json | null
          notification_type?: string
          read?: boolean | null
          related_user_id?: string | null
          title?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_related_user_id_fkey"
            columns: ["related_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          email: string
          id: string
          name: string | null
          role: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email: string
          id: string
          name?: string | null
          role?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string | null
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      versions: {
        Row: {
          chapter_id: string
          commit_message: string | null
          content: string
          created_at: string
          created_by: string
          id: string
          version_number: number
          word_count: number
        }
        Insert: {
          chapter_id: string
          commit_message?: string | null
          content: string
          created_at?: string
          created_by: string
          id?: string
          version_number: number
          word_count?: number
        }
        Update: {
          chapter_id?: string
          commit_message?: string | null
          content?: string
          created_at?: string
          created_by?: string
          id?: string
          version_number?: number
          word_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "versions_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
