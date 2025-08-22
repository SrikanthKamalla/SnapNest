import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist', 'build', 'node_modules']),
  {
    files: ['**/*.{js,jsx}'],
    ignores: ['dist', 'build', 'node_modules'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      configPrettier, // ⬅ disables ESLint rules conflicting with Prettier
    ],
    plugins: {
      prettier, // ⬅ adds Prettier plugin
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'prettier/prettier': 'error', // ⬅ Prettier runs inside ESLint
    },
  },
]);
