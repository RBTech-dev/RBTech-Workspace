/* eslint-disable */
export default {
  displayName: 'winbox-example-app',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  coverageDirectory: '../../coverage/apps/winbox-example-app',
  transform: {
    '^.+\\.(ts|mjs|js|html)$': 'jest-preset-angular',
    '^.+.(ts|js|html|svg)$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
