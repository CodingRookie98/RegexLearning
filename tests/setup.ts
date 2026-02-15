import '@testing-library/jest-dom';
import { beforeAll, afterEach } from 'vitest';
import { mockIPC, clearMocks } from '@tauri-apps/api/mocks';

// 1. Polyfill window.crypto for Tauri internals (REQUIRED for JSDOM)
beforeAll(() => {
  if (!global.crypto) {
    Object.defineProperty(global, 'crypto', {
      value: {
        getRandomValues: (buffer: Uint8Array) => {
          return require('crypto').randomFillSync(buffer);
        },
      },
    });
  }
});

// 2. Clean up mocks after each test
afterEach(() => {
  clearMocks();
});