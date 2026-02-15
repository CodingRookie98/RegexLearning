import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'system';
  });

  useEffect(() => {
    const root = document.documentElement;
    const sysQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const apply = () => {
      const isDark = theme === 'dark' || (theme === 'system' && sysQuery.matches);
      root.classList.toggle('dark', isDark);
    };

    apply(); // Apply immediately on change

    // Listen for system changes if in 'system' mode
    if (theme === 'system') {
      const listener = () => apply();
      sysQuery.addEventListener('change', listener);
      return () => sysQuery.removeEventListener('change', listener);
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    if (newTheme === 'system') {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', newTheme);
    }
  };

  return { theme, setTheme };
}