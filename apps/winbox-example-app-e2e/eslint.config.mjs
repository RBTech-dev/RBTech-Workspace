import baseConfig from '../../eslint.config.mjs';
import cypress from 'eslint-plugin-cypress/flat';
import tsParser from '@typescript-eslint/parser';

export default [
  cypress.configs['recommended'],
  ...baseConfig,

  // Ignora niente (opzionale)
  {
    ignores: ['!**/*', '**/commands.ts'],
  },

  // Override per file Cypress (E2E)
  {
    files: [
      '**/*.cy.ts',
      '**/*.cy.js',
      'cypress/**/*.ts',
      'cypress/**/*.js',
      'apps/**/*-e2e/**/*.ts'
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.eslint.json'],
        tsconfigRootDir: import.meta.dirname
      },
    },
    rules: {
      'cypress/no-assigning-return-values': 'error',
      'cypress/no-unnecessary-waiting': 'warn',
      'cypress/assertion-before-screenshot': 'warn',
    },
  }
];
