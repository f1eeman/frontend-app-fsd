import { existsSync, rmSync } from 'node:fs'
import path from 'node:path'

const cacheDirPath = path.resolve(
  process.cwd(),
  'node_modules',
  '.cache',
  'webpack',
)

if (existsSync(cacheDirPath)) {
  rmSync(cacheDirPath, { recursive: true, force: true })
  console.log(
    `✓ Кэш сборки удалён: ${path.relative(process.cwd(), cacheDirPath)}`,
  )
} else {
  console.log('Кэша сборки нет, удалять нечего')
}
