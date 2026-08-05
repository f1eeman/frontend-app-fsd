import path from 'node:path'

/** Путь от корня репозитория. */
export const resolveRoot = (...segments) =>
  path.resolve(import.meta.dirname, '..', '..', ...segments)
