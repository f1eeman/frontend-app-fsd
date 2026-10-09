export const asyncTemplate = (componentName) => `import { lazy } from 'react'
import type { FC } from 'react'
import type { ${componentName}Props } from './${componentName}'

export const ${componentName}Async = lazy<FC<${componentName}Props>>(
  async () =>
    import(/* webpackChunkName: "${componentName}" */ './${componentName}'),
)
`
