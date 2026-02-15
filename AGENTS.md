# PROJECT KNOWLEDGE BASE

**Updated:** 2026-02-15
**Stack:** Tauri v2, React 19, TypeScript, Tailwind CSS, Vite

## OVERVIEW
Modern desktop application for learning Regular Expressions, refactored from a legacy C++/Qt codebase.
Core logic involves interactive regex matching using JavaScript's native `RegExp` engine.

## STRUCTURE
```
.
├── src/                  # Frontend Source (React)
│   ├── features/         # Feature Modules (Learn, Practice, Sandbox, CheatSheet)
│   ├── components/       # Shared UI Components
│   ├── hooks/            # Custom React Hooks (useTheme, etc.)
│   ├── services/         # Data & Persistence Services
│   ├── utils/            # Core Logic (Regex Validation, Highlighting)
│   ├── assets/           # Static Assets (JSON Data)
│   └── locales/          # i18n Translation Files
├── src-tauri/            # Backend Source (Rust)
│   ├── src/              # Rust Entry Point & Plugins
│   └── tauri.conf.json   # Tauri Configuration
├── specs/                # Project Specifications & Plans
└── tests/                # Test Configuration
```

## KEY FEATURES
| Feature | Location | Description |
|---------|----------|-------------|
| **Learn** | `src/features/learn` | Interactive lessons with sidebar navigation and prose content. |
| **Practice** | `src/features/practice` | Regex validation exercises with visual feedback. |
| **Sandbox** | `src/features/sandbox` | Free-form regex testing with real-time highlighting. |
| **CheatSheet** | `src/features/cheatsheet` | Categorized reference guide. |

## ARCHITECTURE
- **Frontend**: React Functional Components + Hooks.
- **State Management**: Local State (useState) + Persistence via `tauri-plugin-store`.
- **Styling**: Tailwind CSS with Dark Mode support (`class` strategy).
- **i18n**: `react-i18next` with English/Chinese support.
- **Testing**: Vitest + React Testing Library (TDD approach).

## COMMANDS
```bash
# Development
npm run tauri dev   # Start app in dev mode

# Testing
npm run test        # Run unit/integration tests

# Build
npm run tauri build # Build production bundle
```

## CONVENTIONS
- **Strict Typing**: No `any`. All data structures defined in `src/types`.
- **TDD**: Write tests in `*.test.tsx` before implementation.
- **Components**: Functional components with strict prop types.
- **Localization**: All UI text must use `t('key')`.
