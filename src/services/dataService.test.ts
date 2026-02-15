import { describe, it, expect } from 'vitest';
import { DataService } from './dataService';
import { Topic, CheatSheetItem } from '../types';

describe('DataService', () => {
  it('should load topics correctly', async () => {
    const topics: Topic[] = await DataService.getTopics();
    expect(topics).toBeDefined();
    expect(topics.length).toBeGreaterThan(0);
    expect(topics[0].id).toBe(1);
    expect(topics[0].title).toBe('Introduction');
  });

  it('should load cheat sheet items correctly', async () => {
    const items: CheatSheetItem[] = await DataService.getCheatSheet();
    expect(items).toBeDefined();
    expect(items.length).toBeGreaterThan(0);
    expect(items[0].title).toBe('Any Character');
    expect(items[0].code).toBe('.');
  });

  it('should get topic by id', async () => {
    const topic = await DataService.getTopicById(1);
    expect(topic).toBeDefined();
    expect(topic?.id).toBe(1);
    expect(topic?.title).toBe('Introduction');
  });

  it('should return undefined for non-existent topic id', async () => {
    const topic = await DataService.getTopicById(9999);
    expect(topic).toBeUndefined();
  });
});