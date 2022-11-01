/* eslint-disable */
export default {
  displayName: 'shared-services',
  preset: '../../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../coverage/libs/shared/services',
  // testEnvironment: 'jest-environment-jsdom',

  testEnvironmentOptions: {
    url: 'http://localhost',
  },
};
