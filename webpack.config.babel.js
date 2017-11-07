const { resolve } =         require('path');
const webpack =             require('webpack');
const ExtractTextPlugin =   require('extract-text-webpack-plugin');
const CopyWebpackPlugin =   require('copy-webpack-plugin');


const APP_SRC_DIR = resolve(__dirname, 'src');
const BUILD_DIR = resolve(__dirname, 'www');

module.exports = {
  devtool: 'source-map',
  entry: {
    bdrclib: APP_SRC_DIR + '/index.jsx'
  },
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
  module : {
    rules : [
      {
        test : /\.js?/,
        include : APP_SRC_DIR,
        use : 'babel-loader',
      },
      {
        test: /\.pcss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader?importLoaders=1!postcss-loader",
        })
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ],      
      } 
    ],
  },
  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new CopyWebpackPlugin([
      /* Adding the css resources that support Onsen UI */
      { from: resolve(__dirname, 'node_modules/onsenui/css'), to: BUILD_DIR+'/css', ignore:['onsen-css-components.css', 'onsen-css-components.min.css', 'preview.html'], flatten:false }, 
      { from: resolve(__dirname, 'onsenui_css_theming_tools/build/css'), to: BUILD_DIR+'/css', ignore:['onsen-css-components.css', 'preview.html'], flatten:false } 
    ]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],
  devServer: {
    contentBase: [
      resolve(__dirname, "www"), 
      resolve(__dirname, "platforms", "browser", "www"),
    ],
    historyApiFallback: true,
    inline: true,
    watchContentBase: true,
  }
};

