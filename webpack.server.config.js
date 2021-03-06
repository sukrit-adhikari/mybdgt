const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: {
    // server : ["webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000","./src/server/server.js"]
    server: './src/server/server.js',
  },
  watchOptions: {
    ignored: ['./src/js/']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  // plugins: [new webpack.HotModuleReplacementPlugin()],
  target: 'node',
//   node: {
//     // Need this when working with express, otherwise the build fails
//     __dirname: false,   // if you don't put this is, __dirname
//     __filename: false,  // and __filename return blank or /
//   },
  externals: [nodeExternals()], // Need this to avoid error when working with Express
  module: {
    rules: [
      {
        // Transpiles ES6-8 into ES5
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
          // options: {
          //   presets: ['@babel/preset-env']
          // }
        }
      }
    ]
  }
}