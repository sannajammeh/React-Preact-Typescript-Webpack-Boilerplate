const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const nextId = incstr.idGenerator({ prefix: 'rs_', suffix: '' });

module.exports = webpackMerge.smart(baseConfig, {
  output: {
    publicPath: './',
    filename: '[contenthash].js',
    chunkFilename: '[contenthash].js',
  },
  devtool: 'eval-cheap-source-map',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.s(a|c)ss$/,
        exclude: /style/,
        use: [
          { loader: MiniCSSExtractPlugin.loader },
          'css-modules-typescript-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[hash:base64]',
                getLocalIdent: () => nextId(),
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true, config: { path: 'postcss.config.js' } },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.s(a|c)ss$/,
        include: /style/,
        use: [
          { loader: MiniCSSExtractPlugin.loader },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: { sourceMap: true, config: { path: 'postcss.config.js' } },
          },
          'sass-loader',
        ],
        sideEffects: true,
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCSSExtractPlugin.loader },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: { sourceMap: true, config: { path: 'postcss.config.js' } },
          },
        ],
        sideEffects: true,
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'assets/images/[hash:base64].[ext]',
            },
          },
        ],
        sideEffects: true,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCSSExtractPlugin(),
    new OptimizeCssAssetsPlugin(),
    new BundleAnalyzerPlugin(),
  ],
  optimization: {
    minimize: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
});
