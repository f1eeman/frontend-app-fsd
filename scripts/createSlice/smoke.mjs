/**
 * Смоук-проверка генератора слайсов.
 *
 * Зачем: шаблоны отстают от проекта молча. К моменту этой проверки они успели
 * разойтись с кодовой базой на две мажорные версии Storybook и на смену
 * устройства стора, и заметить это было можно только вручную. Скрипт
 * генерирует три варианта слайса прямо в src (иначе не работают алиас @/ и
 * tsconfig.include), прогоняет по ним eslint, stylelint, tsc и jest, затем
 * удаляет сгенерированное. Любое расхождение — падение с кодом 1.
 *
 * Использование:
 *   yarn check:generator
 */

import { spawnSync } from 'node:child_process'
import { rm } from 'node:fs/promises'
import path from 'node:path'
import { resolveRoot } from './resolveRoot.mjs'
import { createTemplate } from './templates/createTemplate.mjs'

const CASES = [
  {
    layer: 'widgets',
    sliceName: 'generatorSmokeWidget',
    withSlice: false,
    withAsync: false,
  },
  {
    layer: 'features',
    sliceName: 'generatorSmokeFeature',
    withSlice: true,
    withAsync: false,
  },
  {
    layer: 'pages',
    sliceName: 'generatorSmokePage',
    withSlice: true,
    withAsync: true,
  },
]

const BINS = {
  eslint: resolveRoot('node_modules', 'eslint', 'bin', 'eslint.js'),
  stylelint: resolveRoot('node_modules', 'stylelint', 'bin', 'stylelint.mjs'),
  tsc: resolveRoot('node_modules', 'typescript', 'bin', 'tsc'),
  jest: resolveRoot('node_modules', 'jest', 'bin', 'jest.js'),
}

const relative = (filePath) =>
  path.relative(resolveRoot(), filePath).replace(/\\/g, '/')

const run = (label, args) => {
  console.log(`\n→ ${label}`)

  const { status } = spawnSync(process.execPath, args, {
    cwd: resolveRoot(),
    stdio: 'inherit',
  })

  if (status === 0) {
    console.log(`✓ ${label}`)
    return true
  }

  console.error(`✗ ${label}`)
  return false
}

const generate = async () => {
  const created = []

  for (const options of CASES) {
    const files = await createTemplate(options)
    created.push(...files)
    console.log(
      `✓ сгенерирован src/${options.layer}/${options.sliceName} (${files.length} файлов)`,
    )
  }

  return created
}

const cleanup = async () => {
  for (const { layer, sliceName } of CASES) {
    await rm(resolveRoot('src', layer, sliceName), {
      recursive: true,
      force: true,
    })
  }
}

const main = async () => {
  // Прогон мог быть прерван на полпути: writeFormatted пишет с флагом wx и
  // упал бы на остатках прошлого запуска
  await cleanup()

  const created = await generate()
  const codeFiles = created.filter((file) => /\.tsx?$/.test(file))
  const styleFiles = created.filter((file) => file.endsWith('.scss'))
  const testFiles = created.filter((file) => file.endsWith('.test.ts'))

  const checks = [
    run('eslint', [BINS.eslint, ...codeFiles.map(relative)]),
    run('stylelint', [BINS.stylelint, ...styleFiles.map(relative)]),
    run('tsc --noEmit', [BINS.tsc, '--noEmit']),
    run('jest', [
      BINS.jest,
      '--config',
      './config/jest/jest.config.ts',
      '--runTestsByPath',
      ...testFiles.map(relative),
    ]),
  ]

  if (checks.includes(false)) {
    throw new Error(
      'Шаблоны генератора расходятся с конвенциями проекта — см. вывод выше',
    )
  }

  console.log('\n✓ Генератор соответствует конвенциям проекта')
}

main()
  .catch((error) => {
    console.error(`\n✗ ${error.message}`)
    process.exitCode = 1
  })
  .finally(cleanup)
