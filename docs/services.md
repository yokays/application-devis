# Services

Documentation for `src/services/`.

## `src/services/supabase.ts` — Supabase Client

- **Exports:** `supabase` (SupabaseClient singleton)
- **Config:** Reads `supabaseUrl` and `supabaseAnonKey` from `expo-constants` (`expoConfig.extra`)
- **Auth persistence:** Uses `@react-native-async-storage/async-storage`
- **Options:** `autoRefreshToken: true`, `persistSession: true`, `detectSessionInUrl: false`
- **Access rule:** Never import directly in screens/components — use `useSupabase()` hook instead
- **Wrapped by:** `SupabaseProvider` (`src/components/supabase-provider.tsx`)

## `src/services/index.ts` — Barrel Export

- Placeholder (currently just a console.log)
