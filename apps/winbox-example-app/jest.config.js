/* eslint-disable */
const esModules = [
  'winbox',
  '@angular',
  '@ngrx',
  '@ng-bootstrap/ng-bootstrap',
  '@fortawesome/angular-fontawesome',
].join('|');
module.exports = {
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
  transformIgnorePatterns: [`/node_modules/(?!${esModules}/)`],
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': 'jest-preset-angular',
  },
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
