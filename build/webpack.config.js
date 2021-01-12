const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./config/index.js')
const webpack = require('webpack')


const type = process.env.NODE_TYPE
const { output } = config[type]

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/ //排除 node_modules 目录
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: `${type}.html`, //打包后的文件名
    }),
    new webpack.DefinePlugin({
      'process.env': require(`../env/${type}.env.js`)
    })
  ]
}