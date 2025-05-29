import baseConfig from '../../eslint.config.mjs';
import angularPlugin from '@angular-eslint/eslint-plugin';
import angularTemplatePlugin from '@angular-eslint/eslint-plugin-template';
import nxPlugin from '@nx/eslint-plugin';
import tsParser from "@typescript-eslint/parser";
import angularEslint from "@angular-eslint/eslint-plugin";

export default [
  // Include la config base flat importata
  ...baseConfig,

  // Ignora niente (opzionale, se serve)
  {
    ignores: ['!**/*'],
  },

  // Override per file TS
  {
    files: ['*.ts'],
    plugins: {
      '@nx': nxPlugin,
      '@angular-eslint': angularPlugin,
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
    files: ['*.html'],
    plugins: {
      '@nx': nxPlugin,
      '@angular-eslint-template': angularTemplatePlugin,
    },
    rules: {},
  }
];
