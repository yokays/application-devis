# Hooks

Documentation for `src/hooks/`.

## `src/hooks/useSupabase.ts` — useSupabase

- **Returns:** `SupabaseClient`
- **Params:** None
- **Throws:** Error if used outside `SupabaseProvider`
- **Usage:** Access the Supabase client for API calls in any component/screen
- **Source:** Reads from `SupabaseContext`

## `src/hooks/useUser.ts` — useUser

- **Returns:** `AuthState` (`{ user: User | null, session: Session | null, isLoading: boolean }`)
- **Params:** None
- **Throws:** Error if used outside `SupabaseProvider`
- **Usage:** Access current authenticated user state in any component/screen
- **Source:** Reads from `SupabaseContext`

## `src/hooks/index.ts` — Barrel Export

- Re-exports: `useSupabase`, `useUser`
