# Components

Documentation for `src/components/`.

## `src/components/supabase-provider.tsx` — SupabaseProvider

- **Exports:** `SupabaseProvider` (component), `SupabaseContext` (React context)
- **Props:** `{ children: ReactNode }`
- **Context value:** `{ supabase: SupabaseClient, user: User | null, session: Session | null, isLoading: boolean }`
- **Behavior:**
  - Fetches initial session on mount via `supabase.auth.getSession()`
  - Subscribes to `onAuthStateChange` to keep user/session in sync
  - Cleans up subscription on unmount
- **Used in:** `app/_layout.tsx` (wraps entire app)
- **Consumed by:** `useSupabase()`, `useUser()` hooks

## `src/components/index.ts` — Barrel Export

- Placeholder (currently just a console.log)
