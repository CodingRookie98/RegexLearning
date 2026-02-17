import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Challenge } from "@/types/challenge";
import { DifficultyBadge } from "./DifficultyBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";

interface ChallengeCardProps {
  challenge: Challenge;
  isCompleted?: boolean;
  onStart: (id: string) => void;
}

export function ChallengeCard({ challenge, isCompleted = false, onStart }: ChallengeCardProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
          <div className="space-y-1">
            <CardTitle className="text-xl line-clamp-1" title={challenge.title}>
              {challenge.title}
            </CardTitle>
            <div className="flex items-center gap-2">
              <DifficultyBadge difficulty={challenge.difficulty} />
              {isCompleted && (
                <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Completed
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <CardDescription className="line-clamp-3">
          {challenge.description}
        </CardDescription>
        <div className="flex flex-wrap gap-1 mt-4">
          {challenge.tags.map(tag => (
            <span key={tag} className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
              #{tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => onStart(challenge.id)} className="w-full group">
          {isCompleted ? "Practice Again" : "Start Challenge"}
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  );
}
