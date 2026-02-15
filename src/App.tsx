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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const renderView = () => {
    switch (currentView) {
      case 'learn': return <LearnPage />;
      case 'practice': return <PracticePage />;
      case 'sandbox': return <SandboxPage />;
      case 'cheatsheet': return <CheatSheetPage />;
      default: return <LearnPage />;
    }
  };

  const navItems: { id: View; label: string; icon: string }[] = [
    { id: 'learn', label: 'Learn', icon: '📚' },
    { id: 'practice', label: 'Practice', icon: '✍️' },
    { id: 'sandbox', label: 'Sandbox', icon: '🧪' },
    { id: 'cheatsheet', label: 'Cheatsheet', icon: '📝' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200 overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 ease-in-out shrink-0 z-20`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
          {isSidebarOpen ? (
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 truncate">
              Regex Learning
            </h1>
          ) : (
            <span className="text-2xl mx-auto font-bold text-blue-600">RL</span>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
            aria-label="Toggle Sidebar"
          >
            {isSidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                currentView === item.id
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
              title={!isSidebarOpen ? t(`nav.${item.id}`, item.label) : ''}
            >
              <span className="text-xl">{item.icon}</span>
              {isSidebarOpen && (
                <span className="truncate">
                  {t(`nav.${item.id}`, item.label)}
                </span>
              )}
              {isSidebarOpen && currentView === item.id && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
          {isSidebarOpen && (
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 px-2">
              Settings
            </div>
          )}
          
          <div className={`flex flex-col gap-3 ${!isSidebarOpen ? 'items-center' : ''}`}>
            <div className="relative group w-full">
              <select
                aria-label="Language"
                value={i18n.language}
                onChange={(e) => i18n.changeLanguage(e.target.value)}
                className={`appearance-none bg-gray-100 dark:bg-gray-700 border-none rounded-md py-1.5 pl-3 pr-8 text-sm focus:ring-2 focus:ring-blue-500 cursor-pointer w-full ${!isSidebarOpen ? 'w-full px-1 text-center' : ''}`}
              >
                <option value="en">{isSidebarOpen ? 'English' : 'EN'}</option>
                <option value="zh">{isSidebarOpen ? '中文' : 'ZH'}</option>
              </select>
            </div>

            <div className="relative group w-full">
              <select
                aria-label="Theme"
                value={theme}
                onChange={(e) => setTheme(e.target.value as any)}
                className={`appearance-none bg-gray-100 dark:bg-gray-700 border-none rounded-md py-1.5 pl-3 pr-8 text-sm focus:ring-2 focus:ring-blue-500 cursor-pointer w-full ${!isSidebarOpen ? 'w-full px-1 text-center' : ''}`}
              >
                <option value="light">{isSidebarOpen ? 'Light' : '☀️'}</option>
                <option value="dark">{isSidebarOpen ? 'Dark' : '🌙'}</option>
                <option value="system">{isSidebarOpen ? 'System' : '💻'}</option>
              </select>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative bg-gray-50 dark:bg-gray-900">
        {/* Sticky Header */}
        <header className="h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 sticky top-0 z-10 shrink-0">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {t(`nav.${currentView}`, currentView.charAt(0).toUpperCase() + currentView.slice(1))}
          </h2>
        </header>

        {/* Content Area - Pages handle their own scrolling */}
        <main className="flex-1 overflow-hidden relative">
          <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
            <Suspense fallback={<div className="flex items-center justify-center h-full text-gray-500">Loading...</div>}>
              {renderView()}
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}

export default App;