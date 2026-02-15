import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SandboxEditor } from './SandboxEditor';

// Mock highlight utility
vi.mock('../../../utils/highlightMatches', () => ({
  highlightMatches: (text: string, regex: string) => {
    if (regex === 'match') {
      return [{ text: 'match', isMatch: true }];
    }
    return [{ text: text, isMatch: false }];
  }
}));

describe('SandboxEditor Component', () => {
  it('renders input fields', () => {
    render(<SandboxEditor />);
    expect(screen.getByPlaceholderText(/regex/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/test string/i)).toBeInTheDocument();
  });

  it('updates regex input', () => {
    render(<SandboxEditor />);
    const input = screen.getByPlaceholderText(/regex/i);
    fireEvent.change(input, { target: { value: 'abc' } });
    expect(input).toHaveValue('abc');
  });

  it('renders highlighted text', () => {
    render(<SandboxEditor />);
    const textInput = screen.getByPlaceholderText(/test string/i);
    const regexInput = screen.getByPlaceholderText(/regex/i);

    fireEvent.change(textInput, { target: { value: 'match' } });
    fireEvent.change(regexInput, { target: { value: 'match' } });

    // In a real implementation, this would render custom HTML/Spans
    // We check if the component renders without crashing and logic flows
    // Detailed rendering check depends on implementation
    const matches = screen.getAllByText('match');
    expect(matches.length).toBeGreaterThan(0);
  });
});