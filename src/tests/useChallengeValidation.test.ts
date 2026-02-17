import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react'; // Need to check if I have this
import { useChallengeValidation } from '../features/challenges/hooks/useChallengeValidation';
import { Challenge } from '../types/challenge';

// Mock a challenge
const mockChallenge: Challenge = {
  id: 'test-1',
  title: 'Test',
  description: 'Test',
  difficulty: 'Basic',
  tags: [],
  testCases: [
    { input: 'abc', shouldMatch: true },
    { input: '123', shouldMatch: false }
  ]
};

describe('useChallengeValidation', () => {
  it('should initialize with empty pattern and failure', () => {
    const { result } = renderHook(() => useChallengeValidation(mockChallenge));
    expect(result.current.regexPattern).toBe('');
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.validationResults.every(r => !r.passed)).toBe(true);
  });

  it('should validate correct regex', () => {
    const { result } = renderHook(() => useChallengeValidation(mockChallenge));

    act(() => {
      result.current.setRegexPattern('[a-z]+');
    });

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.validationResults[0].passed).toBe(true); // 'abc' matches [a-z]+ -> true === true
    expect(result.current.validationResults[1].passed).toBe(true); // '123' does not match [a-z]+ -> false === false
  });

  it('should fail incorrect regex', () => {
    const { result } = renderHook(() => useChallengeValidation(mockChallenge));

    act(() => {
      result.current.setRegexPattern('\\d+');
    });

    expect(result.current.isSuccess).toBe(false);
    expect(result.current.validationResults[0].passed).toBe(false); // 'abc' doesn't match \d+ -> false !== true
    expect(result.current.validationResults[1].passed).toBe(false); // '123' matches \d+ -> true !== false
  });

  it('should handle invalid regex syntax', () => {
    const { result } = renderHook(() => useChallengeValidation(mockChallenge));

    act(() => {
      result.current.setRegexPattern('[');
    });

    expect(result.current.isSuccess).toBe(false);
    expect(result.current.validationResults[0].error).toBeDefined();
  });
});
