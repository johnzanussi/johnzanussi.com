/* eslint-env node */
module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:astro/recommended',
    ],
    plugins: [
        '@typescript-eslint',
        'unused-imports',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    overrides: [
        {
            files: [
                '*.astro',
            ],
            parser: 'astro-eslint-parser',
            parserOptions: {
                parser: '@typescript-eslint/parser',
                extraFileExtensions: [
                    '.astro',
                ],
            },
        },
    ],
    rules: {
        'linebreak-style': [
            'error',
            'unix',
        ],
        quotes: [
            'error',
            'single',
        ],
        'astro/semi': [
            'error',
            'always',
        ],
        'no-trailing-spaces': [
            'error',
        ],
        'template-curly-spacing': 'off',
    },
};
