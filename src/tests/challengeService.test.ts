import { describe, it, expect } from 'vitest';
import { ChallengeService } from '../services/challengeService';

describe('ChallengeService', () => {
  it('should load all challenges', async () => {
    const challenges = await ChallengeService.getAllChallenges();
    expect(challenges.length).toBeGreaterThan(0);
  });

  it('should get challenge by id', async () => {
    const challenges = await ChallengeService.getAllChallenges();
    const firstId = challenges[0].id;
    const challenge = await ChallengeService.getChallengeById(firstId);
    expect(challenge).toBeDefined();
    expect(challenge?.id).toBe(firstId);
  });

  it('should return undefined for non-existent id', async () => {
    const challenge = await ChallengeService.getChallengeById('non-existent-id');
    expect(challenge).toBeUndefined();
  });

  it('should filter by difficulty', async () => {
    const basicChallenges = await ChallengeService.getChallengesByDifficulty('Basic');
    expect(basicChallenges.length).toBeGreaterThan(0);
    expect(basicChallenges.every(c => c.difficulty === 'Basic')).toBe(true);
  });
});
