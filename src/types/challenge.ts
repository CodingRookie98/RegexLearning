export type Difficulty = 'Basic' | 'Intermediate' | 'Advanced';

export interface TestCase {
  input: string;
  shouldMatch: boolean;
  description?: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  tags: string[];
  testCases: TestCase[];
}

export interface UserProgress {
  completedChallengeIds: string[];
}
