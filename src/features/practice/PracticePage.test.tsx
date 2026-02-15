import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PracticePage } from './PracticePage';
import { StoreService } from '../../services/storeService';

// Mock child components to focus on integration logic
vi.mock('./components/PracticeInput', () => ({
  PracticeInput: ({ value, onChange, status }: any) => (
    <input 
      data-testid="regex-input"
      data-status={status}
      value={value} 
      onChange={(e) => onChange(e.target.value)} 
    />
  )
}));

// Mock StoreService
vi.mock('../../services/storeService', () => ({
  StoreService: {
    markTopicCompleted: vi.fn(),
    getUserProgress: vi.fn().mockResolvedValue({ completedTopics: {} }),
  }
}));

// Mock useTopics to return a practice topic
vi.mock('../learn/hooks/useTopics', () => ({
  useTopics: () => ({
    topics: [
      { 
        id: 1, 
        title: 'Practice 1', 
        description: 'Match numbers', 
        text: ['123', 'abc'], 
        answer: '\\d+' 
      }
    ],
    loading: false
  })
}));

describe('PracticePage Integration', () => {
  it('updates status on valid input', async () => {
    render(<PracticePage />);
    
    const input = screen.getByTestId('regex-input');
    
    // Type correct answer
    fireEvent.change(input, { target: { value: '\\d+' } });
    
    await waitFor(() => {
      expect(input).toHaveAttribute('data-status', 'success');
    });
    
    expect(StoreService.markTopicCompleted).toHaveBeenCalledWith(1);
  });

  it('shows error on invalid input', async () => {
    render(<PracticePage />);
    
    const input = screen.getByTestId('regex-input');
    
    // Type wrong answer
    fireEvent.change(input, { target: { value: 'abc' } });
    
    await waitFor(() => {
      expect(input).toHaveAttribute('data-status', 'error');
    });
  });
});