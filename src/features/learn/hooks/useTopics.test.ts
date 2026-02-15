import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useTopics } from './useTopics';
import { DataService } from '../../../services/dataService';

// Mock DataService
vi.mock('../../../services/dataService', () => ({
  DataService: {
    getTopics: vi.fn(),
  },
}));

describe('useTopics Hook', () => {
  it('should load topics on mount', async () => {
    const mockTopics = [
      { id: 1, title: 'Topic 1', description: 'Desc 1', text: [], answer: '' },
    ];
    (DataService.getTopics as any).mockResolvedValue(mockTopics);

    const { result } = renderHook(() => useTopics());

    // Initial state
    expect(result.current.loading).toBe(true);
    expect(result.current.topics).toEqual([]);

    // Wait for update
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.topics).toEqual(mockTopics);
    expect(result.current.error).toBeNull();
  });

  it('should handle errors', async () => {
    (DataService.getTopics as any).mockRejectedValue(new Error('Failed to load'));

    const { result } = renderHook(() => useTopics());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Failed to load');
    expect(result.current.topics).toEqual([]);
  });
});