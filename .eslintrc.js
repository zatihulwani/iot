module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'quotes':["error","single"],
    'semi':["error","always"],
    'no-multiple-empty-lines': ["error", { "max": 1, "maxEOF": 1 }],
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
