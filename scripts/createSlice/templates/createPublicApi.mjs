import { firstCharUpperCase } from '../firstCharUpperCase.mjs'
import { resolveRoot } from '../resolveRoot.mjs'
import { writeFormatted } from '../writeFormatted.mjs'

/**
 * Public API слайса. Схема идёт первой строкой — так сделано в articleForm и
 * addCommentForm. Асинхронный вариант отдаёт обёртку под именем компонента,
 * чтобы точка входа не зависела от способа загрузки.
 */
export const createPublicApi = async ({
  layer,
  sliceName,
  withSlice,
  withAsync,
}) => {
  const componentName = firstCharUpperCase(sliceName)
  const exports = []

  if (withSlice) {
    exports.push(
      `export type { ${componentName}Schema } from './model/types/${sliceName}Schema'`,
    )
  }

  exports.push(
    withAsync
      ? `export { ${componentName}Async as ${componentName} } from './ui/${sliceName}/${componentName}.async'`
      : `export { ${componentName} } from './ui/${sliceName}/${componentName}'`,
  )

  return writeFormatted(
    resolveRoot('src', layer, sliceName, 'index.ts'),
    `${exports.join('\n')}\n`,
  )
}
