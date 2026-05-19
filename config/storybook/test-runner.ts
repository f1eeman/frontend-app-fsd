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

    const storyRootLocator = page.locator('#storybook-root')
    await storyRootLocator.waitFor({ state: 'visible' })
    await page.waitForLoadState('domcontentloaded')

    await page.waitForFunction(() => {
      const root = document.querySelector('#storybook-root')
      if (!root) {
        return false
      }
      return root.childElementCount > 0
    })

    await page.waitForTimeout(250)

    const screenshot = await storyRootLocator.screenshot({
      animations: 'disabled',
    })

    expect(screenshot).toMatchImageSnapshot({
      customSnapshotIdentifier: context.id,
      customSnapshotsDir: snapshotsDirPath,
      customDiffDir: diffsDirPath,
      storeReceivedOnFailure: true,
      customReceivedDir: path.resolve(screenTestsDirPath, 'current'),
      failureThreshold: 0.02,
      failureThresholdType: 'percent',
    })
  },
}

export default config
