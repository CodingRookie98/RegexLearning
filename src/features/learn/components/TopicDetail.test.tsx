import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TopicDetail } from './TopicDetail';
import { Topic } from '../../../types';

const mockTopic: Topic = {
  id: 1,
  title: 'Topic Title',
  description: 'Topic **Description**',
  text: ['Example 1'],
  answer: 'regex',
};

describe('TopicDetail Component', () => {
  it('renders topic details', () => {
    render(<TopicDetail topic={mockTopic} />);

    expect(screen.getByRole('heading', { name: /Topic Title/i })).toBeInTheDocument();
    // Use getAllByText for description if it appears multiple times, or look for specific content
    expect(screen.getByText('Topic **Description**')).toBeInTheDocument(); 
    // Note: markdown rendering might split text, simple check for now
  });

  it('renders empty state when no topic selected', () => {
    render(<TopicDetail topic={null} />);
    expect(screen.getByText('learn.selectTopic')).toBeInTheDocument();
  });
});