import { useState, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from 'react-error-boundary';
import { useTheme } from './hooks/useTheme';
import { ErrorFallback } from './components/ErrorFallback';
import { LearnPage } from './features/learn/LearnPage';
import { PracticePage } from './features/practice/PracticePage';
import { SandboxPage } from './features/sandbox/SandboxPage';
import { CheatSheetPage } from './features/cheatsheet/CheatSheetPage';

type View = 'learn' | 'practice' | 'sandbox' | 'cheatsheet';

function App() {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [currentView, setCurrentView] = useState<View>('learn');

  const renderView = () => {
    switch (currentView) {
      case 'learn': return <LearnPage />;
      case 'practice': return <PracticePage />;
      case 'sandbox': return <SandboxPage />;
      case 'cheatsheet': return <CheatSheetPage />;
      default: return <LearnPage />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 z-10 shrink-0 h-16">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Regex Learning
          </h1>
        </div>

        <nav className="flex gap-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
          {(['learn', 'practice', 'sandbox', 'cheatsheet'] as View[]).map((view) => (
            <button
              key={view}
              onClick={() => setCurrentView(view)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                currentView === view
                  ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              {t(`nav.${view}`, view.charAt(0).toUpperCase() + view.slice(1))}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <select
            aria-label="Language"
            value={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            className="bg-transparent text-sm border-none focus:ring-0 cursor-pointer text-gray-700 dark:text-gray-300"
          >
            <option value="en">English</option>
            <option value="zh">中文</option>
          </select>

          <select
            aria-label="Theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value as any)}
            className="bg-transparent text-sm border-none focus:ring-0 cursor-pointer text-gray-700 dark:text-gray-300"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>
      </header>

      <main className="flex-1 overflow-hidden relative">
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
          <Suspense fallback={<div className="p-10">Loading...</div>}>
            {renderView()}
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}

export default App;