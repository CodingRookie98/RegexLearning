---
description: "Task list for Refactoring RegexLearning to Tauri/React/TS"
---

# Tasks: Project Refactoring (Tauri/React/TS/TDD)

**Input**: Design documents from `/specs/001-refactor-project/`
**Prerequisites**: plan.md, spec.md, data-model.md, research.md
**Tests**: MANDATORY (Vitest + RTL). Constitution requires strict TDD (Red-Green-Refactor).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: [US1] Learn, [US2] Practice, [US3] Sandbox, [US4] CheatSheet

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization, toolchain setup, and foundational architecture.

- [ ] T001 Initialize Tauri v2 + React + TypeScript project structure in `src/` and `src-tauri/`
- [ ] T002 [P] Configure Vitest + JSDOM + `@tauri-apps/api/mocks` (setup `tests/setup.ts`, `vitest.config.ts`)
- [ ] T003 [P] Configure Tailwind CSS/CSS Variables + "Zero FOUC" script in `index.html` (Theme Strategy)
- [ ] T004 [P] Configure `react-i18next` with type-safe JSON resources in `src/locales/` & `src/i18n.ts`
- [ ] T005 [P] Setup `tauri-plugin-store` in Rust backend (`src-tauri/src/lib.rs`) and frontend service (`src/services/store.ts`)
- [ ] T006 Implement `useTheme` hook with TDD in `src/hooks/useTheme.ts` (Theme persistence logic)
- [ ] T007 Implement `App.tsx` layout shell with Navigation and Theme/Language switchers

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core data loading and type definitions required by all stories.

- [ ] T008 Define TypeScript interfaces in `src/types/index.ts` (`Topic`, `CheatSheetItem`, `UserProgress`)
- [ ] T009 [P] Create `TopicInfo.json` and `cheatSheet.json` in `src/assets/data/` (Ported from legacy)
- [ ] T010 Implement `DataService` with TDD to load JSON assets in `src/services/dataService.ts`
- [ ] T011 Implement `StoreService` wrapper with TDD for user progress persistence in `src/services/storeService.ts`

**Checkpoint**: Foundation ready - Type definitions, Data loading, Storage, and Layout are in place.

---

## Phase 3: User Story 1 - Regex Learning Content Browser (Priority: P1)

**Goal**: Users can browse and read regex lessons.
**Independent Test**: Verify topic list renders from JSON and clicking a topic shows details.

### Tests for User Story 1 (MANDATORY) ⚠️
- [ ] T012 [P] [US1] Create unit tests for `useTopics` hook (loading data) in `src/features/learn/hooks/useTopics.test.ts`
- [ ] T013 [P] [US1] Create component tests for `TopicList` (rendering, selection) in `src/features/learn/components/TopicList.test.tsx`
- [ ] T014 [P] [US1] Create component tests for `TopicDetail` (content display) in `src/features/learn/components/TopicDetail.test.tsx`

### Implementation for User Story 1
- [ ] T015 [US1] Implement `useTopics` hook in `src/features/learn/hooks/useTopics.ts`
- [ ] T016 [P] [US1] Implement `TopicList` component in `src/features/learn/components/TopicList.tsx`
- [ ] T017 [P] [US1] Implement `TopicDetail` component in `src/features/learn/components/TopicDetail.tsx`
- [ ] T018 [US1] Integrate Learn module into `src/features/learn/LearnPage.tsx` and Route config

---

## Phase 4: User Story 2 - Regex Practice Mode (Priority: P1)

**Goal**: Users can input regexes and get validation feedback.
**Independent Test**: Verify input validation against expected answers updates UI state (Success/Fail).

### Tests for User Story 2 (MANDATORY) ⚠️
- [ ] T019 [P] [US2] Create unit tests for `regexValidator` utility in `src/utils/regexValidator.test.ts`
- [ ] T020 [P] [US2] Create integration tests for `PracticePage` (input -> validation -> progress update) in `src/features/practice/PracticePage.test.tsx`

