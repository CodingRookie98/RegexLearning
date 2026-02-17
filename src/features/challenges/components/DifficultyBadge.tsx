import { Badge } from "@/components/ui/badge";
import { Difficulty } from "@/types/challenge";
import { cn } from "@/lib/utils";

interface DifficultyBadgeProps {
  difficulty: Difficulty;
  className?: string;
}

export function DifficultyBadge({ difficulty, className }: DifficultyBadgeProps) {
  const colorMap: Record<Difficulty, string> = {
    Basic: "bg-green-500/15 text-green-700 dark:text-green-400 hover:bg-green-500/25 border-green-500/20",
    Intermediate: "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-500/25 border-yellow-500/20",
    Advanced: "bg-red-500/15 text-red-700 dark:text-red-400 hover:bg-red-500/25 border-red-500/20"
  };

  return (
    <Badge
      variant="outline"
      className={cn("font-normal border", colorMap[difficulty], className)}
    >
      {difficulty}
    </Badge>
  );
}
