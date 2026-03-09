# File Map

Exhaustive list of every file in the project with a one-line description.

## Root

| File               | Description                                          |
| ------------------ | ---------------------------------------------------- |
| `CLAUDE.md`        | Project instructions and conventions for Claude Code |
| `app.json`         | Expo app configuration                               |
| `bun.lock`         | Bun lockfile                                         |
| `eslint.config.js` | ESLint configuration                                 |
| `package.json`     | Dependencies and scripts                             |
| `tsconfig.json`    | TypeScript configuration                             |
| `.prettierrc`      | Prettier formatting rules                            |
| `.gitignore`       | Git ignore rules                                     |

## `app/` — Screens & Layouts

| File                      | Description                                               |
| ------------------------- | --------------------------------------------------------- |
| `app/_layout.tsx`         | Root layout — Stack navigator wrapped in SupabaseProvider |
| `app/(tabs)/_layout.tsx`  | Tab navigator config (Accueil + Paramètres)               |
| `app/(tabs)/index.tsx`    | Home screen — welcome placeholder                         |
| `app/(tabs)/settings.tsx` | Settings screen — placeholder                             |

## `src/components/`

| File                                   | Description                                                         |
| -------------------------------------- | ------------------------------------------------------------------- |
| `src/components/index.ts`              | Barrel export for components                                        |
| `src/components/supabase-provider.tsx` | SupabaseProvider context — exposes client, user, session, isLoading |

## `src/constants/`

| File                      | Description                                                     |
| ------------------------- | --------------------------------------------------------------- |
| `src/constants/colors.ts` | Color palette (primary, background, text, error, success, etc.) |

## `src/hooks/`

| File                       | Description                                               |
| -------------------------- | --------------------------------------------------------- |
| `src/hooks/index.ts`       | Barrel export for hooks                                   |
| `src/hooks/useSupabase.ts` | Returns the Supabase client from context                  |
| `src/hooks/useUser.ts`     | Returns current user, session, and isLoading from context |

## `src/services/`

| File                       | Description                                               |
| -------------------------- | --------------------------------------------------------- |
| `src/services/index.ts`    | Barrel export for services                                |
| `src/services/supabase.ts` | Supabase client singleton (AsyncStorage auth persistence) |

## `src/types/`

| File                 | Description                                    |
| -------------------- | ---------------------------------------------- |
| `src/types/index.ts` | Barrel export for types                        |
| `src/types/auth.ts`  | AuthState interface (user, session, isLoading) |

## `src/utils/`

| File                 | Description                     |
| -------------------- | ------------------------------- |
| `src/utils/index.ts` | Barrel export for utils (empty) |

## `docs/`

| File                 | Description                      |
| -------------------- | -------------------------------- |
| `docs/file-map.md`   | This file — exhaustive file list |
| `docs/screens.md`    | Route/screen documentation       |
| `docs/services.md`   | Service layer documentation      |
| `docs/components.md` | Component documentation          |
| `docs/hooks.md`      | Hook documentation               |
| `docs/types.md`      | Type/interface documentation     |
