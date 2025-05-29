/* eslint-disable */
const esModules = ['winbox', '@angular', '@ngrx'].join('|');
const { getJestProjects } = require('@nx/jest');
module.exports = {
  displayName: 'angular-winbox',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  coverageDirectory: '../../coverage/packages/angular-winbox',
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': 'jest-preset-angular',
    '^.+\\.(ts|mjs|html|js)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.spec.json',
      },
    ],
  },
  testEnvironment: 'jsdom',
  resolver: '@nx/jest/plugins/resolver',
  transformIgnorePatterns: [`../../node_modules/(?!${esModules}/)`],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
  extensionsToTreatAsEsm: ['.ts'],
};
