export const buildSvgLoader = () => {
  return {
    test: /\.svg$/i,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          svgoConfig: {
            plugins: [
              {
                name: 'preset-default',
                params: { overrides: { removeViewBox: false } },
              },
            ],
          },
        },
      },
    ],
  }
}
