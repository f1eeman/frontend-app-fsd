import webpack from "webpack";
import HTMLWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import type { BuildOptions } from "./types";

export function buildPlugins({
  paths,
  isDev,
  isAnalyzeModeEnable,
}: BuildOptions): webpack.WebpackPluginInstance[] {
  const plugins: webpack.WebpackPluginInstance[] = [
    new HTMLWebpackPlugin({
      template: paths.html,
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/[name].[contenthash:8].css",
    }),
    new webpack.ProgressPlugin(),
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
    }),
  ];

  if (isAnalyzeModeEnable) {
    const analyzePlugins: webpack.WebpackPluginInstance[] = [
      new BundleAnalyzerPlugin({
        openAnalyzer: false,
      }),
    ];
    plugins.push(...analyzePlugins);
  }

  return plugins;
}
