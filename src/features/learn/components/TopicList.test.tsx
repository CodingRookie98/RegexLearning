import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TopicList } from './TopicList';
import { Topic } from '../../../types';

const mockTopics: Topic[] = [
  { id: 1, title: 'Topic 1', description: 'Desc 1', text: [], answer: '' },
  { id: 2, title: 'Topic 2', description: 'Desc 2', text: [], answer: '' },
];

describe('TopicList Component', () => {
  it('renders a list of topics', () => {
    render(
      <TopicList 
        topics={mockTopics} 
        selectedTopicId={null} 
        onSelectTopic={vi.fn()} 
      />
    );

    expect(screen.getByText('Topic 1')).toBeInTheDocument();
    expect(screen.getByText('Topic 2')).toBeInTheDocument();
  });

  it('highlights selected topic', () => {
    render(
      <TopicList 
        topics={mockTopics} 
        selectedTopicId={1} 
        onSelectTopic={vi.fn()} 
      />
    );

    const selectedBtn = screen.getByText('Topic 1').closest('button');
    expect(selectedBtn).toHaveClass('bg-secondary');
  });

  it('calls onSelectTopic when clicked', () => {
    const handleSelect = vi.fn();
    render(
      <TopicList 
        topics={mockTopics} 
        selectedTopicId={null} 
        onSelectTopic={handleSelect} 
      />
    );

    fireEvent.click(screen.getByText('Topic 2'));
    expect(handleSelect).toHaveBeenCalledWith(2);
  });
});