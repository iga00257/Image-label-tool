module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'standard-with-typescript'],
  overrides: [],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: [
      './tsconfig.json',
      './tsconfig.node.json',
      './tsconfig.eslint.json'
    ]
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off'
  }
}
