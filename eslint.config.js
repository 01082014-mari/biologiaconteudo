import js from '@eslint/js'
import globals from 'globals'

export default [
  { ignores: ['node_modules/**', 'coverage/**', 'biolab/**', 'icons/**', 'illustrations/**'] },
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.serviceworker,
        ...globals.node,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error', 'log'] }],
      'no-var': 'error',
      'prefer-const': 'error',
      eqeqeq: ['error', 'smart'],
    },
  },
  {
    files: ['tests/**/*.js', 'tests/**/*.mjs', 'scripts/**/*.mjs'],
    rules: {
      'no-console': 'off',
    },
  },
]
