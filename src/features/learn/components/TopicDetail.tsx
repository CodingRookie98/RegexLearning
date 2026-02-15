import React from 'react';
import { useTranslation } from 'react-i18next';
import { Topic } from '../../../types';

interface TopicDetailProps {
  topic: Topic | null;
}

export const TopicDetail: React.FC<TopicDetailProps> = ({ topic }) => {
  const { t } = useTranslation();

  if (!topic) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-gray-500 bg-white dark:bg-gray-900">
        <div className="text-6xl mb-4 opacity-20">📚</div>
        <p className="text-lg font-medium">{t('learn.selectTopic')}</p>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 overflow-y-auto bg-white dark:bg-gray-900">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100 tracking-tight border-b border-gray-100 dark:border-gray-800 pb-4">
          {topic.title}
        </h2>
        
        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed">
          {/* Simple rendering for now, consider a markdown parser later */}
          {topic.description.split('\n').map((para, i) => (
            <p key={i} className="mb-4">{para}</p>
          ))}
        </div>
        
        {topic.text && topic.text.length > 0 && (
          <div className="mt-10 pt-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <span className="text-blue-500">⚡</span> {t('learn.examples')}
            </h3>
            <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4 font-mono text-sm shadow-sm overflow-x-auto">
              {topic.text.map((line, i) => (
                <div key={i} className="flex gap-4 hover:bg-gray-100 dark:hover:bg-gray-700/50 px-2 py-0.5 rounded transition-colors">
                  <span className="text-gray-400 select-none w-6 text-right text-xs pt-0.5">{i + 1}</span>
                  <span className="text-gray-800 dark:text-gray-200 whitespace-pre">{line}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};