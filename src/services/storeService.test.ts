import { describe, it, expect, vi, beforeEach } from 'vitest';
import { StoreService } from './storeService';
import { UserProgress } from '../types';

// Mock the tauri-plugin-store wrapper
vi.mock('./store', () => ({
  getStore: vi.fn(),
  setStore: vi.fn(),
}));

import { getStore, setStore } from './store';

describe('StoreService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should get user progress', async () => {
    const mockProgress: UserProgress = {
      completedTopics: { 1: true },
      lastTopicId: 1,
    };
    (getStore as any).mockResolvedValue(mockProgress);

    const progress = await StoreService.getUserProgress();
    expect(progress).toEqual(mockProgress);
    expect(getStore).toHaveBeenCalledWith('user_progress');
  });

  it('should return default progress if none exists', async () => {
    (getStore as any).mockResolvedValue(null);

    const progress = await StoreService.getUserProgress();
    expect(progress).toEqual({
      completedTopics: {},
      lastTopicId: undefined,
    });
  });

  it('should save user progress', async () => {
    const progress: UserProgress = {
      completedTopics: { 1: true },
      lastTopicId: 1,
    };

    await StoreService.saveUserProgress(progress);
    expect(setStore).toHaveBeenCalledWith('user_progress', progress);
  });

  it('should mark topic as completed', async () => {
    const initialProgress: UserProgress = {
      completedTopics: {},
      lastTopicId: undefined,
    };
    (getStore as any).mockResolvedValue(initialProgress);

    await StoreService.markTopicCompleted(1);

    expect(setStore).toHaveBeenCalledWith('user_progress', {
      completedTopics: { 1: true },
      lastTopicId: 1,
    });
  });
});