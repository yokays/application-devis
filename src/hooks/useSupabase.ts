/**
 * useSupabase
 * Hook to access the Supabase client from anywhere in the app.
 * Must be used within SupabaseProvider.
 */

import { useContext } from 'react';

import { SupabaseContext } from '../components/supabase-provider';

export function useSupabase() {
  const context = useContext(SupabaseContext);

  if (!context) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }

  return context.supabase;
}
