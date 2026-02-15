import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

// Mock the hook to isolate tests
vi.mock('../hooks/useTheme', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: vi.fn(),
  }),
}));

describe('App Component', () => {
  it('renders welcome message', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    );
    // Should match "Regex Learning" or welcome text
    expect(screen.getByText(/Regex Learning/i)).toBeInTheDocument();
  });

  it('renders theme switcher', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    );
    expect(screen.getByRole('combobox', { name: /theme/i })).toBeInTheDocument();
  });

  it('renders language switcher', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    );
    expect(screen.getByRole('combobox', { name: /language/i })).toBeInTheDocument();
  });
});