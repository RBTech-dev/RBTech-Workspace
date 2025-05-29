import baseConfig from '../../eslint.config.mjs';
import cypressPlugin from 'eslint-plugin-cypress';

export default [
  // Include la config base
  ...baseConfig,

  // Ignora niente (opzionale)
  {
    ignores: ['!**/*'],
  },

  // Override per file TS/JS
  {
    files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
    plugins: {
      cypress: cypressPlugin,
    },
    rules: {
      // Se vuoi, puoi aggiungere qui regole da "plugin:cypress/recommended"
      // Ad esempio (un paio tra quelli comuni):
      'cypress/no-assigning-return-values': 'error',
      'cypress/no-unnecessary-waiting': 'warn',
      'cypress/assertion-before-screenshot': 'warn',
      // ... aggiungi altre regole qui se vuoi
    },
  },
];
