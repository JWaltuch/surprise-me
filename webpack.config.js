const webpack = require('webpack');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  mode: isDev ? 'development' : 'production',
  // plugins: [
  // 	new NodePolyfillPlugin({exclude}),
  // ],
  plugins: [
    // Use IgnorePlugin to explicitly ignore `node:events`
    new webpack.IgnorePlugin({
      resourceRegExp: /^node:(events|stream|util)$/, // Ignore `node:events` import
    }),
  ],
  entry: [
    'core-js/stable', // Include polyfills for ECMAScript features
    'regenerator-runtime/runtime', // Polyfills for async/await
    './client/index.js',
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    fallback: {
      buffer: require.resolve('buffer/'),
      process: require.resolve('process/browser'),
      fs: false,
      stream: require.resolve('stream-browserify'),
      url: require.resolve('url/'),
      querystring: require.resolve('querystring-es3'),
      crypto: require.resolve('crypto-browserify'),
      path: require.resolve('path-browserify'),
      assert: require.resolve('assert'),
      tls: require.resolve('tls'),
      vm: require.resolve('vm-browserify'),
      http: require.resolve('stream-http'),
      http2: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      net: require.resolve('net'),
      zlib: require.resolve('browserify-zlib'),
      os: require.resolve('os-browserify/browser'),
      child_process: false,
    },
  },
  devtool: 'source-map',
  watchOptions: {
    ignored: /node_modules/,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};
