import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ChallengeProgressService } from '../services/challengeProgressService';

// Mock the Store class
const mockStore = {
  get: vi.fn(),
  set: vi.fn(),
  save: vi.fn(),
  load: vi.fn(),
  clear: vi.fn()
};

vi.mock('@tauri-apps/plugin-store', () => {
  return {
    Store: {
      load: vi.fn(() => Promise.resolve(mockStore))
    }
  };
});

describe('ChallengeProgressService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return empty progress if store is empty', async () => {
    mockStore.get.mockResolvedValue(null);
    const progress = await ChallengeProgressService.getProgress();
    expect(progress.completedChallengeIds).toEqual([]);
    expect(mockStore.set).toHaveBeenCalled(); // Should initialize default
  });

  it('should load existing progress', async () => {
    const existingProgress = { completedChallengeIds: ['basic-001'] };
    mockStore.get.mockResolvedValue(existingProgress);

    const progress = await ChallengeProgressService.getProgress();
    expect(progress).toEqual(existingProgress);
  });

  it('should mark challenge as completed', async () => {
    mockStore.get.mockResolvedValue({ completedChallengeIds: [] });

    await ChallengeProgressService.markAsCompleted('basic-001');

    expect(mockStore.set).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        completedChallengeIds: ['basic-001']
      })
    );
    expect(mockStore.save).toHaveBeenCalled();
  });

  it('should not add duplicate challenge ids', async () => {
    mockStore.get.mockResolvedValue({ completedChallengeIds: ['basic-001'] });

    await ChallengeProgressService.markAsCompleted('basic-001');

    // Should NOT call set again if no change
    expect(mockStore.set).not.toHaveBeenCalled();
  });
});
