# Quickstart: Project Refactoring (Tauri/React/TS)

**Branch**: `001-refactor-project` | **Date**: 2026-02-15

## Prerequisites

- **Node.js**: v18+ (LTS recommended)
- **Rust**: v1.75+ (Stable)
- **Tauri CLI**: `npm install -g @tauri-apps/cli` (v2)
- **Package Manager**: `npm` or `pnpm` (Project uses `npm`)

## Setup

1.  **Clone & Install Dependencies**
    ```bash
    git clone [repo-url]
    cd RegexLearning
    npm install
    ```

2.  **Initialize Tauri (if fresh)**
    *Already configured in `src-tauri`*

3.  **Run Development Server**
    ```bash
    # Starts Vite dev server + Tauri window
    npm run tauri dev
    ```

## Development Workflow (TDD)

**Strict Adherence to Red-Green-Refactor is required.**

1.  **Write a Failing Test**
    Create `src/features/[feature]/[Component].test.tsx`.
    ```bash
    npm run test:watch
    ```
    *Expect failure.*

2.  **Implement Logic**
    Write code in `src/features/[feature]/[Component].tsx` to pass the test.

3.  **Refactor**
    Clean up code while keeping tests green.

4.  **Verify**
    Ensure linting and types pass.
    ```bash
    npm run lint
    npm run type-check
    ```

## Key Commands

| Command | Description |
| :--- | :--- |
| `npm run tauri dev` | Start app in development mode |
| `npm run tauri build` | Build production binary |
| `npm run test` | Run unit tests (Vitest) |
| `npm run test:ui` | Run tests with UI interface |
| `npm run lint` | Run ESLint |
| `npm run format` | Run Prettier |

## Project Structure

- `src/` - React Frontend
  - `features/` - Modules (Learn, Practice, Sandbox)
  - `locales/` - i18n JSON files
  - `stores/` - State & Persistence logic
- `src-tauri/` - Rust Backend config
