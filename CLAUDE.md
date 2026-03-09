# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Validate after every generation:** `bun run post-gen` (runs Prettier → ESLint → TypeScript check)
- **Format:** `bun run format`
- **Lint:** `bun run lint`
- **Type check:** `tsc --noEmit`
- **Install deps:** `bun install`
- **Add package:** `bun add <pkg>` (dev: `bun add -d <pkg>`)
- **Run on device:** `bun expo run:ios --device` (never launch directly — tell user to run it)

## Stack

- Expo SDK 55 + React Native + TypeScript
- Expo Router (file-based routing)
- Supabase (auth + backend)
- ESLint (flat config with eslint-config-expo + eslint-plugin-prettier) + Prettier
- **Always use `bun`**. Never npm or yarn.

## Project Structure

```
app/                              # Expo Router — screens & layouts ONLY
  _layout.tsx                     # Root layout (Stack + SupabaseProvider)
  (tabs)/                         # Tab navigator group
    _layout.tsx                   # Tab layout config (Accueil + Paramètres)
    index.tsx                     # Home tab
    settings.tsx                  # Settings tab
src/
  components/                     # Reusable UI components
    index.ts                      # Barrel export
    supabase-provider.tsx         # Auth context provider
  constants/                      # Colors, sizing, config values
    colors.ts                     # Color palette constants
  hooks/                          # Custom React hooks
    index.ts                      # Barrel export
    useSupabase.ts                # Access Supabase client
    useUser.ts                    # Access current user & auth state
  services/                       # API calls, external services
    index.ts                      # Barrel export
    supabase.ts                   # Supabase client singleton
  types/                          # TypeScript types & interfaces
    index.ts                      # Barrel export
    auth.ts                       # AuthState interface
  utils/                          # Pure utility functions
    index.ts                      # Barrel export
docs/                             # Detailed docs (see docs/*.md)
  file-map.md                     # Exhaustive file list + descriptions
  screens.md                      # Route documentation
  services.md                     # Service layer docs
  components.md                   # Component docs
  hooks.md                        # Hook docs
  types.md                        # Type/interface docs
assets/                           # Images, fonts, icons
```

## Architecture

### Auth Flow

`SupabaseProvider` (in root `_layout.tsx`) → creates React context with `{supabase, user, session, isLoading}` → consumed via `useSupabase()` (client) and `useUser()` (user/session/loading). Supabase client is a singleton in `src/services/supabase.ts` using `AsyncStorage` for session persistence. Config comes from `Constants.expoConfig.extra` (set in `app.json` or `app.config.js`).

### Barrel Exports

Every `src/` subdirectory has an `index.ts` barrel. Import from the barrel, not from individual files.

## Rules

### Linting & Validation

- **Run `bun run post-gen` at the end of every generation.** Fix all errors before finishing.
- Prettier: single quotes, trailing commas, semicolons, 100 char width (see `.prettierrc`).
- **Always respect Prettier rules.** Never override or ignore Prettier output.

### Expo Router — Navigation Best Practices

- **File = route.** Every file in `app/` is a screen. Do NOT put components, utils, or logic in `app/`.
- **Layouts** (`_layout.tsx`): Define navigation structure (Stack, Tabs). One per directory.
- **Groups** (`(groupName)/`): Use parentheses for layout groups that don't add a URL segment.
- **Navigation:**
  - Use `<Link href="/path">` for declarative navigation (preferred).
  - Use `router.push('/path')` for imperative navigation (after an action, form submit, etc.).
  - Use `router.replace('/path')` to navigate without adding to history (e.g. after login).
  - Use `router.back()` to go back.
  - **Never hardcode navigation logic in components** — keep it in screens.
- **Dynamic routes:** `[id].tsx` for single param, `[...slug].tsx` for catch-all.
- **Typed routes:** Use `useLocalSearchParams<{ id: string }>()` for type-safe params.

### Component Guidelines

- All reusable components go in `src/components/`.
- Screen-specific logic stays in the screen file under `app/`.
- Use `StyleSheet.create()` for styles — no inline style objects.
- Colocate styles at the bottom of the file.

### TypeScript

- **Everything must be typed.** Every function, prop, state, param, return value — no exceptions.
- Strict mode. No `any` unless absolutely unavoidable (add a comment explaining why).
- Define shared types in `src/types/`.
- Use type imports: `import type { Foo } from './types'`.

### File Documentation (MANDATORY)

- **Every new file must start with a comment block explaining what it does.** This is non-negotiable.
- Format:
  ```tsx
  /**
   * ComponentName
   * Brief description of what this file does, why it exists, and how it fits in the app.
   */
  ```
- Keep it short (1-3 lines). No fluff. Just what + why.

### Code Organization

- Business logic & API calls go in `src/services/`.
- Constants (colors, spacing, API URLs) go in `src/constants/`.
- Custom hooks go in `src/hooks/`.
- Pure utility functions go in `src/utils/`.
- **Never put non-route files in `app/`.**

