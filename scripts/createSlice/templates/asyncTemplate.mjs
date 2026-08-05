/**
 * Ленивая обёртка по образцу src/pages/articlesPage. Пропсы прокидываются в
 * FC, чтобы className не терялся при импорте через public API.
 */
export const asyncTemplate = (componentName) => `import { lazy } from 'react'
import type { FC } from 'react'
import type { ${componentName}Props } from './${componentName}'

export const ${componentName}Async = lazy<FC<${componentName}Props>>(
  async () =>
    import(/* webpackChunkName: "${componentName}" */ './${componentName}'),
)
`
