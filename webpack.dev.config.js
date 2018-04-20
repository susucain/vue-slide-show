const path = require('path')
const webpack = require('webpack')
const merge = require( 'webpack-merge' )
const HtmlWebpackPlugin = require( 'html-webpack-plugin' )
const BASE_CONFIG = require( './webpack.config' )

module.exports = merge(BASE_CONFIG, {
  entry: './example/main.js',
  output: {
    path: path.resolve(__dirname, 'example/dist'),
    filename: '[name].bundle.js'
  },
  devtool: '#cheap-module-eval-source-map',
  devServer: {
    hot: true,
    overlay: {
      warnings: true,
      errors: true
    }
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
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  // 独立构建
  resolve: {
    alias: { 
      vue: 'vue/dist/vue.js'
    }
  }
});