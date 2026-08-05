import { mkdir } from 'node:fs/promises'
import { createModel } from './createModel.mjs'
import { createPublicApi } from './createPublicApi.mjs'
import { createUI } from './createUI.mjs'
import { resolveRoot } from '../resolveRoot.mjs'

/**
 * Собирает слайс целиком и возвращает список созданных файлов.
 *
 * Порядок важен только для читаемости вывода: public API пишется последним,
 * когда всё, на что он ссылается, уже существует.
 */
export const createTemplate = async (options) => {
  const { layer, sliceName } = options

  await mkdir(resolveRoot('src', layer, sliceName), { recursive: true })

  const uiFiles = await createUI(options)
  const modelFiles = options.withSlice ? await createModel(options) : []
  const publicApiFile = await createPublicApi(options)

  return [...uiFiles, ...modelFiles, publicApiFile]
}
