const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    createProxyMiddleware('/system-service', {
      target: 'http://gateway.szmz.zw-dev.com',
      changeOrigin: true,
    }),
  );
};
