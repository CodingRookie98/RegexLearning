import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DataService } from '../../services/dataService';
import { CheatSheetItem as ICheatSheetItem } from '../../types';
import { CheatSheetItem } from './components/CheatSheetItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
      <div className="h-full w-full overflow-y-auto p-6 bg-background">
      <div className="max-w-4xl mx-auto pb-10">
              <h2 className="mb-8">{t('cheatsheet.title')}</h2>

              <div className="flex flex-col gap-6">
          {Object.entries(groupedItems).map(([category, categoryItems]) => (
              <Card key={category}>
                  <CardHeader className="bg-muted/40 py-4 border-b">
                      <CardTitle className="flex items-center gap-2 text-lg">
                          <span className="w-1 h-5 bg-primary rounded-full" />
                  {category}
                      </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                      <div className="divide-y">
                          {categoryItems.map((item, index) => (
                              <CheatSheetItem key={index} item={item} />
                          ))}
                      </div>
                  </CardContent>
              </Card>
          ))}
        </div>
      </div>
    </div>
  );
};