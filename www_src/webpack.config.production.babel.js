const { resolve } =         require('path');
const webpack =             require('webpack');
const ExtractTextPlugin =   require('extract-text-webpack-plugin');
const CopyWebpackPlugin =   require('copy-webpack-plugin');
const CompressionPlugin =   require('compression-webpack-plugin');

const STATIC_SRC_DIR = resolve(__dirname, 'src/static');
const APP_SRC_DIR = resolve(__dirname, 'src/app');
const BUILD_DIR = resolve(__dirname, 'dist');

module.exports = {
  devtool: 'source-map',
  entry: {
    streamdetails: APP_SRC_DIR + '/StreamDetailsPage/page.jsx'
  },
  output: {
    path: BUILD_DIR,
    filename: 'bundle/[name].bundle.js',
    sourceMapFilename:'bundle/[name].bundle.map'
  },
  module : {
    rules : [
      {
        test : /\.jsx?/,
        include : APP_SRC_DIR,
        use : 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader!sass-loader",
        })
      }
    ]
  },  
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        // This has effect on the react lib size
        'NODE_ENV': JSON.stringify('production'),
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap:true,
      compress: {
        unused: true,
        warnings: false, // Suppress uglification warnings
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true
      },
      output: {
        comments: false,
      },
      exclude: [/\.min\.js$/gi] // skip pre-minified libs
    }),
    new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
    }),    
    new ExtractTextPlugin('css/[name].styles.css'),
    new CopyWebpackPlugin([
      { from: STATIC_SRC_DIR, to: BUILD_DIR }
    ]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
};
