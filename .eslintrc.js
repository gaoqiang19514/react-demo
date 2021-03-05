module.exports = {
    parser: 'babel-eslint',
    extends: [
        'airbnb',
        'plugin:prettier/recommended',
        'plugin:react/recommended',
    ],
    env: {
        browser: true,
        node: true,
        jest: true,
    },
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2021,
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    },
};
