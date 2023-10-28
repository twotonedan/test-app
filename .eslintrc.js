module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
      arrowFunctions: true,
    },
  },
  extends: [
    'next',
    'next/core-web-vitals',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'prettier',
    'plugin:storybook/recommended',
    'plugin:storybook/recommended',
    'plugin:prettier/recommended',
    'plugin:react/jsx-runtime',
  ],
  plugins: ['react', '@typescript-eslint', 'prettier'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        paths: ['./src', './scripts'],
      },
    },
  },
  rules: {
    'react/function-component-definition': [
      'error',
      {
        namedComponents: ['function-declaration', 'arrow-function'],
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'no-restricted-exports': 'off',
    'react/no-unstable-nested-components': 'off',
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    'no-param-reassign': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['@emotion/styled/**/*'],
            message: '@emotion/styled imports may not be required. Maybe do you wanted to import from @mui/material?',
          },
          {
            group: ['@mui/system/**/*'],
            message: '@mui/system imports may not be required. Maybe do you wanted to import from @mui/material?',
          },
        ],
        paths: [
          {
            name: 'react-i18next',
            message: 'Please import from next-i18next.',
          },
        ],
      },
    ],
  },
};
