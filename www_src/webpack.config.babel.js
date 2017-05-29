const { resolve } =         require('path');
const webpack =             require('webpack');
const ExtractTextPlugin =   require('extract-text-webpack-plugin');
const CopyWebpackPlugin =   require('copy-webpack-plugin');


const STATIC_SRC_DIR = resolve(__dirname, 'src/static');
const APP_SRC_DIR = resolve(__dirname, 'src/app');
const BUILD_DIR = resolve(__dirname, '../www');

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    admin: APP_SRC_DIR + '/index.jsx'
  },
  output: {
    path: BUILD_DIR,
    filename: 'bundle/[name].bundle.js',
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
    new ExtractTextPlugin('css/[name].bundle.css'),
    new CopyWebpackPlugin([
      { from: STATIC_SRC_DIR, to: BUILD_DIR },
      /* Adding the css resources that support Onsen UI */
      { from: resolve(__dirname, 'node_modules/onsenui/css'), to: BUILD_DIR+'/css', ignore:['onsen-css-components.css', 'onsen-css-components.min.css', 'preview.html'], flatten:false }, 
      { from: resolve(__dirname, 'onsenui_css_theming_tools/build/css'), to: BUILD_DIR+'/css', ignore:['onsen-css-components.css', 'preview.html'], flatten:false } 

      /*,
      { from: resolve(__dirname, 'node_modules/onsenui/css/onsenui.css'), to: BUILD_DIR+ },
      { from: resolve(__dirname, 'node_modules/onsenui/css/onsen-css-components.min.css'), to: BUILD_DIR },
      { from: resolve(__dirname, 'node_modules/onsenui/css/material-design-iconic-font'), to: BUILD_DIR },
      { from: resolve(__dirname, 'node_modules/onsenui/css/ionicons'), to: BUILD_DIR+'/css/ionicons' },
      { from: resolve(__dirname, 'node_modules/onsenui/css/font_awesome'), to: BUILD_DIR+'/css/font_awesome' },
      */
    ]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
};

