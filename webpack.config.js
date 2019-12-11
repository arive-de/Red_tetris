var path = require('path');

module.exports = {
  entry: ['babel-polyfill', './src/client/index.js'],

  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: ['@babel/react', '@babel/env'],
      },

    },
    {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    },
    {
      test: /\.gif$/,
      use: ['file-loader'],
    }],
  },

  devServer: {
    disableHostCheck: true,
    historyApiFallback: true,
  },
};
