// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import js from '@eslint/js'
import globals from 'globals'
import eslintReact from 'eslint-plugin-react'
import eslintTS from 'typescript-eslint'
import eslintReactHooks from 'eslint-plugin-react-hooks'
import eslintReactRefresh from 'eslint-plugin-react-refresh'
import eslintConfigPrettier from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import i18next from 'eslint-plugin-i18next'
import storybook from 'eslint-plugin-storybook'

const codeFiles = ['**/*.{js,jsx,ts,tsx}']

export default [
  {
    ignores: ['node_modules', 'dist', 'build', 'public'],
  },
  js.configs.recommended,
  ...eslintTS.configs.recommended,
  eslintReact.configs.flat.recommended,
  eslintReact.configs.flat['jsx-runtime'],
  eslintReactHooks.configs.flat.recommended,
  { ...importPlugin.flatConfigs.recommended, files: codeFiles },
  { ...importPlugin.flatConfigs.typescript, files: codeFiles },
  {
    files: codeFiles,
    ...i18next.configs['flat/recommended'],
    languageOptions: {
      parser: eslintTS.parser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      'react-refresh': eslintReactRefresh,
      i18next: i18next,
    },

    rules: {
      ...i18next.configs['flat/recommended'].rules,
      'i18next/no-literal-string': [
        'error',
        {
          mode: 'jsx-only',
          'jsx-attributes': {
            exclude: [
              'data-testid',
              'theme',
              'size',
              'className',
              'to',
              'target',
              'variant',
              'direction',
            ],
          },

          words: {
            exclude: ['[<>|\\/()&+-]'],
          },
        },
      ],
      'react/prop-types': 'off',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'parent',
            'sibling',
            'internal',
            'index',
            'type',
          ],
          pathGroups: [
            { pattern: '@/**', group: 'internal', position: 'after' },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'never',
          sortTypesGroup: true,
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
            orderImportKind: 'asc',
          },
        },
      ],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^(_|toJS)',
          ignoreRestSiblings: false,
        },
      ],
      'max-lines': 'off',
      'max-len': [
        'error',
        { code: 80, ignoreStrings: true, ignoreTemplateLiterals: true },
      ],
      'max-params': ['error', 9],
      'no-restricted-imports': [
        'error',
        {
          patterns: [{ regex: '^@mui/[^/]+$' }],
        },
      ],
      'no-unused-vars': 'off',
      'no-constant-binary-expression': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/jsx-curly-brace-presence': 'off',
      'react/self-closing-comp': ['error', { component: true, html: true }],
    },
  },
  {
    files: ['**/*.test.tsx'],
    rules: {
      'i18next/no-literal-string': 'off',
    },
  },
  {
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
  },
  ...storybook.configs['flat/recommended'],
  eslintConfigPrettier,
]
