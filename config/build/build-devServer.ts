import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'
import type { BuildOptions } from './types'

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
  return {
    port: options.port,
    historyApiFallback: true,
    client: {
      overlay: { errors: true, warnings: false, runtimeErrors: false },
    },
  }
}
