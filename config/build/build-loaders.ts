import { buildCssLoader } from './loaders/css-loader'
import type webpack from 'webpack'
import type { BuildOptions } from './types'

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
  const svgLoader = {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  }

  const cssLoader = buildCssLoader(isDev)

  const tsLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  }

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

  // const babelLoader = {
  //   test: /\.(js|ts|jsx|tsx)$/,
  //   exclude: /node_modules/,
  //   use: {
  //     loader: "babel-loader",
  //     options: {
  //       presets: ["@babel/preset-env"],
  //     },
  //   },
  // };

  return [cssLoader, svgLoader, tsLoader, fontsLoader, imagesLoader]
}
