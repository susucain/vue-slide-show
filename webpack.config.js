const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './demo/main.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['env']
        },
        include: path.resolve(__dirname, 'demo')
      },
      {
        test: /\.(?:png|jpg|gif|svg)$/i,
        loader: 'file-loader',
        query: {
          name: 'assets/[name].[ext]'
        },
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: path.resolve(__dirname, 'demo')
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
        include: path.resolve(__dirname, 'demo')
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './demo/index.html',
      inject: 'body'
    })
  ]
};