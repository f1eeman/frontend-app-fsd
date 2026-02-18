import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildCssLoader } from '../build/loaders/css-loader'
import type { StorybookConfig } from '@storybook/react-webpack5'

const currentDir = path.dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  stories: ['../../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
    {
      name: '@storybook/addon-styling-webpack',
      options: {
        rules: [buildCssLoader(true)],
      },
    },
  ],
  framework: '@storybook/react-webpack5',
  webpackFinal: async (config) => {
    const srcPath = path.resolve(currentDir, '../../src')

    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': srcPath,
      }
    }

    return config
  },
}
export default config
