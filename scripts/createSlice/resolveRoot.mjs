import path from 'node:path'

export const resolveRoot = (...segments) =>
  path.resolve(import.meta.dirname, '..', '..', ...segments)
