const nxPreset = require('@nrwl/jest/preset');
const esModules = [
  'lodash-es',
  '@fortawesome/angular-fontawesome',
  '.*\\.mjs$',
].join('|');

module.exports = {
  ...nxPreset,
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
  transformIgnorePatterns: [`/node_modules/(?!${esModules}/)`],
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': 'jest-preset-angular',
  },
};
