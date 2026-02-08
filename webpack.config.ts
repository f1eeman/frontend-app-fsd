import path from 'node:path'
import { buildWebpackConfig } from './config/build/build-webpackConfig'
import type webpack from 'webpack'
import type { BuildEnv, BuildPaths } from './config/build/types'

export default (env: BuildEnv): webpack.Configuration => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    build: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    src: path.resolve(__dirname, 'src'),
  }

  const mode = env.mode ?? 'development'
  const analyze = env.analyze ?? 'disabled'
  const port = env.port ?? 3000

  const isDev = mode === 'development'
  const isAnalyzeModeEnable = analyze === 'enabled'

  return buildWebpackConfig({
    mode,
    paths,
    isDev,
    port,
    isAnalyzeModeEnable,
  })
}
