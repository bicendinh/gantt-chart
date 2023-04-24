module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ['plugin:react/recommended', 'standard-with-typescript'],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json'
    },
    multiline: {
        delimiter: 'semi',
        requireLast: true
    },
    singleline: {
        delimiter: 'semi',
        requireLast: true
    },
    plugins: ['react'],
    rules: {
        '@typescript-eslint/semi': 'off',
        indent: 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/indent': 'off'
    }
};
