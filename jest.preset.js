const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset,
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': 'jest-preset-angular',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!.*\\.mjs$)'],
};
