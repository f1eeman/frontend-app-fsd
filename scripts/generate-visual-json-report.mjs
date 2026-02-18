import fs from 'node:fs/promises'
import path from 'node:path'
import { PNG } from 'pngjs'

const screenTestsDirPath = path.resolve(process.cwd(), 'screen-tests')
const snapshotsDirPath = path.resolve(screenTestsDirPath, 'snapshots')
const currentDirPath = path.resolve(screenTestsDirPath, 'current')
const diffsDirPath = path.resolve(screenTestsDirPath, 'diffs')
const diffsOnlyDirPath = path.resolve(screenTestsDirPath, 'diffs-only')
const reportExpectedDirPath = path.resolve(
  screenTestsDirPath,
  'report-expected',
)
const reportActualDirPath = path.resolve(screenTestsDirPath, 'report-actual')
const reportDiffDirPath = path.resolve(screenTestsDirPath, 'report-diff')
const reportJsonPath = path.resolve(screenTestsDirPath, 'report.json')

const safeReadDir = async (dirPath) => {
  try {
    return await fs.readdir(dirPath)
  } catch {
    return []
  }
}

const hasFile = async (filePath) => {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

const findFirstFileByPrefix = async (dirPath, prefix) => {
  const files = await safeReadDir(dirPath)
  const match = files.find((fileName) => fileName.startsWith(prefix))
  if (!match) {
    return null
  }
  return match
}

const findPreferredReceivedFileByPrefix = async (dirPath, prefix) => {
  const files = await safeReadDir(dirPath)
  const receivedMatch = files.find(
    (fileName) => fileName.startsWith(prefix) && fileName.includes('-received'),
  )
  if (receivedMatch) {
    return receivedMatch
  }

  const match = files.find((fileName) => fileName.startsWith(prefix))
  if (!match) {
    return null
  }
  return match
}

const readPng = async (filePath) => {
  const buffer = await fs.readFile(filePath)
  return PNG.sync.read(buffer)
}

const writePng = async (filePath, png) => {
  const buffer = PNG.sync.write(png)
  await fs.writeFile(filePath, buffer)
}

const recreateDir = async (dirPath) => {
  await fs.rm(dirPath, { recursive: true, force: true })
  await fs.mkdir(dirPath, { recursive: true })
}

const cropHorizontalPanel = ({ composed, panelWidth, panelStartX }) => {
  const panel = new PNG({ width: panelWidth, height: composed.height })

  for (let y = 0; y < composed.height; y += 1) {
    for (let x = 0; x < panelWidth; x += 1) {
      const sourceX = panelStartX + x

      const srcIndex = (composed.width * y + sourceX) * 4
      const dstIndex = (panelWidth * y + x) * 4

      panel.data[dstIndex] = composed.data[srcIndex]
      panel.data[dstIndex + 1] = composed.data[srcIndex + 1]
      panel.data[dstIndex + 2] = composed.data[srcIndex + 2]
      panel.data[dstIndex + 3] = composed.data[srcIndex + 3]
    }
  }

  return panel
}

const cropVerticalPanel = ({ composed, panelHeight, panelStartY }) => {
  const panel = new PNG({ width: composed.width, height: panelHeight })

  for (let y = 0; y < panelHeight; y += 1) {
    const sourceY = panelStartY + y
    for (let x = 0; x < composed.width; x += 1) {
      const srcIndex = (composed.width * sourceY + x) * 4
      const dstIndex = (composed.width * y + x) * 4

      panel.data[dstIndex] = composed.data[srcIndex]
      panel.data[dstIndex + 1] = composed.data[srcIndex + 1]
      panel.data[dstIndex + 2] = composed.data[srcIndex + 2]
      panel.data[dstIndex + 3] = composed.data[srcIndex + 3]
    }
  }

  return panel
}

const createDiffOnlyFromComposedDiff = async ({
  composedDiffFilePath,
  expectedFilePath,
  receivedFilePath,
  outputFilePath,
}) => {
  const composed = await readPng(composedDiffFilePath)

  const expected = expectedFilePath ? await readPng(expectedFilePath) : null
  const received = receivedFilePath ? await readPng(receivedFilePath) : null

  const hasSameExpectedReceivedSize =
    expected &&
    received &&
    expected.width === received.width &&
    expected.height === received.height

  if (hasSameExpectedReceivedSize && expected) {
    const isHorizontalThreePanel =
      composed.height === expected.height &&
      composed.width === expected.width * 3

    if (isHorizontalThreePanel) {
      const diffOnly = cropHorizontalPanel({
        composed,
        panelWidth: expected.width,
        panelStartX: expected.width,
      })
      await writePng(outputFilePath, diffOnly)
      return
    }

    const isVerticalThreePanel =
      composed.width === expected.width &&
      composed.height === expected.height * 3

    if (isVerticalThreePanel) {
      const diffOnly = cropVerticalPanel({
        composed,
        panelHeight: expected.height,
        panelStartY: expected.height,
      })
      await writePng(outputFilePath, diffOnly)
      return
    }
  }

  const isHorizontalByHeuristic = composed.width % 3 === 0
  if (isHorizontalByHeuristic) {
    const panelWidth = composed.width / 3
    const diffOnly = cropHorizontalPanel({
      composed,
      panelWidth,
      panelStartX: panelWidth,
    })
    await writePng(outputFilePath, diffOnly)
    return
  }

  const isVerticalByHeuristic = composed.height % 3 === 0
  if (isVerticalByHeuristic) {
    const panelHeight = composed.height / 3
    const diffOnly = cropVerticalPanel({
      composed,
      panelHeight,
      panelStartY: panelHeight,
    })
    await writePng(outputFilePath, diffOnly)
    return
  }

  await fs.copyFile(composedDiffFilePath, outputFilePath)
}

const main = async () => {
  await fs.mkdir(diffsOnlyDirPath, { recursive: true })
  await recreateDir(reportExpectedDirPath)
  await recreateDir(reportActualDirPath)
  await recreateDir(reportDiffDirPath)

  const diffFiles = (await safeReadDir(diffsDirPath)).filter((fileName) =>
    fileName.toLowerCase().endsWith('.png'),
  )

  const failedIds = diffFiles
    .map((fileName) => fileName.replace(/\.png$/i, ''))
    .sort((a, b) => a.localeCompare(b))

  const expectedItems = []
  const actualItems = []
  const diffItems = []

  for (const diffId of failedIds) {
    const baseId = diffId.replace(/-diff$/i, '')
    const expectedFileName = await findFirstFileByPrefix(
      snapshotsDirPath,
      baseId,
    )
    const receivedFileName = await findPreferredReceivedFileByPrefix(
      currentDirPath,
      baseId,
    )

    const diffFileName = `${diffId}.png`
    const reportItemFileName = `${baseId}.png`

    if (expectedFileName) {
      const sourceExpectedFilePath = path.resolve(
        snapshotsDirPath,
        expectedFileName,
      )
      const reportExpectedFilePath = path.resolve(
        reportExpectedDirPath,
        reportItemFileName,
      )
      await fs.copyFile(sourceExpectedFilePath, reportExpectedFilePath)
      expectedItems.push(reportItemFileName)
    }

    if (receivedFileName) {
      const sourceReceivedFilePath = path.resolve(
        currentDirPath,
        receivedFileName,
      )
      const reportActualFilePath = path.resolve(
        reportActualDirPath,
        reportItemFileName,
      )
      await fs.copyFile(sourceReceivedFilePath, reportActualFilePath)
      actualItems.push(reportItemFileName)
    }

    const diffExists = await hasFile(path.resolve(diffsDirPath, diffFileName))
    if (diffExists) {
      const composedDiffFilePath = path.resolve(diffsDirPath, diffFileName)
      const diffOnlyFilePath = path.resolve(diffsOnlyDirPath, diffFileName)
      const reportDiffFilePath = path.resolve(
        reportDiffDirPath,
        reportItemFileName,
      )

      const expectedFilePath = expectedFileName
        ? path.resolve(snapshotsDirPath, expectedFileName)
        : null
      const receivedFilePath = receivedFileName
        ? path.resolve(currentDirPath, receivedFileName)
        : null

      await createDiffOnlyFromComposedDiff({
        composedDiffFilePath,
        expectedFilePath,
        receivedFilePath,
        outputFilePath: diffOnlyFilePath,
      })

      await fs.copyFile(diffOnlyFilePath, reportDiffFilePath)

      diffItems.push(reportItemFileName)
    }
  }

  const report = {
    newItems: [],
    deletedItems: [],
    passedItems: [],
    failedItems: diffItems,
    expectedItems,
    actualItems,
    diffItems,
    actualDir: path
      .relative(screenTestsDirPath, reportActualDirPath)
      .replace(/\\/g, '/'),
    expectedDir: path
      .relative(screenTestsDirPath, reportExpectedDirPath)
      .replace(/\\/g, '/'),
    diffDir: path
      .relative(screenTestsDirPath, reportDiffDirPath)
      .replace(/\\/g, '/'),
  }

  await fs.mkdir(screenTestsDirPath, { recursive: true })
  await fs.writeFile(reportJsonPath, JSON.stringify(report, null, 2), 'utf8')

  console.log(
    `✅ Visual report JSON written: ${path.relative(process.cwd(), reportJsonPath)}`,
  )
  console.log(`   Failed items: ${diffItems.length}`)
}

main().catch((error) => {
  console.error('❌ Failed to generate visual report JSON', error)
  process.exit(1)
})
