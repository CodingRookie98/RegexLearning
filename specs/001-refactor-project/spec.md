# Feature Specification: Project Refactoring (Tauri/React/TS/TDD)

**Feature Branch**: `001-refactor-project`  
**Created**: 2026-02-15  
**Status**: Draft  
**Input**: User description: "根据当前代码逻辑重构当前项目" (Context: Use typescript + react + tauri, TDD mandatory)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Regex Learning Content Browser (Priority: P1)

Users can browse and learn regex topics through an interactive list, similar to the existing C++ implementation's "Learn" tab.

**Why this priority**: Core value proposition. The "Learn" module allows users to access the educational content which is the primary purpose of the application.

**Independent Test**: Can be tested by loading the application and verifying that the list of topics matches the source JSON data and that selecting a topic displays its details.

**Acceptance Scenarios**:

1. **Given** the application is launched, **When** the "Learn" tab is active, **Then** a list of regex topics (from `TopicInfo.json`) is displayed.
2. **Given** the topic list is visible, **When** a user clicks a topic, **Then** the detail view updates to show the topic's title and description.
3. **Given** the topic list is visible, **When** the application loads, **Then** the first topic is selected by default.
4. **Given** a data loading error (e.g., malformed JSON), **When** the application launches, **Then** an error message is displayed instead of a crash.

---

### User Story 2 - Regex Practice Mode (Priority: P1)

Users can practice regex patterns by inputting regexes to match specific text challenges, with real-time or submission-based validation.

**Why this priority**: Essential interactive component. Passive reading isn't enough; users need to practice to learn.

**Independent Test**: Can be tested by entering valid and invalid regexes into the input field and verifying the success/failure feedback against the predefined answers.

**Acceptance Scenarios**:

1. **Given** a practice topic is selected, **When** the user enters a correct regex, **Then** a visual indicator (e.g., green checkmark or text) confirms the match.
2. **Given** a practice topic is selected, **When** the user enters an incorrect regex, **Then** a visual indicator (e.g., red cross or error message) indicates failure.
3. **Given** a practice topic is selected, **When** the user completes it successfully, **Then** the topic is marked as "completed" in the list.
4. **Given** the input field is active, **When** the user enters an invalid regex syntax (e.g., `[`), **Then** a syntax error message is shown, and the app does not crash.

---

### User Story 3 - Regex Sandbox / Playground (Priority: P2)

Users can experiment with free-form regexes against custom text input to see matches in real-time.

**Why this priority**: Provides a safe space for experimentation beyond the structured lessons. Matches the "Regex Test" window in the legacy app.

**Independent Test**: Can be tested by entering arbitrary text and regex patterns and verifying that the highlighting/matching logic is correct.

**Acceptance Scenarios**:

1. **Given** the Sandbox view, **When** the user types a test string and a regex, **Then** the matching parts of the string are highlighted.
2. **Given** the Sandbox view, **When** the regex is invalid (syntax error), **Then** an error message is displayed.
3. **Given** the Sandbox view, **When** the regex matches nothing, **Then** the text remains unhighlighted (no errors).

---

### User Story 4 - Cheat Sheet Reference (Priority: P3)

Users can quickly reference common regex patterns and syntax.

**Why this priority**: Useful utility but secondary to the core learning loop. Matches the "CheatSheet" window.

**Independent Test**: Can be tested by navigating to the Cheat Sheet section and verifying that the reference data is displayed.

**Acceptance Scenarios**:

1. **Given** the application navigation, **When** "Cheat Sheet" is clicked, **Then** a categorized list of regex syntax (from `cheatSheet.json`) is displayed.
2. **Given** the data fails to load, **When** the Cheat Sheet is accessed, **Then** a "Failed to load content" message is displayed.

---

### Edge Cases

- **What happens when** the JSON data files are missing or malformed? -> Application should display a friendly error message or fallback state, not crash.
- **How does system handle** invalid regex input during typing? -> It should handle exceptions gracefully and indicate "Invalid Regex" to the user without breaking the UI.
- **What happens when** the window is resized? -> The layout should be responsive (React/CSS) and maintain usability.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST load learning content from a structured data source (simulating the existing `TopicInfo.json`).
- **FR-002**: System MUST use Tauri as the backend host to manage the application window and system interactions.
- **FR-003**: System MUST use React for rendering the User Interface.
- **FR-004**: System MUST strictly type all data structures using TypeScript (e.g., `Topic`, `MatchResult`).
- **FR-005**: System MUST implement regex matching logic in the frontend (using JavaScript's native `RegExp` or a library) OR via Rust backend. *Decision: Use JS native RegExp for simplicity and immediate feedback (visible result <50ms).*
- **FR-006**: System MUST persist user progress (e.g., "Topic X Completed") locally immediately upon completion of a topic.

### Key Entities

- **Topic**: Represents a learning unit. Attributes: `id`, `title`, `description`, `content`, `expectedMatch`.
- **CheatSheetItem**: Represents a reference item. Attributes: `title`, `code`, `description`.
- **UserProgress**: Tracks completion. Attributes: `topicId`, `isCompleted`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All 4 legacy modules (Learn, Practice, Sandbox, CheatSheet) are implemented.
- **SC-002**: 100% of the UI Logic is covered by unit tests (Vitest/Jest) per TDD mandate.
- **SC-003**: Application startup time is under 2 seconds.
- **SC-004**: Zero distinct logical regressions compared to the C++ version (verified by manual parity check).
