const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const { ModuleFederationPlugin } = require('webpack').container
const packageJSON = require('../package.json')


const devConfig = {
  mode: 'development',
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: 'index.html'
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container', // name for host not used for anything
      remotes: {
        marketing: 'marketing@http://localhost:8081/remoteEntry.js',
      },
      shared: packageJSON.dependencies
    })
  ]
}

module.exports = merge(commonConfig, devConfig)