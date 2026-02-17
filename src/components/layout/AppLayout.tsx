import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
  header: ReactNode;
  className?: string;
}

export function AppLayout({ children, sidebar, header, className }: AppLayoutProps) {
  return (
    <div className={cn("flex h-screen w-full overflow-hidden bg-background text-foreground", className)}>
      {/* Sidebar Area - role="complementary" implicit in <aside> */}
      <aside className="border-r bg-sidebar text-sidebar-foreground flex-shrink-0 z-20 transition-all duration-300 h-full flex flex-col">
        {sidebar}
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Header - role="banner" implicit in <header> */}
        <header className="flex h-16 items-center border-b bg-background px-6 sticky top-0 z-10">
          {header}
        </header>

        {/* Scrollable Content - role="main" implicit in <main> */}
        <main className="flex-1 overflow-auto p-6 relative">
          {children}
        </main>
      </div>
    </div>
  );
}

