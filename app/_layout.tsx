/**
 * RootLayout
 * Root navigation layout wrapping the app with SupabaseProvider for auth context.
 */

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { SupabaseProvider } from '../src/components/supabase-provider';

export default function RootLayout() {
  return (
    <SupabaseProvider>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SupabaseProvider>
  );
}
