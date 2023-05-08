const nxPreset = require('@nrwl/jest/preset');

module.exports = {
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  resolver: '@nrwl/jest/plugins/resolver',
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageReporters: ['html'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|js|html)$': 'jest-preset-angular',
  },
};
