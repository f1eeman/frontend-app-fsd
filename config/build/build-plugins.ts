import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import webpack from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import type { BuildOptions } from './types'

export function buildPlugins({
  paths,
  isDev,
  apiUrl,
  isAnalyzeModeEnable,
  project,
}: BuildOptions): webpack.WebpackPluginInstance[] {
  const isProd = !isDev
  const plugins: webpack.WebpackPluginInstance[] = [
    new HTMLWebpackPlugin({
      template: paths.html,
    }),
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
      __API__: JSON.stringify(apiUrl),
      __PROJECT__: JSON.stringify(project),
    }),
  ]

  if (isDev) {
    plugins.push(
      new ReactRefreshWebpackPlugin(),
      new ForkTsCheckerWebpackPlugin(),
      new webpack.ProgressPlugin(),
    )
  }
  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      }),
      new CopyPlugin({
        patterns: [
          { from: paths.locales, to: paths.buildLocales },
          { from: paths.netlifyConfig, to: '' },
        ],
      }),
    )
  }

  if (isAnalyzeModeEnable) {
    const analyzePlugins: webpack.WebpackPluginInstance[] = [
      new BundleAnalyzerPlugin({
        openAnalyzer: false,
      }),
    ]
    plugins.push(...analyzePlugins)
  }

  return plugins
}
