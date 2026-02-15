import React, { useState, useEffect, useMemo } from 'react';
import { DataService } from '../../services/dataService';
import { CheatSheetItem as ICheatSheetItem } from '../../types';
import { CheatSheetItem } from './components/CheatSheetItem';

export const CheatSheetPage: React.FC = () => {
  const [items, setItems] = useState<ICheatSheetItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    DataService.getCheatSheet().then(data => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  const groupedItems = useMemo(() => {
    const groups: Record<string, ICheatSheetItem[]> = {};
    items.forEach(item => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    });
    return groups;
  }, [items]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto h-[calc(100vh-64px)] overflow-y-auto">
      <h2 className="text-3xl font-bold mb-8">Regex Cheat Sheet</h2>
      
      <div className="flex flex-col gap-8">
        {Object.entries(groupedItems).map(([category, categoryItems]) => (
          <div key={category} className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg text-gray-700 dark:text-gray-200">{category}</h3>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {categoryItems.map((item, index) => (
                <CheatSheetItem key={index} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};