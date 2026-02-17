import { TestCaseResult } from "@/features/challenges/hooks/useChallengeValidation";
import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ValidationPanelProps {
  results: TestCaseResult[];
}

export function ValidationPanel({ results }: ValidationPanelProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        Test Cases
        <span className="text-sm font-normal text-muted-foreground ml-auto">
          {results.filter(r => r.passed).length} / {results.length} Passing
        </span>
      </h3>

      <div className="space-y-2">
        {results.map((result, index) => (
          <div
            key={index}
            className={cn(
              "flex items-center gap-3 p-3 rounded-lg border text-sm transition-colors",
              result.passed
                ? "bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400"
                : "bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-400"
            )}
          >
            {result.passed ? (
              <CheckCircle2 className="w-5 h-5 shrink-0" />
            ) : (
              <XCircle className="w-5 h-5 shrink-0" />
            )}

            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2 font-medium">
                <span>Input:</span>
                <code className="bg-background/50 px-1.5 py-0.5 rounded font-mono break-all">
                  "{result.testCase.input}"
                </code>
              </div>

              <div className="text-xs opacity-90">
                Expected: {result.testCase.shouldMatch ? "Match" : "No Match"} |
                Actual: {result.match ? "Match" : "No Match"}
              </div>

              {result.error && (
                 <div className="text-xs font-mono bg-destructive/10 p-1 rounded mt-1">
                   Error: {result.error}
                 </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