### Naming Conventions

- Files: `kebab-case.tsx` for components, `camelCase.ts` for utils/hooks/services.
- Components: `PascalCase` (function name must match what it exports).
- Hooks: `useCamelCase`.
- Types/Interfaces: `PascalCase`, prefix interfaces with `I` only if there's a naming conflict.
- Constants: `UPPER_SNAKE_CASE` for true constants, `camelCase` for config objects.

### Error Handling

- Never silently swallow errors. Always handle or display them.
- Use `try/catch` in services, propagate errors to the UI layer.
- Show user-facing error messages in French (app is in French).

### State Management

- Start with React state (`useState`, `useReducer`). Don't add a state library until local state is clearly insufficient.
- Lift state up before reaching for context. Use context only for truly global state (auth, theme).
- Never store derived data in state — compute it.

### Performance

- Use `useCallback` / `useMemo` only when there's a measurable problem, not preemptively.
- Avoid anonymous functions in `renderItem` of FlatList — extract named components.
- Use `FlatList` (not `ScrollView` + `.map()`) for any list that could exceed ~20 items.

### UI & Design (React Native)

- **No generic AI aesthetics.** No default gray-on-white, no bland color schemes. Every screen must have a clear, intentional visual identity.
- **Typography:** Use custom fonts loaded via `expo-font`. Never rely on system defaults. Pair a distinctive display font with a clean body font.
- **Color & Theme:** Define a cohesive palette in `src/constants/colors.ts` using named constants. Dominant colors with sharp accents — no timid, evenly-distributed palettes.
- **Motion:** Use `react-native-reanimated` for animations. Focus on high-impact moments: screen transitions, staggered list reveals, meaningful micro-interactions. No gratuitous bouncing.
- **Spatial Composition:** Use generous whitespace intentionally. Break out of uniform padding — vary spacing to create visual hierarchy. Asymmetry is fine when deliberate.
- **Shadows & Depth:** Use `elevation` (Android) and `shadowOffset/shadowRadius` (iOS) to create real depth. Layer elements with `zIndex` when it serves the design.
- **Icons:** Use a consistent icon set (e.g. `@expo/vector-icons` or custom SVGs). Never mix icon styles.
- **Dark/Light themes:** Design for both from the start. Use a theme context with `src/constants/colors.ts` exporting both palettes.
- **Touch targets:** Minimum 44x44pt hit areas on all interactive elements. No exceptions.
- **Platform consistency:** Prefer cross-platform components. Use `Platform.select()` only for genuinely platform-specific behavior, not for lazy styling differences.

### Git — Atomic Commits (Conventional Commits)

- **One logical change per commit.** If you can split it further, do it.
- **Conventional Commits format:** `type(scope): description`
  - `feat`, `fix`, `refactor`, `docs`, `test`, `perf`, `chore`, `ci`, `build`, `style`
  - Scope is optional but recommended.
- **Max 60 characters** for the full commit message.
- Present tense, imperative mood: "add quote form", not "added quote form".
- Remove filler words ("the", "a", "for").
- **Never add Co-Authored-By or mention AI in commits.**
- **Workflow:** `git status` → group changes into smallest logical units → for each: `git add <files>` → `git diff --staged` → `git commit` → repeat → `git log --oneline -10` to verify.
- Examples:
  - `feat(quotes): add line item component` ✓
  - `fix(nav): handle back from nested stack` ✓
  - `refactor(ui): extract shared card styles` ✓
  - `chore(deps): bump expo to sdk 55` ✓

### Supabase Access

- **Never import `supabase` directly from `src/services/supabase.ts` in screens or components.**
- Always use `useSupabase()` hook to get the Supabase client.
- Always use `useUser()` hook to get the current authenticated user, session, and loading state.
- Both hooks require `SupabaseProvider` in the component tree (already in root layout).
- **Always use the Supabase MCP tools** for database operations (migrations, schema changes, queries, debugging). Never write raw SQL manually when MCP tools can do it.

### Documentation Maintenance (MANDATORY)

- **After any structural change** (new/rename/delete/move file):
  - Update the `Project Structure` tree above (exhaustive — list every file).
  - Update the relevant `docs/*.md` file(s).
- **After adding** a new service, hook, component, screen, or type: add its entry to the matching `docs/<category>.md`.
- **After removing** a file: remove its entry from the tree + `docs/*.md`.
- Detailed docs live in `docs/`. CLAUDE.md stays as the index.
- All documentation in English.

### Running the App

- **Never launch the app directly.** Always tell the user to run the command themselves.
- **Always prefer dev builds** over Expo Go: `bun expo run:ios --device` (user selects their plugged-in device).
- No Expo Go unless explicitly requested.

### Language

- All UI text must be in French.
- All code (variables, functions, comments, commits) must be in English.
