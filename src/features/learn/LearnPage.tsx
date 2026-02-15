import React, { useState } from 'react';
import { useTopics } from './hooks/useTopics';
import { TopicList } from './components/TopicList';
import { TopicDetail } from './components/TopicDetail';

export const LearnPage: React.FC = () => {
  const { topics, loading, error } = useTopics();
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);

  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  const selectedTopic = topics.find(t => t.id === selectedTopicId) || null;

  // Auto-select first topic if none selected
  if (!selectedTopicId && topics.length > 0) {
    setSelectedTopicId(topics[0].id);
  }

  return (
    <div className="flex h-[calc(100vh-64px)]"> 
      {/* Subtract header height approx 64px */}
      <TopicList 
        topics={topics} 
        selectedTopicId={selectedTopicId} 
        onSelectTopic={setSelectedTopicId} 
      />
      <TopicDetail topic={selectedTopic} />
    </div>
  );
};