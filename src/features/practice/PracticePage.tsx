import React, { useState } from 'react';
import { useTopics } from '../learn/hooks/useTopics';
import { usePractice } from './hooks/usePractice';
import { PracticeInput } from './components/PracticeInput';
import { highlightMatches } from '../../utils/highlightMatches';

export const PracticePage: React.FC = () => {
  const { topics, loading } = useTopics();
  const [selectedTopicId, setSelectedTopicId] = useState<number>(1); // Default to first

  const currentTopic = topics.find(t => t.id === selectedTopicId);
  
  // Hooks must be called unconditionally, but usePractice depends on topic data
  // Wrapper component pattern is cleaner, but for simplicity we'll pass defaults if loading
  const { input, status, errorMsg, validate } = usePractice(
    currentTopic?.id || 0,
    currentTopic?.answer || '',
    currentTopic?.text || []
  );

  if (loading) return <div>Loading practice...</div>;
  if (!currentTopic) return <div>Topic not found</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{currentTopic.title}</h2>
      <p className="mb-6 text-gray-600 dark:text-gray-300">{currentTopic.description}</p>
      
      <div className="mb-6 bg-gray-100 dark:bg-gray-900 p-4 rounded border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Test Text (Matches Highlighted):</h3>
        <div className="space-y-1 font-mono text-sm">
          {currentTopic.text.map((line, i) => {
            // Compute matches for display only - visual feedback
            const segments = highlightMatches(line, input);
            return (
              <div key={i} className="bg-white dark:bg-black p-2 rounded shadow-sm">
                {segments.map((seg, j) => (
                  <span 
                    key={j}
                    className={seg.isMatch 
                      ? "bg-yellow-200 dark:bg-yellow-900 text-black dark:text-white font-bold rounded-sm" 
                      : "text-gray-800 dark:text-gray-200"}
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
      
      <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
        {topics.map(t => (
          <button
            key={t.id}
            onClick={() => setSelectedTopicId(t.id)}
            className={`
              px-3 py-1 rounded text-sm whitespace-nowrap transition-colors
              ${selectedTopicId === t.id 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200'}
            `}
          >
            {t.title}
          </button>
        ))}
      </div>
    </div>
  );
};