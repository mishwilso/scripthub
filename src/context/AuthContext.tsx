'use client';

import { createContext, useState, useEffect, useContext } from "react";
import { clientSupabase } from "@/lib/supabase/client";
import { Session, User, AuthError, AuthResponse } from "@supabase/supabase-js";
import { getAuthErrorMessage } from "@/lib/authErrors";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  signup: (
    email: string,
    password: string
  ) => Promise<{
    success: boolean;
    data?: AuthResponse["data"];
    error?: string;
  }>;
  login: (
    email: string,
    password: string
  ) => Promise<{
    success: boolean;
    data?: AuthResponse["data"];
    error?: string;
  }>;
  logout: () => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // user, loading, session
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // default as loading
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Init Auth State
    const initializeAuth = async () => {
      try {
        const {
          data: { session },
          error,
        } = await clientSupabase.auth.getSession();

        if (error) {
          throw error;
        }

        setSession(session);
        setUser(session?.user ?? null);
      } catch (error) {
        console.error("Failed to Initialize Auth. Session Error", error);
      } finally {
        setLoading(false); // Set loading to false after initialization
      }
    };

    initializeAuth();

    //Listen for authchange
    const {
      data: { subscription },
    } = clientSupabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    // Cleanup listerner on unmount
    return () => subscription.unsubscribe();
  }, []);

  //sign up
  const signup = async (email: string, password: string) => {
    try {
      const { data, error } = await clientSupabase.auth.signUp({
        email: email.toLowerCase(),
        password,
      });

      if (error) {
        throw error;
      }
      const authData = data as AuthResponse["data"];
      return { success: true, data: authData };
    } catch (error) {
      const authError = error as AuthError;
      console.log("Signup error:", authError);
      return { success: false, error: authError?.message };
    }
  };

  // log in
  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await clientSupabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password,
      });

      if (error) {
        throw error;
      }

      const authData = data as AuthResponse["data"];
      return { success: true, data: authData };
    } catch (error) {
      const authError = error as AuthError;
      console.log("Login error status:", authError.status);
      console.log("Login error code:", authError.code);
      return { success: false, error: getAuthErrorMessage(authError) };
    }
  };

  //log out
  const logout = async () => {
    try {
      const { error } = await clientSupabase.auth.signOut();

      if (error) {
        throw error;
      }

      return { success: true };
    } catch (error) {
      const authError = error as AuthError;
      return { success: false, error: authError?.message };
    }
  };

  const authValue: AuthContextType = {
    user,
    session,
    loading,
    isAuthenticated: !user,
    signup,
    login,
    logout,
  };

  // Return context provider
  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}

