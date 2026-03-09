# Types

Documentation for `src/types/`.

## `src/types/auth.ts` — Auth Types

### `AuthState` (interface)

```ts
interface AuthState {
  user: User | null; // Supabase User object
  session: Session | null; // Supabase Session object
  isLoading: boolean; // True while initial session is being fetched
}
```

- **Used by:** `useUser()` hook (return type), `SupabaseProvider` (context value subset)
- **Depends on:** `User`, `Session` from `@supabase/supabase-js`

## `src/types/index.ts` — Barrel Export

- Re-exports: `AuthState`
