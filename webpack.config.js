const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer')
const webpack = require('webpack')

module.exports = {
  entry: ["whatwg-fetch", "./src/index.tsx"],
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "www")
  },
  devtool: "source-map",
  resolve: { extensions: [".ts", ".tsx", ".js", ".json"] },
  module: {
    rules: [
      { 
        test: /\.tsx?$/, 
        use: "awesome-typescript-loader" ,
        exclude: /node_modules/,
      },
      { 
        enforce: "pre", 
        test: /\.js$/, 
        use: "source-map-loader" ,
        exclude: /node_modules/
      },
      {
        test: /\.pcss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader!postcss-loader",
        }),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader",
        }),
      },
      { test: /\.(eot|svg|ttf|woff|woff2)$/, loader: 'file-loader' }]
  },
  plugins: [
    new ExtractTextPlugin("bundle.css"),
  ],
  devServer: {
    contentBase: [
      path.join(__dirname, "www"), 
      path.join(__dirname, "platforms", "browser", "www"),
    ],
    historyApiFallback: true,
    inline: true,
    watchContentBase: true,
  }
};