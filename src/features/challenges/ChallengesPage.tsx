import { useTranslation } from "react-i18next";
import { useChallenges } from "./hooks/useChallenges";
import { ChallengeList } from "./components/ChallengeList";
import { FilterBar } from "./components/FilterBar";

// ... (comments omitted)

interface ChallengesPageProps {
    onNavigateToChallenge: (challengeId: string) => void;
}

export function ChallengesPage({ onNavigateToChallenge }: ChallengesPageProps) {
    const { t } = useTranslation();
    const {
        challenges,
        userProgress,
        isLoading,
        error,
        filterDifficulty,
        setFilterDifficulty
    } = useChallenges();

    if (isLoading) {
        return <div className="p-8 text-center">{t('challenges.list.loading')}</div>;
    }

    if (error) {
        return <div className="p-8 text-center text-destructive">{error}</div>;
    }

    return (
        <div className="container py-8 space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">{t('challenges.title')}</h1>
                    <p className="text-muted-foreground">
                        {t('challenges.subtitle')}
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
