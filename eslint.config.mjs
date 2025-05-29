import js from '@eslint/js';
import nxPlugin from '@nx/eslint-plugin';
import stylisticPlugin from '@stylistic/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  // 1. Config base ESLint per JS
  js.configs.recommended,
  // 2. Ignora cartelle comuni in tutto il progetto
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/coverage/**',
      '**/*.spec.ts',
      '**/winbox.service.spec.ts'
    ]
  },

  // 3. Config TypeScript - parser + rules per tutti i .ts e .tsx
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.base.json', // usa tsconfig.json nella root
        tsconfigRootDir: new URL('.', import.meta.url),
      },
    },
    rules: {
      '@stylistic/no-extra-semi': 'error',
      'no-extra-semi': 'off',
    },
  },

  // 4. Config JavaScript (file .js e .jsx)
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      '@stylistic/no-extra-semi': 'error',
      'no-extra-semi': 'off',
    },
  },

  // 5. Config CommonJS per file specifici (config, cjs, ecc.)
  {
    files: ['**/*.cjs', '**/*.config.js', '**/cypress.config.ts'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        __dirname: 'readonly',
      },
    },
    rules: {
      'no-undef': 'off', // disabilita no-undef per commonjs
    },
  },

  // 6. Plugin Nx e Stylistic per TS/JS
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {
      '@nx': nxPlugin,
      '@stylistic': stylisticPlugin,
    },
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            { sourceTag: 'type:e2e', onlyDependOnLibsWithTags: ['type:app'] },
            { sourceTag: 'type:app', onlyDependOnLibsWithTags: ['type:feature', 'type:util'] },
            {
              sourceTag: 'type:feature',
              onlyDependOnLibsWithTags: ['type:feature', 'type:data-access', 'type:ui', 'type:util'],
            },
            { sourceTag: 'type:ui', onlyDependOnLibsWithTags: ['type:ui', 'type:util'] },
            { sourceTag: 'type:data-access', onlyDependOnLibsWithTags: ['type:util'] },
            {
              sourceTag: 'platform:angular',
              onlyDependOnLibsWithTags: ['platform:angular', 'platform:web-component', 'platform:any'],
            },
            { sourceTag: 'platform:any', onlyDependOnLibsWithTags: ['platform:any'] },
            {
              sourceTag: 'platform:vue',
              onlyDependOnLibsWithTags: ['platform:vue', 'platform:web-component', 'platform:any'],
            },
            {
              sourceTag: 'platform:web-component',
              onlyDependOnLibsWithTags: ['platform:web-component', 'platform:any'],
            },
            { sourceTag: '*', onlyDependOnLibsWithTags: ['*'] },
          ],
        },
      ],
    },
  }

];
