import js from '@eslint/js';
import globals from 'globals';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import unusedImports from 'eslint-plugin-unused-imports';
import astroParser from 'astro-eslint-parser';
import astroPlugin from 'eslint-plugin-astro';

// Shared base configuration
const baseConfig = {
    ignores: ['dist/**', 'node_modules/**'],
    plugins: {
        '@typescript-eslint': tsPlugin,
        'unused-imports': unusedImports,
        'astro': astroPlugin,
    },
    rules: {
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/ban-ts-comment': 'warn',
        '@typescript-eslint/triple-slash-reference': 'off',
        'no-unused-vars': 'off',
        'linebreak-style': ['error', 'unix'],
        'quotes': ['error', 'single'],
        'no-trailing-spaces': 'error',
    },
};

export default [
    // JavaScript/TypeScript configuration
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        ...baseConfig,
        linterOptions: {
            reportUnusedDisableDirectives: true,
        },
        languageOptions: {
            globals: {
                ...globals.browser,
            },
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
        },
    },

    // Astro configuration
    {
        files: ['**/*.astro'],
        ...baseConfig,
        languageOptions: {
            parser: astroParser,
            parserOptions: {
                parser: tsParser,
                extraFileExtensions: ['.astro'],
            },
        },
        rules: {
            ...baseConfig.rules,
            'astro/semi': ['error', 'always'],
        },
    },
];
