const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = (env) => ({
  devtool: "source-map",
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader, // вытянет из js
        "css-loader", // добавит все в js
        "postcss-loader", // добавляет автопрефиксы
      ],
    }, ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
    new OptimizeCssAssetsPlugin(),
  ],
});