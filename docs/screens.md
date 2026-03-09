# Screens

Documentation for every route in `app/`.

## `app/_layout.tsx` — RootLayout

- **Navigator:** `Stack`
- **Wraps app in:** `SupabaseProvider` (auth context)
- **Children:** `(tabs)` group (headerShown: false)
- **Also renders:** `<StatusBar style="auto" />`

## `app/(tabs)/_layout.tsx` — TabLayout

- **Navigator:** `Tabs`
- **Tabs:**
  - `index` → title "Accueil", icon `home` (Ionicons)
  - `settings` → title "Paramètres", icon `settings` (Ionicons)
- **Config:** `tabBarActiveTintColor: '#007AFF'`, `headerShown: true`

## `app/(tabs)/index.tsx` — HomeScreen

- **Route:** `/`
- **Content:** Placeholder — displays "Application Devis" title + "Bienvenue" subtitle
- **Components used:** None (just RN View/Text)

## `app/(tabs)/settings.tsx` — SettingsScreen

- **Route:** `/settings`
- **Content:** Placeholder — displays "Paramètres" title
- **Components used:** None (just RN View/Text)
