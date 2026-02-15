# Implementation Plan: Project Refactoring (Tauri/React/TS/TDD)

**Branch**: `001-refactor-project` | **Date**: 2026-02-15 | **Spec**: [Link to Spec](./spec.md)
**Input**: Feature specification from `/specs/001-refactor-project/spec.md`

## Summary

Refactor the existing C++/Qt RegexLearning application to a modern stack using Tauri, React, and TypeScript, strictly adhering to Test-Driven Development (TDD). The goal is to achieve feature parity (Learn, Practice, Sandbox, CheatSheet) while establishing a scalable, type-safe codebase with 100% unit test coverage for UI logic.

## Technical Context

**Language/Version**: TypeScript 5.x
**Primary Dependencies**: Tauri v2, React 18+, Vite
**Storage**: Tauri `fs` plugin or `store` plugin for local persistence (NEEDS CLARIFICATION: Best practice for simple key-value storage in Tauri v2?)
**Testing**: Vitest (Unit), React Testing Library (Component) - MANDATORY per Constitution
**Target Platform**: Windows (Primary), Cross-platform support inherent
**Project Type**: Desktop Application (Tauri)
**Performance Goals**: Startup < 2s, Instant regex feedback
**Constraints**: Strict TDD, Type Safety (No `any`), Zero logic regressions

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **I. Test-Driven Development (TDD)**: Plan explicitly mandates Vitest/RTL setup and "Red-Green-Refactor" workflow.
- [x] **II. Modern Stack**: Plan uses TypeScript, React, and Tauri as required.
- [x] **III. Component-Based Architecture**: React enforces this; will use functional components + hooks.
- [x] **IV. Type Safety First**: TypeScript strict mode will be enabled.
- [x] **V. Simplicity & YAGNI**: Focus is on feature parity, no extra bells and whistles initially.

**Status**: PASSED. Proceeding to Phase 0.

## Project Structure

### Documentation (this feature)

```text
specs/001-refactor-project/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
src-tauri/             # Rust backend (minimal)
src/                   # Frontend source
├── components/        # Reusable UI components
├── features/          # Feature-based modules (Learn, Practice, Sandbox, CheatSheet)
│   ├── learn/
│   ├── practice/
│   ├── sandbox/
│   └── cheatsheet/
├── hooks/             # Custom React hooks
├── services/          # Data access/Logic services
├── types/             # TypeScript definitions
├── utils/             # Helper functions
├── App.tsx            # Root component
└── main.tsx           # Entry point

tests/                 # Vitest config & global tests
```

**Structure Decision**: A standard React + Tauri structure with feature-based folder organization to separate the distinct modules of the application.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | | |

