import { useState, useMemo } from 'react';
import { Challenge, TestCase } from '@/types/challenge';

export interface TestCaseResult {
    testCase: TestCase;
    passed: boolean; // Whether the user's regex matched expectation (shouldMatch vs actual match)
    match: boolean;  // Whether the regex actually matched the input
    error?: string;
}

export function useChallengeValidation(challenge: Challenge) {
    const [regexPattern, setRegexPattern] = useState('');

    const validationResults = useMemo(() => {
        if (!regexPattern) {
            return challenge.testCases.map((tc): TestCaseResult => ({
                testCase: tc,
                passed: false,
                match: false
            }));
        }

        try {
            const regex = new RegExp(regexPattern); // Global flag might be tricky if not careful, usually single match is enough for validation unless specified
            // But for "contains", standard regex match is fine.
            // If challenge requires global, we might need to enforce it or added it.
            // For now, simple `test` or `match`.

            return challenge.testCases.map((tc): TestCaseResult => {
                const isMatch = regex.test(tc.input);
                return {
                    testCase: tc,
                    match: isMatch,
                    passed: isMatch === tc.shouldMatch
                };
            });
        } catch (e) {
            // Invalid regex
            return challenge.testCases.map(tc => ({
                testCase: tc,
                passed: false,
                match: false,
                error: (e as Error).message
            }));
        }
    }, [regexPattern, challenge]);

    const isSuccess = useMemo(() => {
        return validationResults.every(r => r.passed) && regexPattern.length > 0;
    }, [validationResults, regexPattern]);

    return {
        regexPattern,
        setRegexPattern,
        validationResults,
        isSuccess
    };
}
