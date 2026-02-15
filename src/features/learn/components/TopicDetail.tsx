import React from 'react';
import { Topic } from '../../../types';

interface TopicDetailProps {
  topic: Topic | null;
}

export const TopicDetail: React.FC<TopicDetailProps> = ({ topic }) => {
  if (!topic) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Select a topic to start learning
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">{topic.title}</h2>
      <div className="prose dark:prose-invert max-w-none">
        {/* Simple rendering for now, consider a markdown parser later */}
        {topic.description.split('\n').map((para, i) => (
          <p key={i} className="mb-4">{para}</p>
        ))}
      </div>
      
      {topic.text && topic.text.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Examples:</h3>
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md font-mono text-sm">
            {topic.text.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};