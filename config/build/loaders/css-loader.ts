import MiniCssExtractPlugin from "mini-css-extract-plugin";

export function buildCssLoader(isDev: boolean) {
  return {
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          esModule: false ,
          modules: {
            auto: (resPath: string) => {
              const isModule = resPath.includes(".module.");
              return isModule;
            },
            localIdentName: isDev
              ? "[path][name]__[local]--[hash:base64:4]"
              : "[hash:base64:8]",
          },
        },
      },
      "sass-loader",
    ],
  };
}
