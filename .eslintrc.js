module.exports = {
  root: true,
  env: {
    browser: true,
  },
  extends: [
    'standard',
    'prettier',
    'prettier/standard',
    'plugin:vue/recommended',
    '@vue/prettier',
    '@vue/typescript',
  ],
  plugins: ['html', 'standard', 'prettier', 'vue'],
  parserOptions: {
    parser: 'typescript-eslint-parser',
    sourceType: 'module',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'vue/component-name-in-template-casing': 'off',
  },
};
