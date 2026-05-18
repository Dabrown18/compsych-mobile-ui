module.exports = {
  preset: 'jest-expo',
  testMatch: ['**/src/**/*.test.tsx', '**/src/**/*.test.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/showcase/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '\\.(ttf|otf|woff|woff2|eot)$': '<rootDir>/__mocks__/fileMock.js',
  },
};
