import { useState, useCallback } from 'react';
import { validateRegex } from '../../../utils/regexValidator';
import { StoreService } from '../../../services/storeService';

export function usePractice(
  topicId: number, 
  expectedAnswer: string, 
  testTexts: string[]
) {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const validate = useCallback(async (value: string) => {
    setInput(value);
    
    if (!value) {
      setStatus('idle');
      setErrorMsg(null);
      return;
    }

    const result = validateRegex(value, testTexts, expectedAnswer);
    
    if (result.isValid) {
      setStatus('success');
      setErrorMsg(null);
      await StoreService.markTopicCompleted(topicId);
    } else {
      setStatus('error');
      setErrorMsg(result.error || 'Incorrect pattern');
    }
  }, [topicId, expectedAnswer, testTexts]);

  return { input, status, errorMsg, validate };
}