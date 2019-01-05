const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const StyleLintPlugin = require('stylelint-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: path.resolve(__dirname, '../src/main.ts'),
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(ts|vue)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]',
        },
      },
    ],
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, '../src/'),
      vue$: 'vue/dist/vue.esm.js',
    },
    extensions: ['.ts', '.tsx', '.js', '.vue'],
  },
  plugins: [
    new CleanWebpackPlugin(['../dist'], {
      allowExternal: true,
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    // new ForkTsCheckerWebpackPlugin({
    //   reportFiles: ["src/**/*.{ts,tsx,vue}"],
    //   tslint: true,
    //   watch: ["src/**/*.{ts,tsx,vue}"],
    //   vue: true
    // }),
    new VueLoaderPlugin(),
    new StyleLintPlugin({
      files: ['src/**/*.{vue,css,scss}'],
    }),
  ],
};
