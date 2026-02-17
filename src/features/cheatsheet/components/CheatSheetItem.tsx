import React, { useMemo } from 'react';
import { CheatSheetItem as ICheatSheetItem } from '../../../types';
import { highlightMatches } from '@/utils/highlightMatches';
import { cn } from '@/lib/utils';

interface CheatSheetItemProps {
  item: ICheatSheetItem;
}

export const CheatSheetItem: React.FC<CheatSheetItemProps> = ({ item }) => {
    const segments = useMemo(() => {
        if (!item.example || !item.code) return [];
        try {
            // Handle potential invalid regex in cheat sheet data safely
            return highlightMatches(item.example, item.code);
        } catch (e) {
            // Fallback if regex is invalid
            return [{ text: item.example, isMatch: false }];
        }
    }, [item.example, item.code]);

  return (
      <div className="flex flex-col md:flex-row gap-4 p-4 hover:bg-muted/40 transition-colors group">
          {/* Code Column */}
          <div className="md:w-1/4 flex-shrink-0">
              <code className="px-2 py-1 bg-primary/10 text-primary rounded font-mono text-sm font-bold border border-primary/10 group-hover:border-primary/20 transition-colors inline-block break-all">
          {item.code}
        </code>
      </div>

          {/* Title & Description Column */}
          <div className="md:w-1/3 flex-shrink-0">
              <div className="font-semibold text-foreground mb-1">{item.title}</div>
              <div className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
              </div>
          </div>

          {/* Example Column */}
          {item.example && (
              <div className="md:w-5/12 text-sm bg-muted/30 p-3 rounded-md font-mono overflow-x-auto whitespace-nowrap">
                  <div className="mb-1 text-xs text-muted-foreground uppercase tracking-wider font-semibold">Example</div>
                  <div>
                      {segments.map((segment, i) => (
                          <span
                              key={i}
                              className={cn(
                                  segment.isMatch
                                      ? "bg-green-200 text-green-800 dark:bg-green-900/50 dark:text-green-300 rounded-[2px]"
                                      : "text-muted-foreground"
                              )}
                          >
                              {segment.text}
                          </span>
                      ))}
                  </div>
              </div>
          )}
    </div>
  );
};