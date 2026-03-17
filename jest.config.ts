import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.app.json' }],
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
  testMatch: ['<rootDir>/src/**/*.test.(ts|tsx)'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/main.tsx'],
};

export default config;

