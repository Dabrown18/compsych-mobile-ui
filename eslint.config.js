const tseslint = require('typescript-eslint');
const unusedImports = require('eslint-plugin-unused-imports');

module.exports = tseslint.config(
  { ignores: ['node_modules', 'dist', '**/*.js'] },
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      // Handled by unused-imports plugin instead
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',

      // Not enforced — too strict for a RN component library
      '@typescript-eslint/no-explicit-any': 'off',

      // require() is the correct pattern for RN asset imports (fonts, images)
      '@typescript-eslint/no-require-imports': 'off',

      // Auto-remove unused imports on --fix
      'unused-imports/no-unused-imports': 'error',

      // Error on unused variables/functions; prefix with _ to opt out
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
);
