const _ = require('lodash');
const path = require('path');
const autoprefixer = require('autoprefixer');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'app.[hash].js',
    chunkFilename: '[name].[hash].js',
  },
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.(sc|c)ss$/,
        exclude: /node_modules\/(?!(normalize.css|vuetify))/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              url: false,
              modules: true,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: { plugins: () => [autoprefixer] },
          },
          'sass-loader',
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        test: /\.tsx?$/,
        exclude: /node_modules/,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
            toplevel: true,
            typeofs: false,
          },
          output: {
            comments: false,
          },
          ie8: false,
          keep_fnames: true,
        },
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      DEBUG: false,
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../templates/template.ejs'),
    }),
  ],
};
