module.exports = {
   root: true,
   env: { browser: true, es2020: true },
   extends: [
     'eslint:recommended',
     'plugin:react/recommended',
     'plugin:react/jsx-runtime',
     'plugin:react-hooks/recommended',
   ],
   ignorePatterns: ['dist', '.eslintrc.cjs'],
   parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
   settings: { react: { version: '18.2' } },
   plugins: ['react-refresh'],
   rules: {
     'react/jsx-no-target-blank': 'off',
     'react-refresh/only-export-components': [
       'warn',
       { allowConstantExport: true },
     ],
     'react/prop-types':'off',
     //Common
     'no-useless-catch': 0,
     'no-lonely-if': 0,
     'no-console': 1,
     'no-extra-boolean-cast': 0,
     'no-unused-vars': 1,
     'no-trailing-spaces': 0,
     'no-multi-spaces': 1,
     'no-multiple-empty-lines': 0,
     'space-before-blocks': ['error', 'always'],
     'object-curly-spacing': [1, 'always'],
     'indent': ['warn', 'tab'],
     'semi': [1, 'never'],
     'quotes': ['error', 'single'],
     'array-bracket-spacing': 1,
     'linebreak-style': 0,
     'no-unexpected-multiline': 'warn',
     'keyword-spacing': 1,
     'comma-dangle': 1,
     'comma-spacing': 1,
     'arrow-spacing': 1
   },
 }
 