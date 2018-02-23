const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    common: './public/js/common.js',
    // home: './public/js/home.js',
    // about: './public/js/about.js'
  },
  output: {
    filename: './public/dist/[name].bundle.js'
    //path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  plugins: [
    new ExtractTextPlugin('./public/dist/style.css'),
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { minimize: true } }
          ]
        }),
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