### Implementation for User Story 2
- [ ] T021 [P] [US2] Implement `regexValidator` logic in `src/utils/regexValidator.ts` (JS `RegExp` based)
- [ ] T022 [US2] Implement `usePractice` hook (validation state, progress persistence) in `src/features/practice/hooks/usePractice.ts`
- [ ] T023 [P] [US2] Implement `PracticeInput` component with status indicators in `src/features/practice/components/PracticeInput.tsx`
- [ ] T024 [US2] Integrate Practice module into `src/features/practice/PracticePage.tsx`

---

## Phase 5: User Story 3 - Regex Sandbox / Playground (Priority: P2)

**Goal**: Free-form regex experimentation with real-time highlighting.
**Independent Test**: Verify arbitrary text input highlights correctly matches regex pattern.

### Tests for User Story 3 (MANDATORY) ⚠️
- [ ] T025 [P] [US3] Create logic tests for `highlightMatches` utility in `src/utils/highlightMatches.test.ts`
- [ ] T026 [P] [US3] Create component tests for `SandboxEditor` in `src/features/sandbox/components/SandboxEditor.test.tsx`

### Implementation for User Story 3
- [ ] T027 [P] [US3] Implement `highlightMatches` utility (returns marked text/nodes) in `src/utils/highlightMatches.ts`
- [ ] T028 [US3] Implement `SandboxEditor` component (Regex Input + Text Area + Highlighter) in `src/features/sandbox/components/SandboxEditor.tsx`
- [ ] T029 [US3] Integrate Sandbox module into `src/features/sandbox/SandboxPage.tsx`

---

## Phase 6: User Story 4 - Cheat Sheet Reference (Priority: P3)

**Goal**: Quick reference for regex syntax.
**Independent Test**: Verify static list renders correctly grouped by category.

### Tests for User Story 4 (MANDATORY) ⚠️
- [ ] T030 [P] [US4] Create snapshot test for `CheatSheetPage` in `src/features/cheatsheet/CheatSheetPage.test.tsx`

### Implementation for User Story 4
- [ ] T031 [P] [US4] Implement `CheatSheetItem` component in `src/features/cheatsheet/components/CheatSheetItem.tsx`
- [ ] T032 [US4] Implement `CheatSheetPage` (grouping logic + rendering) in `src/features/cheatsheet/CheatSheetPage.tsx`

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Performance, final integration, and cleanup.

- [ ] T033 [P] Add error boundaries for each feature module
- [ ] T034 Verify strict type safety (run `tsc --noEmit`)
- [ ] T035 [P] Ensure all text is using `t()` from `react-i18next` (Extraction check)
- [ ] T036 Run full test suite (`npm run test`) and verify 100% UI logic coverage
- [ ] T037 Manual verification of persistence (restart app -> check progress/theme)
- [ ] T038 Verify zero distinct logical regressions compared to C++ version (Manual Walkthrough)

---

## Dependencies & Execution Order

### Phase Dependencies
- **Setup (Phase 1)**: Independent.
- **Foundational (Phase 2)**: Depends on Setup. BLOCKS all user stories.
- **User Stories (Phase 3-6)**: Parallelizable after Phase 2.
  - Learn (US1) & CheatSheet (US4) are read-only, can be done first.
  - Practice (US2) depends on `StoreService` (Phase 2).
  - Sandbox (US3) is isolated.

### Parallel Opportunities
- **Tests vs Implementation**: TDD workflow allows writing tests (Red) before Code (Green).
- **Features**: Different developers can work on US1, US2, US3, US4 simultaneously after Phase 2.
- **Components**: `TopicList` and `TopicDetail` can be built in parallel.

## Implementation Strategy

### MVP First (US1 + US2)
1. Complete Setup & Foundation.
2. Build US1 (Learn) to verify Data Loading.
3. Build US2 (Practice) to verify Interactive Logic & Persistence.
4. Ship MVP.

### Incremental Delivery
1. Add US3 (Sandbox) as an enhancement.
2. Add US4 (CheatSheet) as a utility.
