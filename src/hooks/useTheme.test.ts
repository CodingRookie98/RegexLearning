import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useTheme } from './useTheme';

const matchMediaMock = vi.fn();

beforeEach(() => {
  matchMediaMock.mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
  window.matchMedia = matchMediaMock;
  localStorage.clear();
  document.documentElement.className = '';
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('useTheme Hook', () => {
  it('should verify initial state from localStorage', () => {
    localStorage.setItem('theme', 'dark');
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('dark');
  });

  it('should default to system if no storage', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('system');
  });

  it('should toggle class on theme change', () => {
    const { result } = renderHook(() => useTheme());
    
    act(() => {
      result.current.setTheme('dark');
    });

    expect(result.current.theme).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    act(() => {
      result.current.setTheme('light');
    });

    expect(result.current.theme).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('should handle system preference changes', () => {
    // Setup system dark mode
    matchMediaMock.mockImplementation((query) => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    const { result } = renderHook(() => useTheme());
    
    expect(result.current.theme).toBe('system');
    // Should apply dark class because system is dark
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});