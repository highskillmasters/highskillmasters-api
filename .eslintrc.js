module.exports = {
  plugins: ['jest'],
  extends: 'eslint:recommended',
  env: {
    commonjs: true,
    es2020: true,
    node: true,
    'jest/globals': true
  },
  parserOptions: {
    ecmaVersion: 11
  },
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never']
  }
}
