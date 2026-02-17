import { Button } from "@/components/ui/button";
import { Difficulty } from "@/types/challenge";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  selectedDifficulty: Difficulty | 'All';
  onSelect: (difficulty: Difficulty | 'All') => void;
  className?: string;
}

export function FilterBar({ selectedDifficulty, onSelect, className }: FilterBarProps) {
  const filters: (Difficulty | 'All')[] = ['All', 'Basic', 'Intermediate', 'Advanced'];

  return (
    <div className={cn("flex items-center gap-2 p-1 bg-muted/50 rounded-lg w-fit", className)}>
      {filters.map((filter) => (
        <Button
          key={filter}
          variant={selectedDifficulty === filter ? "secondary" : "ghost"}
          size="sm"
          onClick={() => onSelect(filter)}
          className={cn(
            "transition-all",
            selectedDifficulty === filter && "bg-background shadow-sm hover:bg-background"
          )}
        >
          {filter}
        </Button>
      ))}
    </div>
  );
}
