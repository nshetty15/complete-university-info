const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    common: './public/js/common.js',
    home: './public/js/home.js',
    about: './public/js/about.js'
  },
  devtool: 'inline-source-map',
   plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
    })
   ],
  output: {
    filename: './public/dist/js/[name].bundle.js'
    //path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
  // entry: './public/js/common.js',
  // output: {
  //   filename: './public/dist/js/commons.bundle.js',
  // }
};