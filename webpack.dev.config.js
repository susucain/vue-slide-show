const path = require('path')
const merge = require( 'webpack-merge' )
const HtmlWebpackPlugin = require( 'html-webpack-plugin' )
const BASE_CONFIG = require( './webpack.config' )

module.exports = merge(BASE_CONFIG, {
  entry: './example/main.js',
  output: {
    path: path.resolve(__dirname, 'example/dist'),
    filename: '[name].bundle.js'
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './example/dist'
  },
  module: {
    loaders: [
      {
        test: /\.(?:png|jpg|gif|svg)$/i,
        loader: 'file-loader',
        query: {
          name: 'assets/[name].[ext]'
        },
        exclude: path.resolve(__dirname, 'node_modules')
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './example/index.html',
      inject: 'body'
    })
  ],
  resolve: {
    alias: { 
      vue: 'vue/dist/vue.js'
    }
  }
});