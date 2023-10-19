const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require('path');
const fs = require('fs');

// Copy Esri Assets to Dist
const assetDirectory = path.resolve(__dirname, 'node_modules/@arcgis/core/assets');
const destinationAssetDirectory = path.resolve(__dirname, `dist/assets`);
fs.cpSync(assetDirectory, destinationAssetDirectory, {recursive: true});

//Files to be bundled
const jsFilenames = ['mapView'];
const cssFilenames = ['esri'];
const entries = {};
for (const filename of jsFilenames) {
  entries[filename] = path.resolve(__dirname, `src/${filename}.js`);
}
for (const filename of cssFilenames) {
  entries[filename] = path.resolve(__dirname, `src/${filename}.css`);
}

module.exports = {
  entry: entries,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  optimization: {
    minimize: false,
  },
  mode: 'development',
  devtool: false,

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
    ]
  },

  plugins: [
    // Make code easily debuggable in browser
    new webpack.EvalSourceMapDevToolPlugin({}),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],

  devServer: {
    static: [
      {
        directory: path.join(__dirname, 'src'),
      },
      {
        directory: path.join(__dirname, 'dist'),
      }
    ]
  }
};