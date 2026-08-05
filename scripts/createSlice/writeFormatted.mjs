import { writeFile } from 'node:fs/promises'
import { format, resolveConfig } from 'prettier'

/**
 * Пишет файл, предварительно отформатировав его настройками проекта.
 *
 * Прогон через prettier избавляет шаблоны от ручного переноса строк на 80
 * символов: длинные имена слайсов иначе ломали бы max-len в eslint.
 *
 * Флаг `wx` гарантирует, что существующий файл не будет перезаписан.
 */
export const writeFormatted = async (filePath, source) => {
  const config = await resolveConfig(filePath)
  const formatted = await format(source, { ...config, filepath: filePath })

  await writeFile(filePath, formatted, { flag: 'wx' })

  return filePath
}
