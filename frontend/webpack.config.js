const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    static: path.resolve(__dirname, 'public'),
    port: 3000,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'https://crux-backend-nine.vercel.app',
        changeOrigin: true,
        secure: true
      }
    }
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, use: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader','css-loader'] }
    ]
  },
  resolve: { extensions: ['.js', '.jsx'] },
  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve(__dirname,'public','index.html') })
  ]
};
