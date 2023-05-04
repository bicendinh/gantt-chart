module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'plugin:react/recommended',
        'standard-with-typescript',
        'plugin:react/jsx-runtime'
    ],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json'
    },
    plugins: ['react'],
    rules: {
        '@typescript-eslint/semi': 'off',
        indent: 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/indent': 'off'
    }
};
