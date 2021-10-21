const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const { ModuleFederationPlugin } = require('webpack').container
const packageJSON = require('../package.json')


const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8080/'
  },
  devServer: {
    port: 8080,
    historyApiFallback: true
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container', // name for host not used for anything
      remotes: {
        marketing: 'marketing@http://localhost:8081/remoteEntry.js',
        auth: 'auth@http://localhost:8082/remoteEntry.js',
        dashboard: 'dashboard@http://localhost:8083/remoteEntry.js'
      },
      shared: packageJSON.dependencies
    })
  ]
}

module.exports = merge(commonConfig, devConfig)