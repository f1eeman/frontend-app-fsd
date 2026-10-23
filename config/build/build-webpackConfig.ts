import { buildDevServer } from './build-devServer'
import { buildLoaders } from './build-loaders'
import { buildPlugins } from './build-plugins'
import { buildResolvers } from './build-resolvers'
import type webpack from 'webpack'
import type { BuildOptions } from './types'

export function buildWebpackConfig(
  options: BuildOptions,
): webpack.Configuration {
  const { paths, mode, isDev } = options

  return {
    mode,
    entry: paths.entry,
    output: {
      filename: isDev ? '[name].js' : '[name].[contenthash].js',
      chunkFilename: isDev
        ? '[name].chunk.js'
        : '[name].[contenthash].chunk.js',
      path: paths.build,
      publicPath: '/',
      clean: true,
      assetModuleFilename: 'images/[name].[contenthash][ext]',
    },
    devtool: isDev ? 'eval-cheap-module-source-map' : undefined,
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    devServer: isDev ? buildDevServer(options) : undefined,
    resolve: buildResolvers(options),
  }
}
