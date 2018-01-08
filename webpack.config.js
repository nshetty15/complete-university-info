const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('./public/styles/site.css');

module.exports = {
  entry: {
    // common: './public/js/common.js',
    home: './public/js/home.js',
    // about: './public/js/about.js'
  },
  output: {
    filename: './public/dist/js/[name].bundle.js'
    //path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  plugins: [
    extractCSS,
    new webpack.optimize.UglifyJsPlugin(),
    //  new UglifyJSPlugin({
    //    sourceMap: true
    //  }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        // use: [{ loader: "style-loader" }, { loader: "css-loader" }] // loaders are applied from right to left
        use: extractCSS.extract(['css-loader?minimize'])
      },
      {
        test: /\.js?$/,
        use: {
          loader: 'babel-loader', options: {
            presets:
              ['babel-preset-env']
          }
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
};