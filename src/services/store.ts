import { LazyStore } from '@tauri-apps/plugin-store';

const store = new LazyStore('store.bin');

export const getStore = async <T>(key: string): Promise<T | null | undefined> => {
  return await store.get<T>(key);
};

export const setStore = async <T>(key: string, value: T): Promise<void> => {
  await store.set(key, value);
  await store.save();
};

export const clearStore = async (): Promise<void> => {
  await store.clear();
  await store.save();
};