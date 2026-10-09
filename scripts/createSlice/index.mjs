import { access } from 'node:fs/promises'
import path from 'node:path'
import { resolveRoot } from './resolveRoot.mjs'
import { createTemplate } from './templates/createTemplate.mjs'

const LAYERS = ['features', 'entities', 'pages', 'widgets']
const FLAGS = ['--with-slice', '--async']
const SLICE_NAME_PATTERN = /^[a-z][a-zA-Z0-9]*$/

const toCamelCase = (value) =>
  value
    .replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''))
    .replace(/^./, (char) => char.toLowerCase())

const exists = async (filePath) => {
  try {
    await access(filePath)
    return true
  } catch {
    return false
  }
}

const parseArgs = (argv) => {
  const [layer, sliceName, ...rest] = argv

  if (!LAYERS.includes(layer)) {
    throw new Error(`Укажите слой: ${LAYERS.join(' | ')}`)
  }

  if (!sliceName) {
    throw new Error('Укажите имя слайса в camelCase, например articleForm')
  }

  if (!SLICE_NAME_PATTERN.test(sliceName)) {
    throw new Error(
      `Имя слайса должно быть в camelCase: ${sliceName} → ${toCamelCase(sliceName)}`,
    )
  }

  const unknownFlags = rest.filter((flag) => !FLAGS.includes(flag))

  if (unknownFlags.length > 0) {
    throw new Error(
      `Неизвестные флаги: ${unknownFlags.join(', ')}. Доступные: ${FLAGS.join(', ')}`,
    )
  }

  return {
    layer,
    sliceName,
    withSlice: rest.includes('--with-slice'),
    withAsync: rest.includes('--async') || layer === 'pages',
  }
}

const main = async () => {
  const options = parseArgs(process.argv.slice(2))
  const sliceRoot = resolveRoot('src', options.layer, options.sliceName)

  if (await exists(sliceRoot)) {
    throw new Error(
      `Слайс src/${options.layer}/${options.sliceName} уже существует — ничего не создано`,
    )
  }

  const created = await createTemplate(options)

  console.log(`✓ Создан слайс src/${options.layer}/${options.sliceName}`)

  for (const filePath of created) {
    console.log(
      `  ${path.relative(resolveRoot(), filePath).replace(/\\/g, '/')}`,
    )
  }

  if (options.withSlice) {
    console.log(
      '\nРедьюсер подключается сам через injectInto — src/app/store править не нужно',
    )
  }

  console.log(
    'Новые стори добавляют скриншотные эталоны: yarn test:ui:ok:docker',
  )
}

main().catch((error) => {
  console.error(`✗ ${error.message}`)
  process.exitCode = 1
})
