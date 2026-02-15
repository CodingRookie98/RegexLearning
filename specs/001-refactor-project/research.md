# Research Findings: Project Refactoring (Tauri/React/TS/TDD)

**Branch**: `001-refactor-project` | **Date**: 2026-02-15
**Spec**: [Link to Spec](./spec.md) | **Plan**: [Link to Plan](./plan.md)

## 1. Storage Solution (Tauri v2)

**Decision**: `tauri-plugin-store`

**Rationale**:
- **Reliability**: File-based persistence in standard OS app data directories (e.g., `AppData/Roaming`), immune to browser cache clearing.
- **Simplicity**: Simple key-value API (`.get()`, `.set()`, `.save()`) similar to `localStorage` but robust.
- **Cross-Context**: Accessible from both Frontend (JS) and Backend (Rust), allowing future flexibility.
- **Official Support**: Maintained by Tauri team/community for v2.

**Alternatives Considered**:
- **`tauri-plugin-fs`**: Too low-level; requires manual JSON serialization and path handling.
- **Browser `localStorage`**: Unsafe; can be cleared by OS or user, leading to data loss.
- **IndexedDB**: Overkill complexity for simple user progress data.

## 2. Theming Strategy (Dark/Light Mode)

**Decision**: **CSS Variables + React Context + Blocking Head Script**

**Rationale**:
- **Zero FOUC**: A blocking script in `index.html` prevents the "white flash" on reload by setting the correct class before React hydrates.
- **Performance**: CSS Variables allow instant repaints without React re-renders.
- **Tauri Integration**: `window.matchMedia` works natively in Tauri webviews to detect system preference.
- **TDD Friendly**: Logic decoupled into `useTheme` hook, testable without heavy DOM mocking.

**Implementation**:
- `index.html`: Inline script to check `localStorage` or system preference and add `.dark` class to `<html>`.
- `theme.css`: Define `--bg-color`, `--text-color` variables for `:root` and `html.dark`.
- React: `useTheme` hook to toggle class and persist to storage.

## 3. Internationalization (i18n)

**Decision**: `react-i18next`

**Rationale**:
- **Type Safety**: Modern v13+ offers excellent TypeScript support with strict key validation against JSON schemas.
- **JSON Compatibility**: Works natively with standard JSON resource files (matches existing `TopicInfo.json` structure).
- **Runtime Switching**: Instant language switching without page reloads.
- **Maturity**: Industry standard with rich ecosystem.

**Alternatives Considered**:
- **LinguiJS**: Strong compile-time checks but relies on macros and catalogs, deviating from simple JSON resource workflow.
- **Rosetta**: Too lightweight; lacks strict typing and interpolation features needed for this project.

## 4. TDD Setup (Vitest + Tauri)

**Decision**: **Vitest + JSDOM + `@tauri-apps/api/mocks`**

**Rationale**:
- **Official Mocking**: `@tauri-apps/api/mocks` provides a supported way to intercept IPC calls (`invoke`) without brittle manual mocks.
- **Speed**: Vitest is significantly faster than Jest and integrates natively with Vite.
- **Environment**: `jsdom` is required for React Testing Library.

**Strategy**:
- **Setup**: Polyfill `window.crypto` (required for Tauri internals in JSDOM).
- **Test**: Use `mockIPC((cmd, args) => ...)` in tests to simulate Rust backend responses.
- **Cleanup**: `clearMocks()` after each test to ensure isolation.
