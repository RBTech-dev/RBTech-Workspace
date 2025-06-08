import baseConfig from '../../eslint.config.mjs';
import angularTemplatePlugin from '@angular-eslint/eslint-plugin-template';
import nxPlugin from '@nx/eslint-plugin';
import cypress from 'eslint-plugin-cypress/flat';
import tsParser from '@typescript-eslint/parser';

export default [
  cypress.configs['recommended'],
  ...baseConfig,
  ...nxPlugin.configs['flat/angular'],
  ...nxPlugin.configs['flat/angular-template'],
  {
    ignores: ['!**/*'],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.eslint.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'rbtech',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'rbtech',
          style: 'kebab-case',
        },
      ],
    },
  },

  // Override per file HTML
  {
    files: ['**/*.html'],
    plugins: {
      '@nx': nxPlugin,
      '@angular-eslint-template': angularTemplatePlugin,
    },
    rules: {},
  },
];
