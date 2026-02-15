<!--
SYNC IMPACT REPORT
Version: 0.0.0 -> 1.0.0
- Modified Principles:
  - [PRINCIPLE_1] -> I. Test-Driven Development (TDD)
  - [PRINCIPLE_2] -> II. Modern Stack (TypeScript + React + Tauri)
  - [PRINCIPLE_3] -> III. Component-Based Architecture
  - [PRINCIPLE_4] -> IV. Type Safety First
  - [PRINCIPLE_5] -> V. Simplicity & YAGNI
- Added Sections: Technology Standards, Development Workflow
- Removed Sections: N/A
- Templates requiring updates:
  - ⚠ .specify/templates/tasks-template.md (Tests currently marked optional; TDD requires them mandatory)
-->
# RegexLearning Constitution

## Core Principles

### I. Test-Driven Development (TDD)
**Tests MUST be written before implementation code.**
The "Red-Green-Refactor" cycle is non-negotiable for all logic and feature work.
1. **Red**: Write a failing test that defines the desired behavior.
2. **Green**: Write the minimum code necessary to pass the test.
3. **Refactor**: Improve the code structure while keeping tests green.
*Rationale: TDD ensures correctness from the start, prevents regressions, and documents intent.*

### II. Modern Stack (TypeScript + React + Tauri)
**All new development MUST use the defined stack.**
- **Language**: TypeScript (Strict Mode required).
- **Frontend**: React (Functional Components + Hooks).
- **Desktop Host**: Tauri (Rust-based lightweight wrapper).
*Rationale: Provides a performant, type-safe, and cross-platform foundation with a rich ecosystem.*

### III. Component-Based Architecture
**UI MUST be composed of small, reusable, and testable components.**
Logic should be separated from presentation (Container/Presentational pattern or Custom Hooks).
*Rationale: Enhances maintainability, reuse, and testability of the interface.*

### IV. Type Safety First
**Strict type checking is mandatory.**
The use of `any` is forbidden unless strictly necessary for boundary layers and must be explicitly documented with a `// TODO: fix type` or justification.
*Rationale: Catches errors at compile time and serves as self-documentation.*

### V. Simplicity & YAGNI
**You Aint Gonna Need It.**
Implement only the functionality required by the current user story. Avoid speculative generality.
*Rationale: Reduces complexity and technical debt.*

## Technology Standards

**Language**: TypeScript 5.x+
**Framework**: React 18.x+
**Build Tool**: Vite (via Tauri)
**State Management**: React Context or lightweight alternatives (Zustand/Jotai) if needed.
**Testing**: Vitest (Unit/Integration), React Testing Library (Component).
**Styling**: CSS Modules or Tailwind CSS (Decision deferred to implementation plan, but must be consistent).

## Development Workflow

1.  **Spec**: Define the user story and acceptance criteria.
2.  **Plan**: Identify the components and logic needed.
3.  **Test**: Write the failing test case.
4.  **Code**: Implement the feature.
5.  **Review**: Verify TDD adherence and code quality.

## Governance

This Constitution supersedes all other documentation.
Amendments require a documented proposal and team consensus.
Code Reviews **MUST** reject PRs that do not include tests or violate the TDD cycle (e.g., massive commits with tests added after the fact).

**Version**: 1.0.0 | **Ratified**: 2026-02-15 | **Last Amended**: 2026-02-15
