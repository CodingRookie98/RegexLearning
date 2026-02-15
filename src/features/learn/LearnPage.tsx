import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTopics } from './hooks/useTopics';
import { TopicList } from './components/TopicList';
import { TopicDetail } from './components/TopicDetail';

export const LearnPage: React.FC = () => {
  const { t } = useTranslation();
  const { topics, loading, error } = useTopics();
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);

  if (loading) {
    return <div className="flex items-center justify-center h-full">{t('common.loading')}</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{t('common.error', { message: error })}</div>;
  }

  const selectedTopic = topics.find(t => t.id === selectedTopicId) || null;

  // Auto-select first topic if none selected
  if (!selectedTopicId && topics.length > 0) {
    setSelectedTopicId(topics[0].id);
  }

  return (
    <div className="flex h-full w-full overflow-hidden bg-white dark:bg-gray-900">
      <TopicList 
        topics={topics} 
        selectedTopicId={selectedTopicId} 
        onSelectTopic={setSelectedTopicId} 
      />
      <TopicDetail topic={selectedTopic} />
    </div>
  );
};