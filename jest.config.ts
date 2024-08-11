import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/__tests__/setupTests.ts'],
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/coverage',
    '<rootDir>/dist',
    '<rootDir>/__tests__/setupTests.ts',
  ],
  transformIgnorePatterns: ['node_modules/(?!(mui-tel-input)/)'],
};

const exportConfig = async () => ({
  ...(await createJestConfig(customJestConfig)()),
});

export default exportConfig;
