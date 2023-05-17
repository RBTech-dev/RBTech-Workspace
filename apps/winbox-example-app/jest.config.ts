/* eslint-disable */
const esModules = ['winbox', '@angular', '@ngrx'].join('|');
export default {
  displayName: 'winbox-example-app',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
  coverageDirectory: '../../coverage/apps/winbox-example-app',
  transform: {
    '^.+\\.(ts|mjs|js|html)$': 'jest-preset-angular',
    [`(${esModules}).+\\.(js|jsx|mjs)$`]: 'ts-jest',
  },
  transformIgnorePatterns: [`/node_modules/(?!${esModules}/)`],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
