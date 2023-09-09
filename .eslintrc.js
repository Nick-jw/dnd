module.exports = {
    extends: [
      'airbnb-typescript',
      'airbnb/hooks',
      'plugin:@typescript-eslint/recommended',
      'plugin:jest/recommended',
      'plugin:prettier/recommended'
    ],
    plugins: ['react', '@typescript-eslint', 'jest'],
    env: {
      browser: true,
      es6: true,
      jest: true,
    },
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2018,
      sourceType: 'module',
      project: './tsconfig.json',
    },
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/camelcase': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/button-has-type': 'off',
      'linebreak-style': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      'react/no-unescaped-entities': 'off',
      'prefer-destructuring': 'off',
      'lines-between-class-members': 'off',
      'no-plusplus': 'off',
      'no-restricted-syntax': 'off',
      'react/no-array-index-key': 'off',
      '@typescript-eslint/typedef': ['warn', {
        "arrowParameter": false,
        "variableDeclaration": false,
        "variableDeclarationIgnoreFunction": true,
        "parameter": true,
        "propertyDeclaration": true,
        "memberVariableDeclaration": true,
      }],
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
    },
  };