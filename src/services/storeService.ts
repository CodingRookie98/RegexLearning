import { UserProgress } from '../types';
import { getStore, setStore } from './store';

const STORE_KEY = 'user_progress';

export class StoreService {
  static async getUserProgress(): Promise<UserProgress> {
    const progress = await getStore<UserProgress>(STORE_KEY);
    if (!progress) {
      return {
        completedTopics: {},
        lastTopicId: undefined,
      };
    }
    return progress;
  }

  static async saveUserProgress(progress: UserProgress): Promise<void> {
    await setStore(STORE_KEY, progress);
  }

  static async markTopicCompleted(topicId: number): Promise<void> {
    const progress = await this.getUserProgress();
    progress.completedTopics[topicId] = true;
    progress.lastTopicId = topicId;
    await this.saveUserProgress(progress);
  }
}