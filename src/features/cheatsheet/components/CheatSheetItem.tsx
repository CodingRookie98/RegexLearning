import React from 'react';
import { CheatSheetItem as ICheatSheetItem } from '../../../types';

interface CheatSheetItemProps {
  item: ICheatSheetItem;
}

export const CheatSheetItem: React.FC<CheatSheetItemProps> = ({ item }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors group">
      <div className="sm:w-1/4">
        <code className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded font-mono text-sm font-bold border border-blue-100 dark:border-blue-800/50 group-hover:border-blue-200 dark:group-hover:border-blue-700 transition-colors inline-block">
          {item.code}
        </code>
      </div>
      <div className="sm:w-1/4 font-semibold text-gray-800 dark:text-gray-200">
        {item.title}
      </div>
      <div className="sm:w-1/2 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
        {item.description}
      </div>
    </div>
  );
};