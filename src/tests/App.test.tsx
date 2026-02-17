import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import { ThemeProvider } from '@/components/theme-provider';

// Mock matchMedia for ThemeProvider
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), 
    removeListener: vi.fn(), 
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('App Component', () => {
  it('renders welcome message', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </I18nextProvider>
    );
    expect(screen.getByText(/Regex Learning/i)).toBeInTheDocument();
  });

  it('renders theme switcher', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </I18nextProvider>
    );
    // Look for the toggle button (it has sr-only text "Toggle theme")
    expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument();
  });

  it('renders language switcher', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </I18nextProvider>
    );
    expect(screen.getByRole('combobox', { name: /language/i })).toBeInTheDocument();
  });
});