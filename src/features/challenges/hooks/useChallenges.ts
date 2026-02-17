import { useState, useEffect, useMemo } from 'react';
import { Challenge, Difficulty, UserProgress } from '@/types/challenge';
import { ChallengeService } from '@/services/challengeService';
import { ChallengeProgressService } from '@/services/challengeProgressService';

export function useChallenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress>({ completedChallengeIds: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filterDifficulty, setFilterDifficulty] = useState<Difficulty | 'All'>('All');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [loadedChallenges, progress] = await Promise.all([
          ChallengeService.getAllChallenges(),
          ChallengeProgressService.getProgress()
        ]);
        setChallenges(loadedChallenges);
        setUserProgress(progress);
      } catch (err) {
        setError('Failed to load challenges');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredChallenges = useMemo(() => {
    if (filterDifficulty === 'All') {
      return challenges;
    }
    return challenges.filter(c => c.difficulty === filterDifficulty);
  }, [challenges, filterDifficulty]);

  return {
    challenges: filteredChallenges,
    userProgress,
    isLoading,
    error,
    filterDifficulty,
    setFilterDifficulty
  };
}
