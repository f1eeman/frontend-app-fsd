import { buildCssLoader } from './loaders/css-loader'
import { buildSvgLoader } from './loaders/svg-loader'
import type webpack from 'webpack'
import type { BuildOptions } from './types'

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
  const svgLoader = buildSvgLoader()

  const cssLoader = buildCssLoader(isDev)

  const fontsLoader = {
    test: /\.(woff2|woff)$/i,
    type: 'asset/resource',
    generator: {
      filename: 'assets/fonts/[name][ext]',
    },
  }

  const imagesLoader = {
    test: /\.(png|jpe?g|gif)$/i,
    type: 'asset/resource',
    generator: {
      filename: 'assets/img/[name].[hash:8][ext]',
    },
  }

  const babelLoader = {
    test: /\.(js|ts|jsx|tsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        configFile: false,
        presets: [
          '@babel/preset-env',
          '@babel/preset-typescript',
          ['@babel/preset-react', { runtime: 'automatic' }],
        ],
        plugins: [isDev && require.resolve('react-refresh/babel')].filter(
          Boolean,
        ),
      },
    },
  }

  return [cssLoader, svgLoader, fontsLoader, imagesLoader, babelLoader]
}
