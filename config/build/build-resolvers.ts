import type { ResolveOptions } from 'webpack'
import type { BuildOptions } from './types'

export function buildResolvers(options: BuildOptions): ResolveOptions {
  return {
    extensions: ['.ts', '.js', '.jsx', '.tsx'],
    alias: {
      '@': options.paths.src,
    },
  }
}
