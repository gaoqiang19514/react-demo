const path = require('path');

module.exports = (config, env) => {
    console.log('process', process);

    config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, 'src'),
    };

    config.module.rules.push({});

    return config;
};
