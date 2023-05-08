/* eslint-disable */
const esModules = ['winbox', '@angular', '@ngrx'].join('|');
const { getJestProjects } = require('@nrwl/jest');
export default {
  displayName: 'angular-winbox',
  preset: '../../jest.preset.js',
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  coverageDirectory: '../../coverage/packages/angular-winbox',
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': 'jest-preset-angular',
    [`(${esModules}).+\\.(js|jsx|mjs)$`]: 'babel-jest',
    '^.+.(ts|js|html|svg)$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
  resolver: '@nrwl/jest/plugins/resolver',
  transformIgnorePatterns: [`/node_modules/(?!${esModules}/)`],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
  extensionsToTreatAsEsm: ['.ts'],
};
