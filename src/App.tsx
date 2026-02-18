import { useState, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './components/ErrorFallback';
import { LearnPage } from './features/learn/LearnPage';
import { SandboxPage } from './features/sandbox/SandboxPage';
import { CheatSheetPage } from './features/cheatsheet/CheatSheetPage';
import { ChallengesPage } from './features/challenges/ChallengesPage';
import { ChallengeDetail } from './features/challenges/components/ChallengeDetail';
import { HomePage } from './features/home/HomePage';
import { AppLayout } from './components/layout/AppLayout';
import { ThemeToggle } from './components/theme-toggle';
import { cn } from './lib/utils';
import { SettingsPage } from './features/settings/SettingsPage';
import { Home, BookOpen, FlaskConical, FileText, Puzzle, Settings } from 'lucide-react';

type View = 'home' | 'learn' | 'sandbox' | 'cheatsheet' | 'challenges' | 'settings';

function App() {
    const { t } = useTranslation();
    const [currentView, setCurrentView] = useState<View>('home');
    const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const renderView = () => {
    switch (currentView) {
        case 'home': return <HomePage onNavigate={setCurrentView} />;
        case 'learn': return <LearnPage />;
      case 'sandbox': return <SandboxPage />;
      case 'cheatsheet': return <CheatSheetPage />;
        case 'challenges':
            if (selectedChallengeId) {
                return <ChallengeDetail challengeId={selectedChallengeId} onBack={() => setSelectedChallengeId(null)} />;
            }
            return <ChallengesPage onNavigateToChallenge={setSelectedChallengeId} />;
        case 'settings': return <SettingsPage />;
        default: return <HomePage onNavigate={setCurrentView} />;
    }
  };

    const navItems: { id: View; label: string; icon: React.ReactNode }[] = [
        { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
        { id: 'learn', label: 'Learn', icon: <BookOpen className="w-5 h-5" /> },
        { id: 'sandbox', label: 'Sandbox', icon: <FlaskConical className="w-5 h-5" /> },
        { id: 'cheatsheet', label: 'Cheatsheet', icon: <FileText className="w-5 h-5" /> },
        { id: 'challenges', label: 'Question Bank', icon: <Puzzle className="w-5 h-5" /> },
        { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

    const sidebarContent = (
        <div className={cn("flex flex-col h-full transition-all duration-300", isSidebarOpen ? "w-64" : "w-20")}>
            <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
                {isSidebarOpen ? (
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 truncate">
                        Regex Learning
                    </h1>
                ) : (
                    <span className="text-2xl mx-auto font-bold text-primary">RL</span>
                )}
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-1 rounded-md hover:bg-sidebar-accent text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors"
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
                        className={cn(
                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                            currentView === item.id
                                ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-sm"
                                : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                        )}
                        title={!isSidebarOpen ? t(`nav.${item.id}`, item.label) : ''}
            >
                        <span className="text-xl">{item.icon}</span>
                        {isSidebarOpen && (
                            <span className="truncate">
                                {t(`nav.${item.id}`, item.label)}
                            </span>
                        )}
                        {isSidebarOpen && currentView === item.id && (
                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                        )}
            </button>
                ))}
            </nav>
        </div>
    );

    const headerContent = (
        <div className="flex w-full items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">
                {t(`nav.${currentView}`, currentView.charAt(0).toUpperCase() + currentView.slice(1))}
            </h2>
            <ThemeToggle />
        </div>
    );

    return (
        <AppLayout sidebar={sidebarContent} header={headerContent}>
            <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
                <Suspense fallback={<div className="flex items-center justify-center h-full text-muted-foreground">Loading...</div>}>
                    {renderView()}
                </Suspense>
          </ErrorBoundary>
        </AppLayout>
  );
}

export default App;