import fs from 'node:fs/promises'
import path from 'node:path'
import { toMatchImageSnapshot } from 'jest-image-snapshot'
import type { TestRunnerConfig } from '@storybook/test-runner'

const PLACEHOLDER_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Z6L66QAAAAASUVORK5CYII=',
  'base64',
)

const isImageRequest = (url: string) =>
  /\.(png|jpe?g|gif|webp|avif)(\?|$)/i.test(url)

const isLocalUrl = (url: string) =>
  /^https?:\/\/(localhost|127\.0\.0\.1)/i.test(url)

const STORY_RENDER_TIMEOUT_MS = 10000

const hasFile = async (filePath: string) => {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

const config: TestRunnerConfig = {
  setup() {
    expect.extend({ toMatchImageSnapshot })
  },
  async preVisit(page) {
    page.setDefaultTimeout(60000)
    page.setDefaultNavigationTimeout(60000)

    await page.route('**/*', (route) => {
      const url = route.request().url()
      if (isImageRequest(url) && !isLocalUrl(url)) {
        return route.fulfill({
          status: 200,
          contentType: 'image/png',
          body: PLACEHOLDER_PNG,
        })
      }
      return route.continue()
    })

    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
          caret-color: transparent !important;
        }
      `,
    })
  },
  async postVisit(page, context) {
    const screenTestsDirPath = path.resolve(process.cwd(), 'screen-tests')
    const snapshotsDirPath = path.resolve(screenTestsDirPath, 'snapshots')
    const diffsDirPath = path.resolve(screenTestsDirPath, 'diffs')
    const currentDirPath = path.resolve(screenTestsDirPath, 'current')

    const storyRootLocator = page.locator('#storybook-root')
    await page.waitForLoadState('domcontentloaded')

    try {
      await page.waitForFunction(
        () => {
          const root = document.querySelector('#storybook-root')
          if (!root) {
            return false
          }
          return root.childElementCount > 0
        },
        undefined,
        { timeout: STORY_RENDER_TIMEOUT_MS },
      )
    } catch {
      throw new Error(
        `Story "${context.id}" rendered nothing within ${STORY_RENDER_TIMEOUT_MS} ms: #storybook-root is empty. An empty state has nothing to screenshot, cover it with a unit test instead.`,
      )
    }

    await storyRootLocator.waitFor({ state: 'visible' })

    await page.waitForFunction(() =>
      Array.from(
        document.querySelectorAll<HTMLImageElement>('#storybook-root img'),
      ).every((img) => img.complete),
    )
    await page.evaluate(() => document.fonts.ready)

    await page.waitForTimeout(250)

    const screenshot = await storyRootLocator.screenshot({
      animations: 'disabled',
    })

    const snapshotPath = path.resolve(snapshotsDirPath, `${context.id}.png`)
    if (!(await hasFile(snapshotPath))) {
      await fs.mkdir(currentDirPath, { recursive: true })
      await fs.writeFile(
        path.resolve(currentDirPath, `${context.id}-new.png`),
        screenshot,
      )
    }

    expect(screenshot).toMatchImageSnapshot({
      customSnapshotIdentifier: context.id,
      customSnapshotsDir: snapshotsDirPath,
      customDiffDir: diffsDirPath,
      storeReceivedOnFailure: true,
      customReceivedDir: currentDirPath,
      failureThreshold: 100,
      failureThresholdType: 'pixel',
      customDiffConfig: {
        threshold: 0.1,
        includeAA: false,
      },
    })
  },
}

export default config
