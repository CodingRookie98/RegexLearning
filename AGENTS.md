# PROJECT KNOWLEDGE BASE

**Updated:** 2026-02-16
**Stack:** Tauri v2, React 19, TypeScript, Tailwind CSS v4, Vite, shadcn/ui, Radix UI

## OVERVIEW
Modern desktop application for learning Regular Expressions.
Core logic involves interactive regex matching using JavaScript's native `RegExp` engine.
UI is built with a strictly typed, component-based architecture using `shadcn/ui`.

## STRUCTURE
```
.
├── src/                  # Frontend Source (React)
│   ├── features/         # Feature Modules (Learn, Practice, Sandbox, CheatSheet)
│   ├── components/       # Shared UI Components
│   │   ├── ui/           # shadcn/ui primitives (Button, Input, etc.)
│   │   └── layout/       # App-wide layouts (AppLayout)
│   ├── hooks/            # Custom React Hooks
│   ├── lib/              # Utilities (cn, etc.)
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
| **Learn** | `src/features/learn` | Interactive lessons with sidebar navigation. |
| **Practice** | `src/features/practice` | Regex validation exercises with visual feedback. |
| **Sandbox** | `src/features/sandbox` | Free-form regex testing with real-time highlighting. |
| **CheatSheet** | `src/features/cheatsheet` | Categorized reference guide using Cards. |

## ARCHITECTURE
- **Frontend**: React Functional Components + Hooks.
- **Design System**: `shadcn/ui` (Radix UI + Tailwind v4) with Light/Dark/System theme support.
- **State Management**: Local State (useState) + Persistence via `tauri-plugin-store`.
- **Styling**: Tailwind CSS v4 with CSS variables for theming.
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
- **Language**: Conversations and documentation should be primarily in Chinese.
- **Strict Typing**: No `any`. All data structures defined in `src/types`.
- **TDD**: Write tests in `*.test.tsx` before implementation.
- **Components**: Functional components with strict prop types.
- **Localization**: All UI text must use `t('key')`.
