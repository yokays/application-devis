/**
 * useUser
 * Hook to access the currently authenticated user and auth loading state.
 * Must be used within SupabaseProvider.
 */

import { useContext } from 'react';

import { SupabaseContext } from '../components/supabase-provider';
import type { AuthState } from '../types/auth';

export function useUser(): AuthState {
  const context = useContext(SupabaseContext);

  if (!context) {
    throw new Error('useUser must be used within a SupabaseProvider');
  }

  return {
    user: context.user,
    session: context.session,
    isLoading: context.isLoading,
  };
}
