import React from 'react';
import { Topic } from '../../../types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TopicListProps {
  topics: Topic[];
  selectedTopicId: number | null;
  onSelectTopic: (id: number) => void;
}

export const TopicList: React.FC<TopicListProps> = ({ 
  topics, 
  selectedTopicId, 
  onSelectTopic 
}) => {
  return (
    <div className="flex flex-col w-64 border-r bg-muted/10 h-full">
      <div className="p-4 border-b">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Topics
        </h3>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {topics.map((topic) => (
          <Button
            key={topic.id}
            variant={selectedTopicId === topic.id ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start text-sm font-normal",
              selectedTopicId === topic.id && "bg-secondary font-medium"
            )}
            onClick={() => onSelectTopic(topic.id)}
          >
            <div className="flex items-center gap-2 w-full">
              <span className={cn(
                "w-2 h-2 rounded-full",
                selectedTopicId === topic.id ? "bg-primary" : "bg-muted-foreground/30"
              )} />
              <span className="truncate">{topic.title}</span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};