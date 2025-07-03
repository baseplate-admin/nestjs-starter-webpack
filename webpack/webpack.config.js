const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/main.ts',
  target: 'node',
  mode: 'production',

  externals: [
    nodeExternals({
      allowlist: [/\.node$/], // Bundle .node files instead of externalizing
    }),
  ],

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
        },
      },
      {
        test: /\.node$/,
        use: 'node-loader',
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.js', '.node'],
  },

  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'main.js',
  },

  plugins: [new CleanWebpackPlugin()],
};
