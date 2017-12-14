const path = require('path');
//const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

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
    })
  //   new HtmlWebpackPlugin({
  //     title: 'Output management'
  //   })
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