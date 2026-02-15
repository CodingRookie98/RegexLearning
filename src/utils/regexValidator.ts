export interface ValidationResult {
  isValid: boolean;
  error: string | null;
}

export function validateRegex(
  regex: string, 
  testStrings: string[], 
  expectedAnswer: string
): ValidationResult {
  try {
    if (!regex) return { isValid: false, error: null };

    // 1. Check basic syntax
    const userRegExp = new RegExp(regex, 'g'); // Ensure global matching for fairness
    const answerRegExp = new RegExp(expectedAnswer, 'g');

    // 2. Functional Equivalence Check
    // Compare matches on ALL test strings
    for (const text of testStrings) {
      const userMatches = text.match(userRegExp) || [];
      const answerMatches = text.match(answerRegExp) || [];

      // Check count first for speed
      if (userMatches.length !== answerMatches.length) {
        return { isValid: false, error: null };
      }

      // Check exact match content
      for (let i = 0; i < userMatches.length; i++) {
        if (userMatches[i] !== answerMatches[i]) {
          return { isValid: false, error: null };
        }
      }
    }

    return { isValid: true, error: null };
  } catch (e) {
    return { 
      isValid: false, 
      error: e instanceof Error ? e.message : 'Invalid Regex' 
    };
  }
}