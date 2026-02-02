import webpack from "webpack";
import { buildPlugins } from "./build-plugins";
import { buildLoaders } from "./build-loaders";
import { buildResolvers } from "./build-resolvers";
import { buildDevServer } from "./build-devServer";
import type { BuildOptions } from "./types";

export function buildWebpackConfig(
  options: BuildOptions,
): webpack.Configuration {
  const { paths, mode, isDev } = options;

  return {
    mode,
    entry: paths.entry,
    output: {
      filename: "[name].[contenthash].js",
      path: paths.build,
      clean: true,
      assetModuleFilename: "images/[name].[contenthash][ext]",
    },
    devtool: isDev ? "inline-source-map" : undefined,
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    devServer: isDev ? buildDevServer(options) : undefined,
    resolve: buildResolvers(options),
  };
}
