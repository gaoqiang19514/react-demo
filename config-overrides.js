const path = require('path');

module.exports = (config) => {
    return {
        ...config,
        resolve: {
            ...config.resolve,
            alias: {
                ...config.resolve.alias,
                '@': path.resolve(__dirname, 'src'),
            },
        },
    };
};
