import { mkdir } from 'node:fs/promises'
import { reduxSliceTemplate } from './reduxSliceTemplate.mjs'
import { schemaTemplate } from './schemaTemplate.mjs'
import { sliceTestTemplate } from './sliceTestTemplate.mjs'
import { resolveRoot } from '../resolveRoot.mjs'
import { writeFormatted } from '../writeFormatted.mjs'

/**
 * model-сегмент: только types и slices. Пустые selectors/services не создаются —
 * git их не отслеживает, а селекторы в проекте живут внутри createSlice.
 */
export const createModel = async ({ layer, sliceName }) => {
  const resolveModelPath = (...segments) =>
    resolveRoot('src', layer, sliceName, 'model', ...segments)

  await mkdir(resolveModelPath('types'), { recursive: true })
  await mkdir(resolveModelPath('slices'), { recursive: true })

  return [
    await writeFormatted(
      resolveModelPath('types', `${sliceName}Schema.ts`),
      schemaTemplate(sliceName),
    ),
    await writeFormatted(
      resolveModelPath('slices', `${sliceName}Slice.ts`),
      reduxSliceTemplate(sliceName),
    ),
    await writeFormatted(
      resolveModelPath('slices', `${sliceName}Slice.test.ts`),
      sliceTestTemplate(sliceName),
    ),
  ]
}
