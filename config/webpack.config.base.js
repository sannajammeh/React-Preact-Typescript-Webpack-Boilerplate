const config = require('./app.config.json');
const path = require('path');

module.exports = {
  entry: path.resolve(process.cwd(), 'src', 'index'),
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    // alias: {
    //   react: 'preact/compat',
    //   'react-dom': 'preact/compat',
    // },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.html/,
        use: ['html-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'assets/images/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        CLIENT_ROUTE: JSON.stringify('no'),
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(process.cwd(), 'public', 'index.html'),
      templateParameters: {
        TITLE: config.title,
      },
    }),
  ],
};
