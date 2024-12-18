// eslint.config.js

// Import the necessary plugins and parser
const eslintPluginReact = require('eslint-plugin-react');
const eslintPluginPrettier = require('eslint-plugin-prettier');
const babelParser = require('@babel/eslint-parser');

module.exports = [
  // ESLint Recommended Rules
  {
    languageOptions: {
      parser: babelParser, // Use the Babel parser as an object
      parserOptions: {
        ecmaVersion: 2020, // Allow modern JavaScript syntax (e.g., async/await, modules)
        sourceType: 'module', // Enable ECMAScript modules (ESM)
        ecmaFeatures: {
          jsx: true, // Enable JSX syntax
        },
      },
      globals: {
        process: 'readonly', // Node.js process global
        __dirname: 'readonly', // Node.js dirname global
        window: 'readonly', // Simulate a browser environment
        document: 'readonly', // Simulate a browser environment
      },
    },
    rules: {
      // Basic JS rules
      // 'no-unused-vars': 'warn', // Warn about unused variables
      // 'no-console': 'warn', // Warn about console.log statements
      eqeqeq: ['error', 'always'], // Require strict equality (===)
      // 'no-trailing-spaces': 'error', // Disallow trailing spaces at the end of lines
      semi: ['error', 'always'], // Require semicolons at the end of statements
      quotes: ['error', 'single'], // Prefer single quotes for strings
      indent: ['error', 2], // Use 2 spaces for indentation
    },
  },

  // React Plugin Rules
  {
    languageOptions: {
      parser: babelParser, // Use the Babel parser as an object
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: eslintPluginReact, // Provide the actual React plugin object
    },
    rules: {
      'react/prop-types': 'off', // Disable prop-types validation (optional)
      'react/jsx-uses-react': 'off', // Not necessary with React 17+ (automatic JSX transform)
      'react/react-in-jsx-scope': 'off', // Not necessary with React 17+ (automatic JSX transform)
    },
  },

  // Prettier Plugin Rules
  // {
  //   plugins: {
  //     prettier: eslintPluginPrettier, // Provide the actual Prettier plugin object
  //   },
  //   rules: {
  //     "prettier/prettier": "error", // Ensure Prettier formatting is followed
  //   },
  // },
];
