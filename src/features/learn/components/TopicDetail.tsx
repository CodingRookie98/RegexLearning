import React from 'react';
import { useTranslation } from 'react-i18next';
import { Topic } from '../../../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TopicDetailProps {
  topic: Topic | null;
}

export const TopicDetail: React.FC<TopicDetailProps> = ({ topic }) => {
  const { t } = useTranslation();

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
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="space-y-2 pb-4 border-b">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">{topic.title}</h2>
        </div>
        
        <div className="text-foreground/80 leading-relaxed space-y-4">
          {topic.description.split('\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        
        {topic.text && topic.text.length > 0 && (
          <Card className="mt-8">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <span className="text-primary">⚡</span> {t('learn.examples')}
              </CardTitle>
            </CardHeader>
            <CardContent className="font-mono text-sm pt-2">
              <div className="rounded-md bg-muted p-4 space-y-1">
                {topic.text.map((line, i) => (
                  <div key={i} className="flex gap-4 px-2 py-0.5 rounded hover:bg-muted-foreground/10 transition-colors">
                    <span className="text-muted-foreground select-none w-6 text-right text-xs pt-0.5">{i + 1}</span>
                    <span className="text-foreground whitespace-pre">{line}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};