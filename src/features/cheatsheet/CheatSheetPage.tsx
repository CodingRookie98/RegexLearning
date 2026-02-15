import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DataService } from '../../services/dataService';
import { CheatSheetItem as ICheatSheetItem } from '../../types';
import { CheatSheetItem } from './components/CheatSheetItem';

export const CheatSheetPage: React.FC = () => {
  const { t } = useTranslation();
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

  if (loading) return <div className="flex items-center justify-center h-full text-gray-500">{t('common.loading')}</div>;

  return (
    <div className="h-full w-full overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto pb-10">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">{t('cheatsheet.title')}</h2>
        
        <div className="flex flex-col gap-8">
          {Object.entries(groupedItems).map(([category, categoryItems]) => (
            <div key={category} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all hover:shadow-md">
              <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200 flex items-center gap-2">
                  <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                  {category}
                </h3>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-gray-700/50">
                {categoryItems.map((item, index) => (
                  <CheatSheetItem key={index} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};