import React from 'react';
import { CheatSheetItem as ICheatSheetItem } from '../../../types';

interface CheatSheetItemProps {
  item: ICheatSheetItem;
}

export const CheatSheetItem: React.FC<CheatSheetItemProps> = ({ item }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:items-center p-4 hover:bg-muted/40 transition-colors group">
      <div className="sm:w-1/4">
        <code className="px-2 py-1 bg-primary/10 text-primary rounded font-mono text-sm font-bold border border-primary/10 group-hover:border-primary/20 transition-colors inline-block">
          {item.code}
        </code>
      </div>
      <div className="sm:w-1/4 font-semibold text-foreground">
        {item.title}
      </div>
      <div className="sm:w-1/2 text-muted-foreground text-sm leading-relaxed">
        {item.description}
      </div>
    </div>
  );
};