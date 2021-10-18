const { merge } = require('webpack-merge')
const { ModuleFederationPlugin } = require('webpack').container
const commonConfig = require('./webpack.common')
const packageJSON = require('../package.json')

const domain = process.env.PROJECT_DOMAIN

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js'
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        marketing: `marketing@${domain}/marketing/remoteEntry.js`, // missing value until AWS setup
      },
      shared: packageJSON.dependencies
    })
  ]
}

module.exports = merge(commonConfig, prodConfig)