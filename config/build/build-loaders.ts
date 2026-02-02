import webpack from "webpack";
import { buildCssLoader } from "./loaders/css-loader";
import type { BuildOptions } from "./types";

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
  const svgLoader = {
    test: /\.svg$/,
    use: ["@svgr/webpack"],
  };

  const cssLoader = buildCssLoader(isDev);

  const tsLoader = {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  };

  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff2)$/i,
    type: "asset",
  };

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

  return [cssLoader, svgLoader, fileLoader, tsLoader];
}
