const path = require("path");
const { override } = require("customize-cra");

module.exports = function override(config, env) {
  const sassFilePath = path.resolve(
    __dirname,
    `./src/ratio${process.env.npm_config_PAGE_RATIO}.scss`
  );

  // if (!isValidFilePath(sassFilePath)) {
  //   throw new Error("文件路径不存在");
  // }

  config.module.rules.push({
    test: /\.scss$/,
    use: [
      {
        loader: "sass-resources-loader",
        options: {
          resources: [sassFilePath],
        },
      },
    ],
  });

  return config;
};
