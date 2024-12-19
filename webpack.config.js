import webpack from 'webpack';
import path from 'path';
// import NodePolyfillPlugin from 'node-polyfill-webpack-plugin'; // Uncomment if using NodePolyfillPlugin
import {fileURLToPath} from 'url'; // This will help with __dirname equivalent in ES modules

const isDev = process.env.NODE_ENV === 'development';

// Ensure we have __dirname available in ES modules context
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  mode: isDev ? 'development' : 'production',
  // plugins: [
  //   new NodePolyfillPlugin({exclude}),
  // ],
  plugins: [
    // Use IgnorePlugin to explicitly ignore `node:events`
    new webpack.IgnorePlugin({
      resourceRegExp: /^node:(events|stream|util)$/, // Ignore `node:events` import
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser.js', // Ensure 'process' is provided
    }),
  ],
  entry: [
    'core-js/stable', // Include polyfills for ECMAScript features
    'regenerator-runtime/runtime', // Polyfills for async/await
    './client/index.js',
  ],
  output: {
    path: path.resolve(__dirname, 'public'), // Using path.resolve(__dirname) for output path
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    fallback: {
      buffer: 'buffer/',
      process: 'process/browser.js',
      fs: false,
      stream: 'stream-browserify',
      url: 'url/', // Polyfill for `URL` in Node.js environments
      querystring: 'querystring-es3',
      crypto: 'crypto-browserify',
      path: 'path-browserify',
      assert: 'assert',
      tls: false,
      vm: 'vm-browserify',
      http: 'stream-http',
      http2: 'stream-http',
      https: 'https-browserify',
      net: 'net',
      zlib: 'browserify-zlib',
      os: 'os-browserify/browser',
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
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // If you're using Babel to transpile ES6+
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  target: 'web', // or 'node16' for Node 16-specific features
};
