/**
 * Гоняет скриншотные тесты в контейнере, идентичном CI.
 *
 * Зачем: локальный прогон под Windows/macOS несравним с CI — DirectWrite и
 * CoreText растеризуют шрифты иначе, чем FreeType в Linux, дельта доходит до
 * 4.6% на текстоёмких стори. Из-за этого эталоны можно было получить только
 * через workflow в Actions, и каждое визуальное изменение требовало ручного
 * прогона двух workflow. В контейнере с тем же образом эта разница исчезает,
 * и baseline коммитится вместе с изменением компонента.
 *
 * Использование:
 *   node scripts/screenshots-docker.mjs            # проверить (как CI)
 *   node scripts/screenshots-docker.mjs --update   # перегенерировать эталоны
 *
 * Флаги для быстрых повторных прогонов:
 *   --skip-install   не переустанавливать зависимости в volume
 *   --skip-build     переиспользовать уже собранный sb-static
 */

import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'

const projectRoot = process.cwd()

const args = process.argv.slice(2)
const isUpdate = args.includes('--update')
const skipInstall = args.includes('--skip-install')
const skipBuild = args.includes('--skip-build')

const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'))

const toPosixPath = (value) => value.replace(/\\/g, '/')

const run = (command, commandArgs) => {
  console.log(`\n$ ${command} ${commandArgs.join(' ')}\n`)

  const result = spawnSync(command, commandArgs, {
    stdio: 'inherit',
    cwd: projectRoot,
  })

  if (result.error) {
    if (result.error.code === 'ENOENT') {
      console.error(
        `\n❌ Не найден исполняемый файл "${command}". Для этого скрипта нужен запущенный Docker.`,
      )
      process.exit(1)
    }
    throw result.error
  }

  return result.status ?? 1
}

const packageJson = readJson(path.resolve(projectRoot, 'package.json'))

const playwrightRange =
  packageJson.devDependencies?.playwright ??
  packageJson.dependencies?.playwright

if (!playwrightRange) {
  console.error('❌ playwright не найден в package.json')
  process.exit(1)
}

// Единственный источник истины — package.json и .nvmrc, поэтому тег образа
// и версия Node здесь не могут разойтись с проектом.
const playwrightVersion = playwrightRange.replace(/^[~^]/, '')
const nodeVersion = fs
  .readFileSync(path.resolve(projectRoot, '.nvmrc'), 'utf8')
  .trim()

const playwrightTag = `v${playwrightVersion}-noble`
const imageName = `${packageJson.name}-screenshots:pw${playwrightVersion}-node${nodeVersion}`

// node_modules обязан быть отдельным volume: в хостовом лежат windows-бинарники
// (@swc/core, esbuild), в Linux они не запустятся. Volume переиспользуется между
// прогонами, поэтому yarn install быстрый со второго раза.
const nodeModulesVolume = `${packageJson.name}-screenshots-node-modules`
const yarnCacheVolume = `${packageJson.name}-screenshots-yarn-cache`

const innerSteps = [
  skipInstall ? null : 'yarn install --frozen-lockfile',
  skipBuild ? null : 'yarn build:sb',
  'node scripts/assert-playwright-image.mjs',
  isUpdate ? 'yarn test:ui:ok:ci' : 'yarn test:ui:ci',
].filter(Boolean)

console.log(
  [
    `Режим:   ${isUpdate ? 'обновление эталонов (--updateSnapshot)' : 'проверка (как в CI)'}`,
    `Образ:   mcr.microsoft.com/playwright:${playwrightTag} + node ${nodeVersion}`,
    `Шаги:    ${innerSteps.join(' && ')}`,
  ].join('\n'),
)

const buildStatus = run('docker', [
  'build',
  '--file',
  'docker/screenshots.Dockerfile',
  '--build-arg',
  `PLAYWRIGHT_TAG=${playwrightTag}`,
  '--build-arg',
  `NODE_VERSION=${nodeVersion}`,
  '--tag',
  imageName,
  'docker',
])

if (buildStatus !== 0) {
  console.error(
    [
      '\n❌ Не удалось собрать образ — смотри ошибку сборки выше.',
      '   Если упало на скачивании: первый запуск тянет ~2.2 ГБ базового образа,',
      '   проверь сеть и место на диске.',
    ].join('\n'),
  )
  process.exit(buildStatus)
}

const runStatus = run('docker', [
  'run',
  '--rm',
  '--init',
  '--volume',
  `${toPosixPath(projectRoot)}:/app`,
  '--volume',
  `${nodeModulesVolume}:/app/node_modules`,
  '--volume',
  `${yarnCacheVolume}:/yarn-cache`,
  '--env',
  'YARN_CACHE_FOLDER=/yarn-cache',
  // Как в GitHub Actions: при CI=true jest не пишет новые снапшоты молча,
  // а падает — поведение должно совпадать с CI.
  '--env',
  'CI=true',
  // Иначе postinstall husky спотыкается на bind-mounted .git (dubious ownership).
  '--env',
  'HUSKY=0',
  '--workdir',
  '/app',
  imageName,
  'bash',
  '-lc',
  innerSteps.join(' && '),
])

if (runStatus === 0) {
  console.log(
    isUpdate
      ? '\n✅ Эталоны перегенерированы в CI-окружении. Проверь `git status` в screen-tests/snapshots и закоммить их вместе с изменением компонента.'
      : '\n✅ Скриншотные тесты прошли в CI-окружении.',
  )
  process.exit(0)
}

console.error(
  isUpdate
    ? '\n❌ Прогон с обновлением эталонов упал — смотри вывод выше.'
    : [
        '\n❌ Скриншотные тесты упали. Это тот же результат, который получит CI.',
        '   Посмотреть различия:  yarn test:ui:report  → screen-tests/report.html',
        '   Если изменения ожидаемые: yarn test:ui:ok:docker',
      ].join('\n'),
)
process.exit(runStatus)
