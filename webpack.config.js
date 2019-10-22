var path = require('path');

module.exports = {
  entry: ['babel-polyfill', './src/client/index.js'],

  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/',
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: ['@babel/react'],
      },

    },
    {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    }],
  },

  devServer: {
    disableHostCheck: true,
    historyApiFallback: true,
  },
};
