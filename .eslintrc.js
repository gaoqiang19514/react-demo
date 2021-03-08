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
        // 可以在js中使用jsx
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        // 残障人士优化
        'jsx-a11y/click-events-have-key-events': ['off'],
        'jsx-a11y/no-static-element-interactions': ['off'],
        // 避免对styles['title']报错
        'dot-notation': ['off'],
        // 避免强制指定props的默认值
        'react/require-default-props': ['off'],
    },
};
