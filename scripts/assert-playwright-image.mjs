/**
 * Сверяет тег playwright-образа с версией playwright в проекте.
 *
 * Образ фиксирует сборку Chromium, а от неё напрямую зависят пиксели эталонов.
 * Если тег и версия разъедутся (обновили playwright и забыли поднять тег или
 * наоборот), CI начнёт падать на дельтах, не связанных с кодом. До этого
 * соответствие держалось только на комментарии в yml.
 *
 * Использование:
 *   node scripts/assert-playwright-image.mjs
 *     Находит все ссылки на mcr.microsoft.com/playwright в .github/workflows
 *     и сверяет каждую с версией playwright. Заодно ловит расхождение между
 *     самими workflow.
 *
 *   node scripts/assert-playwright-image.mjs mcr.microsoft.com/playwright:v1.58.2-noble
 *     Проверяет конкретный образ.
 */

import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

const projectRoot = process.cwd()
const workflowsDirPath = path.resolve(projectRoot, '.github', 'workflows')
const imageRefPattern = /mcr\.microsoft\.com\/playwright:([^\s'"]+)/g

const readInstalledPlaywrightVersion = () => {
  try {
    return require('playwright/package.json').version
  } catch {
    return null
  }
}

const readDeclaredPlaywrightRange = () => {
  const packageJson = JSON.parse(
    fs.readFileSync(path.resolve(projectRoot, 'package.json'), 'utf8'),
  )

  return (
    packageJson.devDependencies?.playwright ??
    packageJson.dependencies?.playwright ??
    null
  )
}

const collectWorkflowImageRefs = () => {
  const refs = []

  for (const fileName of fs.readdirSync(workflowsDirPath)) {
    if (!/\.ya?ml$/.test(fileName)) {
      continue
    }

    const filePath = path.resolve(workflowsDirPath, fileName)
    const content = fs.readFileSync(filePath, 'utf8')

    for (const match of content.matchAll(imageRefPattern)) {
      refs.push({ source: `.github/workflows/${fileName}`, tag: match[1] })
    }
  }

  return refs
}

const parseTagVersion = (tag) => tag.match(/^v(\d+\.\d+\.\d+)/)?.[1] ?? null

const main = () => {
  // Установленная версия точнее диапазона: ловит и дрейф yarn.lock, когда
  // "~1.58.2" разрешился в 1.58.3, а тег остался прежним.
  const installedVersion = readInstalledPlaywrightVersion()
  const declaredRange = readDeclaredPlaywrightRange()
  const projectVersion = installedVersion ?? declaredRange?.replace(/^[~^]/, '')

  if (!projectVersion) {
    console.error(
      '❌ playwright не найден ни в node_modules, ни в package.json',
    )
    process.exit(1)
  }

  const source = installedVersion
    ? 'node_modules/playwright'
    : 'package.json (node_modules не установлены)'

  const explicitRef = process.argv[2]

  const refs = explicitRef
    ? [{ source: 'аргумент', tag: explicitRef.split(':').at(-1) ?? '' }]
    : collectWorkflowImageRefs()

  if (refs.length === 0) {
    console.error(
      `❌ В ${path.relative(projectRoot, workflowsDirPath)} не найдено ни одной ссылки на mcr.microsoft.com/playwright`,
    )
    process.exit(1)
  }

  const problems = []

  for (const ref of refs) {
    const tagVersion = parseTagVersion(ref.tag)

    if (!tagVersion) {
      problems.push(
        `${ref.source}: не удалось разобрать версию из тега "${ref.tag}" (ожидается vX.Y.Z-noble)`,
      )
      continue
    }

    if (tagVersion !== projectVersion) {
      problems.push(
        `${ref.source}: образ ${tagVersion}, а playwright в проекте ${projectVersion}`,
      )
    }
  }

  if (problems.length > 0) {
    console.error(
      [
        '❌ Тег playwright-образа разошёлся с версией playwright в проекте.',
        ...problems.map((problem) => `   ${problem}`),
        '',
        `   Версия playwright взята из ${source}.`,
        '   Образ фиксирует сборку Chromium, от которой зависят пиксели эталонов.',
        '   Что делать: привести тег в .github/workflows/*.yml к версии playwright',
        '   и перегенерировать baseline (yarn test:ui:ok:docker), иначе CI будет',
        '   падать на дельтах, не связанных с кодом.',
      ].join('\n'),
    )
    process.exit(1)
  }

  console.log(
    `✅ playwright-образ совпадает с проектом: ${projectVersion} (${source}), проверено ссылок: ${refs.length}`,
  )
}

main()
