const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    resolve: {
        alias: {
            'react-refresh/runtime': path.resolve(__dirname, 'node_modules/react-refresh/runtime.js'),
        },
    },
  plugins: [
    // other plugins
    new ReactRefreshWebpackPlugin(),
  ],
  module: {
    rules: [
      // other rules
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [require.resolve('react-refresh/babel')],
          },
        },
      },
    ],
  },
};
