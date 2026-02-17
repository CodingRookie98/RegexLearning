import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Topic } from '../../../types';

import { Button } from '@/components/ui/button';
import { PracticeInput } from './PracticeInput';
import { usePractice } from '../hooks/usePractice';
import { highlightMatches } from '@/utils/highlightMatches';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';

interface TopicDetailProps {
  topic: Topic | null;
}

export const TopicDetail: React.FC<TopicDetailProps> = ({ topic }) => {
  const { t } = useTranslation();
    const [showAnswer, setShowAnswer] = useState(false);

    // Always call hooks, but handle null topic gracefully in rendering
    const topicId = topic?.id || 0;
    const answer = topic?.answer || '';
    const text = topic?.text || [];

    const { input, status, errorMsg, validate } = usePractice(topicId, answer, text);

  if (!topic) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground bg-background h-full">
        <div className="text-6xl mb-4 opacity-20">📚</div>
        <p className="text-lg font-medium">{t('learn.selectTopic')}</p>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 overflow-y-auto bg-background h-full">
          <div className="max-w-3xl mx-auto space-y-8">

              {/* Header Section */}
              <div className="space-y-4 border-b pb-6">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">{topic.title}</h2>
                  <div className="text-foreground/80 leading-relaxed space-y-4 text-lg">
                      {topic.description.split('\n').map((para, i) => (
                          <p key={i}>{para}</p>
                      ))}
                  </div>
              </div>

              {/* Practice Section */}
              <div className="space-y-6">
                  <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                          <span>🎯</span> {t('practice.testText', 'Interactive Practice')}
                      </h3>
                      <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowAnswer(!showAnswer)}
                          className="text-muted-foreground hover:text-primary"
                      >
                          {showAnswer ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                          {showAnswer ? t('common.hideAnswer', 'Hide Answer') : t('common.showAnswer', 'Show Answer')}
                      </Button>
                  </div>

                  {/* Visualization Area */}
                  <div className="bg-muted/30 p-6 rounded-xl border shadow-sm space-y-4">
                      {topic.text.map((line, i) => {
                          const segments = highlightMatches(line, input);
                          return (
                              <div key={i} className="bg-background p-4 rounded-lg border shadow-sm font-mono text-base">
                                  {segments.map((seg, j) => (
                                      <span
                                          key={j}
                                          className={cn(
                                              seg.isMatch
                                                  ? "bg-primary/20 text-foreground font-bold rounded px-1 ring-1 ring-primary/30"
                                                  : "text-foreground"
                                          )}
                                      >
                                          {seg.text}
                                      </span>
                                  ))}
                              </div>
                          );
                      })}
                      {topic.text.length === 0 && (
                          <div className="text-muted-foreground italic text-center p-4">No example text provided for this topic.</div>
                      )}
                  </div>

                  {/* Input Area */}
                  <div className="space-y-4">
                      <PracticeInput
                          value={input}
                          onChange={validate}
                          status={status}
                          errorMessage={errorMsg}
                      />

                      {showAnswer && (
                          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 animate-in fade-in slide-in-from-top-2">
                              <p className="text-sm text-muted-foreground mb-1 font-semibold uppercase tracking-wider">Answer Pattern:</p>
                              <code className="text-primary font-mono text-lg block bg-background/50 p-2 rounded border border-primary/10">
                                  {topic.answer}
                              </code>
                          </div>
                      )}
                  </div>
              </div>

      </div>
    </div>
  );
};
