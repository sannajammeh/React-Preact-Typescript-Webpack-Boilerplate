const webpack = require('webpack');
const baseConfig = require('./webpack.config.base');
const webpackMerge = require('webpack-merge');

module.exports = webpackMerge.smart(baseConfig, {
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    port: 8888,
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.s(a|c)ss$/,
        exclude: /style/,
        use: [
          'style-loader',
          'css-modules-typescript-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]-[hash:base64:5]',
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.s(a|c)ss$/,
        include: /style/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
  plugins: [new webpack.WatchIgnorePlugin(/s(a|c)ss$\.d\.ts$/)],
});
