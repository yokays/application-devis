/**
 * Supabase Client
 * Singleton Supabase client configured with AsyncStorage for auth persistence.
 * Always access the client via useSupabase() hook — never import this directly in screens.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl ?? 'YOUR_SUPABASE_URL';
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey ?? 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
