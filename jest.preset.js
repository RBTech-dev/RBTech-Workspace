const nxPreset = require('@nrwl/jest/preset');
module.exports = {
  ...nxPreset,
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': 'jest-preset-angular',
  },
};
