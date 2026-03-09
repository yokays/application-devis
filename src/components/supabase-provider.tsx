/**
 * SupabaseProvider
 * Context provider that exposes the Supabase client, current user, and session.
 * Listens to auth state changes and keeps the context in sync.
 */

import type { Session, SupabaseClient, User } from '@supabase/supabase-js';
import React, { createContext, useEffect, useState, type ReactNode } from 'react';

import { supabase } from '../services/supabase';

interface SupabaseContextValue {
  supabase: SupabaseClient;
  user: User | null;
  session: Session | null;
  isLoading: boolean;
}

export const SupabaseContext = createContext<SupabaseContextValue | undefined>(undefined);

interface SupabaseProviderProps {
  children: ReactNode;
}

export function SupabaseProvider({ children }: SupabaseProviderProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <SupabaseContext.Provider value={{ supabase, user, session, isLoading }}>
      {children}
    </SupabaseContext.Provider>
  );
}
