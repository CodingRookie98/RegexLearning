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
    <div className="flex flex-col gap-1 w-64 border-r border-gray-200 dark:border-gray-700 h-full overflow-y-auto p-3 bg-gray-50/50 dark:bg-gray-800/50">
      <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-2">
        Topics
      </h3>
      {topics.map((topic) => (
        <button
          key={topic.id}
          onClick={() => onSelectTopic(topic.id)}
          className={`
            text-left px-3 py-2 rounded-md transition-all duration-200 text-sm
            ${selectedTopicId === topic.id 
              ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-medium shadow-sm ring-1 ring-gray-200 dark:ring-gray-600' 
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200'
            }
          `}
        >
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${selectedTopicId === topic.id ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
            {topic.title}
          </div>
        </button>
      ))}
    </div>
  );
};