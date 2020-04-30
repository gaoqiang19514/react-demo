// const { createProxyMiddleware } = require("http-proxy-middleware");

// module.exports = function (app) {
//   app.use(
//     "/zhzf",
//     createProxyMiddleware({
//       target: "http://szzhcg.com",
//       changeOrigin: true,
//     })
//   );

//   app.use(
//     "/statistics-service",
//     createProxyMiddleware({
//       target: "http://gateway.zw-dev.com",
//       changeOrigin: true,
//     })
//   );

//   app.use(
//     "/getUsers",
//     createProxyMiddleware({
//       target: "http://localhost:3000",
//       changeOrigin: true,
//     })
//   );
// };
