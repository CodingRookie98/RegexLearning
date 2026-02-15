import { useState, useEffect } from 'react';
import { Topic } from '../../../types';
import { DataService } from '../../../services/dataService';

export function useTopics() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadTopics = async () => {
      try {
        const data = await DataService.getTopics();
        if (mounted) {
          setTopics(data);
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Unknown error');
          setLoading(false);
        }
      }
    };

    loadTopics();

    return () => {
      mounted = false;
    };
  }, []);

  return { topics, loading, error };
}