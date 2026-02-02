import path from "node:path";
import webpack from "webpack";
import { buildWebpackConfig } from "./config/build/build-webpackConfig";
import type { BuildEnv, BuildPaths } from "./config/build/types";

export default (env: BuildEnv): webpack.Configuration => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, "src", "index.ts"),
    build: path.resolve(__dirname, "build"),
    html: path.resolve(__dirname, "public", "index.html"),
    src: path.resolve(__dirname, "src"),
  };

  const mode = env.mode ?? "development";
  const analyze = env.analyze ?? "disabled";
  const PORT = env.port ?? 3000;

  const isDev = mode === "development";
  const isAnalyzeModeEnable = analyze === "enabled";

  return buildWebpackConfig({
    mode,
    paths,
    isDev,
    port: PORT,
    isAnalyzeModeEnable,
  });
};
