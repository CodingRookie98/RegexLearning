import { Challenge } from "@/types/challenge";
import { ChallengeCard } from "./ChallengeCard";

interface ChallengeListProps {
  challenges: Challenge[];
  completedChallengeIds: string[];
  onStartChallenge: (id: string) => void;
}

export function ChallengeList({ challenges, completedChallengeIds, onStartChallenge }: ChallengeListProps) {
  if (challenges.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No challenges found for this category.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {challenges.map((challenge) => (
        <ChallengeCard
          key={challenge.id}
          challenge={challenge}
          isCompleted={completedChallengeIds.includes(challenge.id)}
          onStart={onStartChallenge}
        />
      ))}
    </div>
  );
}
