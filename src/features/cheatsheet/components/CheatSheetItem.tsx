import React from 'react';
import { CheatSheetItem as ICheatSheetItem } from '../../../types';

interface CheatSheetItemProps {
  item: ICheatSheetItem;
}

export const CheatSheetItem: React.FC<CheatSheetItemProps> = ({ item }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:items-center p-3 border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <div className="sm:w-1/4 font-medium text-blue-600 dark:text-blue-400 font-mono text-lg">
        {item.code}
      </div>
      <div className="sm:w-1/4 font-semibold text-gray-800 dark:text-gray-200">
        {item.title}
      </div>
      <div className="sm:w-1/2 text-gray-600 dark:text-gray-400 text-sm">
        {item.description}
      </div>
    </div>
  );
};