import baseConfig from '../../eslint.config.mjs';
import angularEslint from '@angular-eslint/eslint-plugin';
import angularEslintTemplate from '@angular-eslint/eslint-plugin-template';
import nxEslint from '@nx/eslint-plugin';

export default [
  ...baseConfig,

  ...nxEslint.configs['flat/angular'],
  ...nxEslint.configs['flat/angular-template'],
  {
    files: ['*.ts'],
    ignores: ['**/winbox.service.spec.ts'],
    plugins: {
      '@nx': nxEslint,
      '@angular-eslint': angularEslint,
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
      '@nx/dependency-checks': 'error',
    },
  },
  {
    files: ['*.html'],
    plugins: {
      '@angular-eslint-template': angularEslintTemplate,
    },
    rules: {},
  }
];
