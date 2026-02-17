import { useState, useEffect } from "react";
import { Challenge } from "@/types/challenge";
import { ChallengeService } from "@/services/challengeService";
import { ChallengeProgressService } from "@/services/challengeProgressService";
import { useChallengeValidation } from "../hooks/useChallengeValidation";
import { ValidationPanel } from "./ValidationPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CheckCircle } from "lucide-react";

interface ChallengeDetailProps {
    challengeId: string;
    onBack: () => void;
}

export function ChallengeDetail({ challengeId, onBack }: ChallengeDetailProps) {
    const [challenge, setChallenge] = useState<Challenge | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        ChallengeService.getChallengeById(challengeId).then(data => {
            setChallenge(data || null);
            setLoading(false);
        });
    }, [challengeId]);

    if (loading) return <div className="p-8 text-center text-muted-foreground">Loading challenge...</div>;
    if (!challenge) return <div className="p-8 text-center text-destructive">Challenge not found.</div>;

    return <ChallengeSolver challenge={challenge} onBack={onBack} />;
}

function ChallengeSolver({ challenge, onBack }: { challenge: Challenge; onBack: () => void }) {
    const { regexPattern, setRegexPattern, validationResults, isSuccess } = useChallengeValidation(challenge);
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        if (isSuccess && !isCompleted) {
            setIsCompleted(true);
            ChallengeProgressService.markAsCompleted(challenge.id);
            // Trigger simple confetti effect if available?
            // For now just console log or UI feedback
        }
    }, [isSuccess, challenge.id, isCompleted]);

    return (
        <div className="container py-6 h-[calc(100vh-4rem)] flex flex-col">
            <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" size="icon" onClick={onBack} className="shrink-0">
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        {challenge.title}
                        {isSuccess && <CheckCircle className="w-6 h-6 text-green-500 animate-in zoom-in" />}
                    </h2>
                    <div className="flex gap-2 mt-1">
                        {challenge.tags.map(tag => (
                            <span key={tag} className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 flex-1 min-h-0">
                {/* Left Pane: Description */}
                <div className="space-y-6 overflow-y-auto pr-2">
                    <div className="prose dark:prose-invert max-w-none">
                        <h3 className="text-xl font-semibold mb-2">Problem Description</h3>
                        <p className="text-lg leading-relaxed text-muted-foreground">
                            {challenge.description}
                        </p>
                    </div>

                    <div className="bg-muted p-4 rounded-lg border">
                        <h4 className="font-semibold mb-2 text-sm uppercase tracking-wide opacity-70">Goal</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Write a Regular Expression that matches all positive test cases.</li>
                            <li>Ensure it does not match any negative test cases.</li>
                        </ul>
                    </div>
                </div>

                {/* Right Pane: Editor & Validation */}
                <div className="flex flex-col gap-6 h-full min-h-0">
                    <div className="space-y-2 shrink-0">
                        <Label>Regular Expression</Label>
                        <div className="relative font-mono text-lg">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">/</span>
                            <Input
                                value={regexPattern}
                                onChange={(e) => setRegexPattern(e.target.value)}
                                className="pl-7 pr-10 py-6 text-lg font-mono"
                                placeholder="Type your regex here..."
                                autoFocus
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">/g</span>
                        </div>
                        {isSuccess && (
                            <div className="text-green-600 dark:text-green-400 font-medium text-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                                <CheckCircle className="w-4 h-4" />
                                Excellent! All test cases passed.
                            </div>
                        )}
                    </div>

                    <div className="flex-1 min-h-0 overflow-y-auto border rounded-xl p-4 bg-background/50">
                        <ValidationPanel results={validationResults} />
                    </div>
                </div>
            </div>
        </div>
    );
}
