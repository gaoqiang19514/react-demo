const path = require("path");
const { override } = require("customize-cra");

module.exports = function override(config, env) {
  const ratio1 = path.resolve(__dirname, "./src/ratio1.scss");
  const ratio2 = path.resolve(__dirname, "./src/ratio2.scss");
  console.log("process", process);

  config.module.rules.push({
    test: /\.scss$/,
    use: [
      {
        loader: "sass-resources-loader",
        options: {
          resources: [ratio2],
        },
      },
    ],
  });

  return config;
};
