import { useChallenges } from "./hooks/useChallenges";
import { ChallengeList } from "./components/ChallengeList";
import { FilterBar } from "./components/FilterBar";
// Assuming react-router-dom is used, typically via Tauri implementation or existing router
// Wait, I need to check how navigation is handled in this project.
// App.tsx uses state-based navigation currently.
// I should probably stick to that for now or refactor to react-router-dom if that's the plan.
// The existing `App.tsx` renders different pages based on `currentView`.
// So `useNavigate` might not be applicable unless I change App.tsx.

// Let's assume for now I will use a callback prop or just expose the component
// and handle navigation in App.tsx.
// But wait, `ChallengesPage` is a "Page", so it should probably take a navigation callback if not using a router.

interface ChallengesPageProps {
    onNavigateToChallenge: (challengeId: string) => void;
}

export function ChallengesPage({ onNavigateToChallenge }: ChallengesPageProps) {
    const {
        challenges,
        userProgress,
        isLoading,
        error,
        filterDifficulty,
        setFilterDifficulty
    } = useChallenges();

    if (isLoading) {
        return <div className="p-8 text-center">Loading challenges...</div>;
    }

    if (error) {
        return <div className="p-8 text-center text-destructive">{error}</div>;
    }

    return (
        <div className="container py-8 space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Question Bank</h1>
                    <p className="text-muted-foreground">
                        Explore regex challenges and track your mastery.
                    </p>
                </div>
                <FilterBar
                    selectedDifficulty={filterDifficulty}
                    onSelect={setFilterDifficulty}
                />
            </div>

            <ChallengeList
                challenges={challenges}
                completedChallengeIds={userProgress.completedChallengeIds}
                onStartChallenge={onNavigateToChallenge}
            />
        </div>
    );
}
