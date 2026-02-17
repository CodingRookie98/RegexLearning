import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DataService } from '../../services/dataService';
import { CheatSheetItem as ICheatSheetItem } from '../../types';
import { CheatSheetItem } from './components/CheatSheetItem';
import { CategorySection } from './components/CategorySection';

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

    if (loading) return <div className="flex items-center justify-center h-full text-muted-foreground">{t('common.loading')}</div>;

  return (
      <div className="h-full w-full overflow-y-auto p-6 bg-background custom-scrollbar">
      <div className="max-w-4xl mx-auto pb-10">
              <h2 className="mb-8 text-3xl font-bold tracking-tight">{t('cheatsheet.title')}</h2>

              <div className="flex flex-col gap-6">
          {Object.entries(groupedItems).map(([category, categoryItems]) => (
              <CategorySection
                  key={category}
                  title={t(`cheatsheet.categories.${category}`, category)}
              >
                  {categoryItems.map((item, index) => (
                      <CheatSheetItem key={index} item={item} />
                  ))}
              </CategorySection>
          ))}
        </div>
      </div>
    </div>
  );
};