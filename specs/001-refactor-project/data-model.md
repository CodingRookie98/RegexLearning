# Data Model: Project Refactoring

**Branch**: `001-refactor-project` | **Date**: 2026-02-15
**Spec**: [Link to Spec](./spec.md)

## 1. Topic (Learning Content)

Represents a single regex lesson or topic. Derived from `TopicInfo.json`.

```typescript
interface Topic {
  /** Unique identifier for the topic (e.g., 1, 2) */
  id: number;
  
  /** Display title of the lesson */
  title: string;
  
  /** Markdown content explaining the regex concept */
  description: string;
  
  /** 
   * Array of text strings used for practice/examples.
   * In legacy JSON this was sometimes a string or array; normalized to string[].
   */
  text: string[];
  
  /** 
   * The expected regex pattern or answer.
   * Used for validating user input in Practice mode.
   */
  answer: string;
  
  /**
   * Optional: The expected match result text for validation.
   * Used in legacy logic to allow flexible regexes that produce same output.
   */
  matchedAnswerText?: string;
}
```

## 2. CheatSheetItem (Reference)

Represents a single entry in the cheat sheet. Derived from `cheatSheet.json`.

```typescript
interface CheatSheetItem {
  /** Display title (e.g., "Any Character") */
  title: string;
  
  /** The regex code/symbol (e.g., ".") */
  code: string;
  
  /** Explanation of what the code does */
  description: string;
  
  /** Category grouping (e.g., "Character Classes", "Anchors") */
  category: string;
}
```

## 3. UserProgress (Persistence)

Tracks the user's learning progress. Stored via `tauri-plugin-store`.

```typescript
interface UserProgress {
  /** 
   * Map of Topic ID to completion status.
   * Key: Topic.id (number)
   * Value: boolean (true = completed)
   */
  completedTopics: Record<number, boolean>;
  
  /**
   * Last visited topic ID to resume learning.
   */
  lastTopicId?: number;
}
```

## 4. AppSettings (Preferences)

User-configurable application settings. Stored via `tauri-plugin-store`.

```typescript
interface AppSettings {
  /** UI Theme preference */
  theme: 'light' | 'dark' | 'system';
  
  /** UI Language preference */
  language: 'en' | 'zh';
  
  /** Font size scaling (optional future proofing) */
  fontSize?: 'small' | 'medium' | 'large';
}
```

## Validation Rules

- **Topic.id**: Must be unique and positive integer.
- **Topic.answer**: Must be a valid Regex string.
- **UserProgress**: Updates must be atomic and persisted immediately to disk.
- **AppSettings**: `theme` defaults to 'system', `language` defaults to detected locale or 'en'.
