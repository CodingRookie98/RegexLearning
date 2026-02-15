export interface Topic {
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

export interface CheatSheetItem {
  /** Display title (e.g., "Any Character") */
  title: string;
  
  /** The regex code/symbol (e.g., ".") */
  code: string;
  
  /** Explanation of what the code does */
  description: string;
  
  /** Category grouping (e.g., "Character Classes", "Anchors") */
  category: string;
}

export interface UserProgress {
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