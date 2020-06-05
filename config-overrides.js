const path = require("path");
const { useBabelRc, override } = require("customize-cra");

function resolve(dir) {
  return path.join(__dirname, ".", dir);
}

function rewriteAlias(config) {
  config.resolve.alias = {
    ...config.resolve.alias,
    "@": resolve("src"),
    "@components": resolve("src/components"),
    "@pages": resolve("src/pages"),
  };
  return config;
}

module.exports = override(useBabelRc(), rewriteAlias);
