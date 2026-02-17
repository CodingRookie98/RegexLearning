import { Store } from '@tauri-apps/plugin-store';
import { UserProgress } from '@/types/challenge';

const STORE_PATH = 'user_progress.json';
const KEY_PROGRESS = 'challenge_progress';

// Singleton store instance
let store: Store | null = null;

const getStore = async (): Promise<Store> => {
    if (!store) {
        store = await Store.load(STORE_PATH);
    }
    return store;
};

export const ChallengeProgressService = {
    /**
     * Initialize the store and return the current progress.
     */
    getProgress: async (): Promise<UserProgress> => {
        try {
            const store = await getStore();
            const progress = await store.get<UserProgress>(KEY_PROGRESS);

            if (progress) {
                return progress;
            }

            // Default initial state
            const initialProgress: UserProgress = {
                completedChallengeIds: []
            };
            await store.set(KEY_PROGRESS, initialProgress);
            await store.save();
            return initialProgress;
        } catch (error) {
            console.error('Failed to load progress:', error);
            // Fallback for dev/web mode if store plugin fails
            return { completedChallengeIds: [] };
        }
    },

    /**
     * Mark a challenge as completed.
     */
    markAsCompleted: async (challengeId: string): Promise<UserProgress> => {
        const store = await getStore();
        const currentProgress = await ChallengeProgressService.getProgress();

        // Avoid duplicates
        if (!currentProgress.completedChallengeIds.includes(challengeId)) {
            const newProgress: UserProgress = {
                ...currentProgress,
                completedChallengeIds: [...currentProgress.completedChallengeIds, challengeId]
            };

            await store.set(KEY_PROGRESS, newProgress);
            await store.save();
            return newProgress;
        }

        return currentProgress;
    },

    /**
     * Reset all progress (useful for testing/debugging).
     */
    resetProgress: async (): Promise<void> => {
        const store = await getStore();
        await store.clear();
        await store.save();
    }
};
