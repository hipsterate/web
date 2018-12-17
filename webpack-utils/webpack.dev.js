const webpack = require("webpack");
const path = require("path");
const autoprefixer = require("autoprefixer");

module.exports = {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "app.bundle.js",
    chunkFilename: "[name].bundle.js",
    publicPath: "/dist/"
  },
  optimization: {
    minimize: false
  },
  watch: true,
  devServer: {
    compress: true,
    historyApiFallback: {
      index: "index.html"
    },
    hot: true,
    noInfo: false,
    port: 8080,
    proxy: [
      {
        context: ["/firebase"],
        target: "https://hipsterate.firebaseio.com",
        secure: false
      }
    ],
    quiet: false
  },
  module: {
    rules: [
      {
        test: /\.(sc|c)ss$/,
        exclude: /node_modules\/(?!(normalize.css))/,
        use: [
          "style-loader",
          { loader: "css-loader", options: { importLoaders: 2 } },
          {
            loader: "postcss-loader",
            options: { plugins: () => [autoprefixer] }
          },
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development",
      DEBUG: true
    })
  ]
};
