import React from 'react';
import { Topic } from '../../../types';

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
    <div className="flex flex-col gap-2 w-64 border-r border-gray-200 dark:border-gray-700 h-full overflow-y-auto p-2">
      {topics.map((topic) => (
        <button
          key={topic.id}
          onClick={() => onSelectTopic(topic.id)}
          className={`
            text-left px-4 py-2 rounded-md transition-colors
            ${selectedTopicId === topic.id 
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 font-medium' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }
          `}
        >
          {topic.title}
        </button>
      ))}
    </div>
  );
};