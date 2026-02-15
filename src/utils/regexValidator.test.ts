import { describe, it, expect } from 'vitest';
import { validateRegex } from './regexValidator';

describe('regexValidator', () => {
  it('should return valid for correct pattern', () => {
    const result = validateRegex('^\\d+$', ['123'], '^\\d+$');
    expect(result.isValid).toBe(true);
    expect(result.error).toBeNull();
  });

  it('should return invalid for mismatched pattern', () => {
    // Answer expects digits
    // If we use '^\d+$' against 'abc', it matches NOTHING.
    // If the expected answer '^\d+$' also matches NOTHING in 'abc'.
    // Then they are technically equivalent (both return no matches).
    
    // To test invalidity, we need a text where one matches and the other doesn't.
    // Text: "123"
    // Expected: "^\d+$" (matches "123")
    // User: "abc" (matches nothing)
    
    const result = validateRegex('abc', ['123'], '^\\d+$');
    expect(result.isValid).toBe(false);
  });

  it('should return error for invalid regex syntax', () => {
    const result = validateRegex('[', ['123'], '123');
    expect(result.isValid).toBe(false);
    expect(result.error).not.toBeNull();
  });

  it('should support functional equivalence', () => {
    // User regex is different string but produces same match
    const text = ['hello 123 world'];
    const answer = '\\d+'; // Matches "123"
    const userRegex = '[0-9]+'; // Also matches "123"
    
    const result = validateRegex(userRegex, text, answer);
    expect(result.isValid).toBe(true);
  });
  
  it('should fail if matches are different', () => {
    const text = ['hello 123 world'];
    const answer = '\\d+'; // "123"
    const userRegex = '\\w+'; // "hello", "123", "world"
    
    const result = validateRegex(userRegex, text, answer);
    expect(result.isValid).toBe(false);
  });
});