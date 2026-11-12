import { defineConfig } from 'vitest/config';

// Rules tests need the Firestore emulator: run them with `npm run test:rules`.
export default defineConfig({
  test: {
    include: ['tests/rules/**/*.test.ts'],
    testTimeout: 20_000,
    fileParallelism: false,
  },
});
