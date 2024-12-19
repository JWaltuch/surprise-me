import {defineConfig} from 'eslint-define-config';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import babelParser from '@babel/eslint-parser';

export default defineConfig([
  // ESLint Recommended Rules
  {
    files: ['**/*.js', '**/*.jsx'], // Apply to all JavaScript and JSX files
    languageOptions: {
      parser: babelParser,
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
      eqeqeq: ['error', 'always'], // Require strict equality (===)
      semi: ['error', 'always'], // Require semicolons at the end of statements
      quotes: ['error', 'single'], // Prefer single quotes for strings
      indent: ['warn', 2], // Use 2 spaces for indentation
    },
  },

  // React Plugin Rules
  {
    files: ['**/*.js', '**/*.jsx'],
    plugins: {
      react: eslintPluginReact, // Provide the React plugin
    },
    rules: {
      'react/prop-types': 'off', // Disable prop-types validation (optional)
      'react/jsx-uses-react': 'off', // Not necessary with React 17+ (automatic JSX transform)
      'react/react-in-jsx-scope': 'off', // Not necessary with React 17+ (automatic JSX transform)
    },
  },

  // Prettier Plugin Rules & Handling Conflicts
  {
    files: ['**/*.js', '**/*.jsx'],
    plugins: {
      prettier: eslintPluginPrettier, // Add the Prettier plugin
    },
    rules: {
      'prettier/prettier': 'error', // Ensure Prettier formatting is followed
    },
  },

  // Disabling conflicting ESLint rules with Prettier
  {
    files: ['**/*.js', '**/*.jsx'],
    rules: {
      'no-trailing-spaces': 'off', // Disable conflicting rules with Prettier
      indent: 'off', // Disable conflicting indentation rules with Prettier
      semi: 'off', // Disable conflicting semicolon rules with Prettier
      quotes: 'off', // Disable conflicting quotes rules with Prettier
    },
  },
]);
