module.exports = {
    parser: 'babel-eslint',
    extends: [
        'airbnb',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
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
