import { afterEach, beforeAll, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

beforeAll(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      text: () => Promise.resolve('mock content'),
    }),
  ) as any;
});

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
