
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategorySectionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  title,
  defaultOpen = true,
  children
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border rounded-lg bg-card overflow-hidden shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-card hover:bg-muted/50 transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 text-lg font-semibold text-foreground">
           <span className="w-1 h-5 bg-primary rounded-full" />
           {title}
        </div>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-muted-foreground transition-transform duration-200",
            isOpen ? "rotate-180" : ""
          )}
        />
      </button>

      {isOpen && (
        <div className="divide-y border-t border-border animate-in slide-in-from-top-2 duration-200">
           {children}
        </div>
      )}
    </div>
  );
};
