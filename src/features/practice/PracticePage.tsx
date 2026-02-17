import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTopics } from '../learn/hooks/useTopics';
import { usePractice } from './hooks/usePractice';
import { PracticeInput } from './components/PracticeInput';
import { highlightMatches } from '../../utils/highlightMatches';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const PracticePage: React.FC = () => {
  const { t } = useTranslation();
  const { topics, loading } = useTopics();
  const [selectedTopicId, setSelectedTopicId] = useState<number>(1); // Default to first

  const currentTopic = topics.find(t => t.id === selectedTopicId);

  const { input, status, errorMsg, validate } = usePractice(
    currentTopic?.id || 0,
    currentTopic?.answer || '',
    currentTopic?.text || []
  );

    if (loading) return <div className="text-muted-foreground p-4">{t('practice.loading')}</div>;
    if (!currentTopic) return <div className="text-muted-foreground p-4">{t('common.topicNotFound')}</div>;

  return (
      <div className="h-full w-full overflow-y-auto bg-background p-6">
      <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-4 text-foreground">{currentTopic.title}</h2>
              <p className="mb-6 text-muted-foreground">{currentTopic.description}</p>

              <div className="mb-6 bg-muted/40 p-4 rounded-xl border shadow-sm">
                  <h3 className="font-semibold mb-3 text-foreground/80 flex items-center gap-2">
            <span>🎯</span> {t('practice.testText')}
          </h3>
          <div className="space-y-2 font-mono text-sm">
                      {currentTopic.text.map((line, i) => {
              const segments = highlightMatches(line, input);
              return (
                  <div key={i} className="bg-background p-3 rounded-lg border shadow-sm transition-all hover:shadow-md">
                  {segments.map((seg, j) => (
                      <span
                      key={j}
                          className={cn(
                              seg.isMatch
                                  ? "bg-primary/20 text-foreground font-bold rounded px-0.5 ring-1 ring-primary/30"
                                  : "text-foreground"
                          )}
                    >
                      {seg.text}
                    </span>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

              <PracticeInput
          value={input}
          onChange={validate}
          status={status}
          errorMessage={errorMsg}
        />

        <div className="mt-10">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            More Topics
          </h3>
                  <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-thin">
            {topics.map(t => (
                <Button
                key={t.id}
                    variant={selectedTopicId === t.id ? "default" : "outline"}
                    className={cn(
                        "whitespace-nowrap transition-all duration-200",
                        selectedTopicId === t.id && "shadow-lg shadow-primary/30 transform scale-105"
                    )}
                    onClick={() => setSelectedTopicId(t.id)}
              >
                {t.title}
                </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};