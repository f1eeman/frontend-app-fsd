import { writeFile } from 'node:fs/promises'
import { format, resolveConfig } from 'prettier'

export const writeFormatted = async (filePath, source) => {
  const config = await resolveConfig(filePath)
  const formatted = await format(source, { ...config, filepath: filePath })

  await writeFile(filePath, formatted, { flag: 'wx' })

  return filePath
}
