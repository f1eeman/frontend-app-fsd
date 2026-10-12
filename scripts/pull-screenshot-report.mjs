import { spawnSync } from 'node:child_process'
import { rm } from 'node:fs/promises'
import path from 'node:path'

const projectRoot = process.cwd()
const screenTestsDirPath = path.resolve(projectRoot, 'screen-tests')
const artifactName = 'screenshot-diffs'
const trustedEvents = ['push', 'workflow_dispatch']
const tempEntries = [
  'diffs',
  'diffs-only',
  'current',
  'report.html',
  'report.json',
  'report-expected',
  'report-actual',
  'report-diff',
]

const run = (command, args) => {
  const result = spawnSync(command, args, {
    cwd: projectRoot,
    encoding: 'utf8',
  })

  if (result.error) {
    throw new Error(
      `Не удалось запустить ${command}: ${result.error.message}. Установлен ли GitHub CLI (gh)?`,
    )
  }

  if (result.status !== 0) {
    throw new Error(result.stderr.trim() || `${command} завершился с ошибкой`)
  }

  return result.stdout.trim()
}

const findLatestFailedRunId = () => {
  const branch = run('git', ['rev-parse', '--abbrev-ref', 'HEAD'])
  const runs = JSON.parse(
    run('gh', [
      'run',
      'list',
      '--workflow',
      'main.yml',
      '--branch',
      branch,
      '--status',
      'failure',
      '--limit',
      '20',
      '--json',
      'databaseId,headSha,event',
    ]),
  )

  const trustedRun = runs.find(({ event }) => trustedEvents.includes(event))

  if (!trustedRun) {
    throw new Error(
      `Упавших прогонов main.yml на ветке ${branch} от push или workflow_dispatch не найдено`,
    )
  }

  return trustedRun
}

const findRunById = (runId) => {
  if (!/^\d+$/.test(runId)) {
    throw new Error(`Номер прогона должен состоять из цифр: ${runId}`)
  }

  const runInfo = JSON.parse(
    run('gh', ['run', 'view', runId, '--json', 'databaseId,headSha,event']),
  )

  if (!trustedEvents.includes(runInfo.event)) {
    throw new Error(
      `Прогон ${runId} запущен событием ${runInfo.event}. Скачиваются только прогоны от push или workflow_dispatch: артефакты pull request могут быть собраны из чужого кода.`,
    )
  }

  return runInfo
}

const main = async () => {
  const runIdArg = process.argv[2]
  const { databaseId: runId, headSha } = runIdArg
    ? findRunById(runIdArg)
    : findLatestFailedRunId()

  for (const entry of tempEntries) {
    await rm(path.resolve(screenTestsDirPath, entry), {
      recursive: true,
      force: true,
    })
  }

  try {
    run('gh', [
      'run',
      'download',
      String(runId),
      '--name',
      artifactName,
      '--dir',
      screenTestsDirPath,
    ])
  } catch (error) {
    if (error.message.includes('no valid artifacts')) {
      throw new Error(
        `У прогона ${runId} нет артефакта ${artifactName}: снимки не разошлись с эталонами. Смотрите лог прогона — например, упали истории без эталонов.`,
      )
    }
    throw error
  }

  console.log(`✓ Артефакт прогона ${runId} скачан в screen-tests/`)
  console.log('  Отчёт: screen-tests/report.html')

  const localSha = run('git', ['rev-parse', 'HEAD'])

  if (headSha && headSha !== localSha) {
    console.log(
      `\n⚠ Прогон собран на коммите ${headSha.slice(0, 7)}, у вас ${localSha.slice(0, 7)}.`,
    )
    console.log(
      '  Отчёт верный, но эталоны в screen-tests/snapshots могут отличаться от тех, что видел CI.',
    )
  }
}

main().catch((error) => {
  console.error(`✗ ${error.message}`)
  process.exitCode = 1
})
