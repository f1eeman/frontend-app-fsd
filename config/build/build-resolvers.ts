import type { ResolveOptions } from "webpack";
import type { BuildOptions } from "./types";

export function buildResolvers(options: BuildOptions): ResolveOptions {
  return {
    extensions: [".ts", ".js", ".jsx", ".tsx", ".vue"],
    preferAbsolute: true,
    modules: [options.paths.src, "node_modules"],
    mainFiles: ["index"],
    alias: {
      "@": options.paths.src,
    },
  };
}
