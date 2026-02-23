import path from 'node:path'
import { toMatchImageSnapshot } from 'jest-image-snapshot'
import type { TestRunnerConfig } from '@storybook/test-runner'

const config: TestRunnerConfig = {
  setup() {
    expect.extend({ toMatchImageSnapshot })
  },
  async preVisit(page) {
    page.setDefaultTimeout(60000)
    page.setDefaultNavigationTimeout(60000)

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
      failureThreshold: 0.01,
      failureThresholdType: 'percent',
    })
  },
}

export default config
