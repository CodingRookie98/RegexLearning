import challengesData from '@/assets/data/challenges.json';
import { Challenge, Difficulty } from '@/types/challenge';

// Cast the imported JSON to the Challenge type, ensuring it matches the interface
const challenges: Challenge[] = challengesData as Challenge[];

export const ChallengeService = {
  getAllChallenges: (): Promise<Challenge[]> => {
    // Simulate async network call
    return Promise.resolve(challenges);
  },

  getChallengeById: (id: string): Promise<Challenge | undefined> => {
    return Promise.resolve(challenges.find(c => c.id === id));
  },

  getChallengesByDifficulty: (difficulty: Difficulty): Promise<Challenge[]> => {
    return Promise.resolve(challenges.filter(c => c.difficulty === difficulty));
  }
};
