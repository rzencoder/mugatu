module.exports = {
    root: true,
    env: {
        node: true,
        es6: true,
    },
    parserOptions: { ecmaVersion: 2020 },
    ignorePatterns: ['node_modules/*', '.next/*', '.out/*', '!.prettierrc.js', 'tsconfig.json'],
    extends: ['eslint:recommended'],
    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx'],
            parser: '@typescript-eslint/parser',
            settings: { react: { version: 'detect' } },
            env: {
                browser: true,
                node: true,
                es6: true,
            },
            extends: [
                'eslint:recommended',
                'plugin:@typescript-eslint/recommended',
                'plugin:react/recommended',
                'plugin:react-hooks/recommended',
                'plugin:jsx-a11y/recommended',
                'prettier/@typescript-eslint',
                'plugin:prettier/recommended',
            ],
            rules: {
                'react/prop-types': 'off',
                'react/react-in-jsx-scope': 'off',
                'jsx-a11y/anchor-is-valid': 'off',
                '@typescript-eslint/no-unused-vars': ['error'],
                'prettier/prettier': ['error', {}, { usePrettierrc: true }],
                "@typescript-eslint/explicit-module-boundary-types": "off",
                '@typescript-eslint/explicit-function-return-type': [
                    'off',
                    {
                        allowExpressions: true,
                        allowConciseArrowFunctionExpressionsStartingWithVoid: true,
                    },
                ],
            },
        },
    ],
}