const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: {
          loader: 'ts-loader',
          options: { allowTsInNodeModules: true },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader"
        ],
      },
      {
        test: /\.(png|obj)$/,
        type: 'asset/resource'
      }
    ],
  },
  performance: {
    maxAssetSize: 10000000,
    maxEntrypointSize: 3000000
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    // Fixes the error of multile react versions.
    alias: {
     react: path.resolve('./node_modules/react')
    }
  },
  devServer: {
    historyApiFallback: true,
    static: {
     directory: path.join(__dirname, "/"),
    },
    port: 8080,
    open: true
  },
   plugins: [new HtmlWebpackPlugin({title: 'El Dem Art'}), new Dotenv({systemvars: true})],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js',
    // Cleans the /dist folder before each build
    clean: true,
  }
};