const webpack = require("webpack");
const merge = require("webpack-merge");

const base = require("./webpack-utils/webpack.base");

module.exports = (env = {}) => {
  if (!env.env || !["dev", "prod"].includes(env.env)) {
    throw new Error("env.env should be one of ['dev', 'prod']");
  }

  const envConfig = require(`./webpack-utils/webpack.${env.env}`);

  return merge(base, envConfig);
};
