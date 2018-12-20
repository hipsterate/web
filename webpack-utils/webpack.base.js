const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "../src/main.ts"),
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "tslint-loader"
      },
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        exclude: /node_modules|vue\/src/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true,
          isolatedModules: true
        }
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: "vue-loader",
        options: {
          loaders: {
            ts: "awesome-typescript-loader!tslint-loader"
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "../src/"),
      vue$: "vue/dist/vue.esm.js"
    },
    extensions: [".ts", ".tsx", ".js", ".vue"]
  },
  plugins: [
    new CleanWebpackPlugin(["../dist"], {
      allowExternal: true
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ForkTsCheckerWebpackPlugin({
      reportFiles: ["src/**/*.{ts,tsx}"],
      watch: ["src/**/*.{ts,tsx}"]
    })
  ]
};
