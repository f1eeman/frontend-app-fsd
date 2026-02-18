import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type { RuleSetRule } from "webpack";

export const buildCssLoader = (isDev: boolean): RuleSetRule => {
  return {
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          esModule: false,
          modules: {
            // Типизируем аргумент resPath как string
            auto: (resPath: string): boolean => {
              return resPath.includes(".module.");
            },
            exportLocalsConvention: 'asIs',
            localIdentName: isDev
              ? "[path][name]__[local]--[hash:base64:4]"
              : "[hash:base64:8]",
          },
        },
      },
      "sass-loader",
    ],
  };
};
