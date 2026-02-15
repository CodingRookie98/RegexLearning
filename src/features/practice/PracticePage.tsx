import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTopics } from '../learn/hooks/useTopics';
import { usePractice } from './hooks/usePractice';
import { PracticeInput } from './components/PracticeInput';
import { highlightMatches } from '../../utils/highlightMatches';

export const PracticePage: React.FC = () => {
  const { t } = useTranslation();
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

  if (loading) return <div>{t('practice.loading')}</div>;
  if (!currentTopic) return <div>{t('common.topicNotFound')}</div>;

  return (
    <div className="h-full w-full overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">{currentTopic.title}</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-300">{currentTopic.description}</p>
        
        <div className="mb-6 bg-gray-100 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="font-semibold mb-3 text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <span>🎯</span> {t('practice.testText')}
          </h3>
          <div className="space-y-2 font-mono text-sm">
            {currentTopic.text.map((line, i) => {
              // Compute matches for display only - visual feedback
              const segments = highlightMatches(line, input);
              return (
                <div key={i} className="bg-white dark:bg-black/50 p-3 rounded-lg border border-gray-200 dark:border-gray-700/50 shadow-sm transition-all hover:shadow-md">
                  {segments.map((seg, j) => (
                    <span 
                      key={j}
                      className={seg.isMatch 
                        ? "bg-yellow-200 dark:bg-yellow-500/30 text-black dark:text-yellow-100 font-bold rounded px-0.5 ring-1 ring-yellow-300 dark:ring-yellow-500/50" 
                        : "text-gray-800 dark:text-gray-300"}
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
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            More Topics
          </h3>
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
            {topics.map(t => (
              <button
                key={t.id}
                onClick={() => setSelectedTopicId(t.id)}
                className={`
                  px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all duration-200 font-medium
                  ${selectedTopicId === t.id 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 transform scale-105' 
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'}
                `}
              >
                {t.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};