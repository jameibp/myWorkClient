/* eslint-disable no-undef */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    indent: 'off',
    'linebreak-style': 0,
    semi: ['error', 'always'],
    'comma-dangle': ['error', 'only-multiline'],
    // 'no-unused-vars': 'off',
  },
};
