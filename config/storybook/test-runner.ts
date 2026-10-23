import fs from 'node:fs/promises'
import path from 'node:path'
import { getStoryContext } from '@storybook/test-runner'
import { toMatchImageSnapshot } from 'jest-image-snapshot'
import type { TestRunnerConfig } from '@storybook/test-runner'
import type { Page } from 'playwright'

const PLACEHOLDER_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Z6L66QAAAAASUVORK5CYII=',
  'base64',
)

const isImageRequest = (url: string) =>
  /\.(png|jpe?g|gif|webp|avif)(\?|$)/i.test(url)

const isLocalUrl = (url: string) =>
  /^https?:\/\/(localhost|127\.0\.0\.1)/i.test(url)

const STORY_RENDER_TIMEOUT_MS = 10000

const screenTestsDirPath = path.resolve(process.cwd(), 'screen-tests')
const snapshotsDirPath = path.resolve(screenTestsDirPath, 'snapshots')
const diffsDirPath = path.resolve(screenTestsDirPath, 'diffs')
const currentDirPath = path.resolve(screenTestsDirPath, 'current')

const THEME_CLASS_PREFIX = 'app_theme_'

const hasFile = async (filePath: string) => {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

const waitForStory = async (page: Page, storyId: string) => {
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
      `Story "${storyId}" rendered nothing within ${STORY_RENDER_TIMEOUT_MS} ms: #storybook-root is empty. An empty state has nothing to screenshot, cover it with a unit test instead.`,
    )
  }

  await page.locator('#storybook-root').waitFor({ state: 'visible' })

  await page.waitForFunction(() =>
    Array.from(
      document.querySelectorAll<HTMLImageElement>('#storybook-root img'),
    ).every((img) => img.complete),
  )
  await page.evaluate(() => document.fonts.ready)

  await page.waitForTimeout(250)
}

const matchScreenshot = async (page: Page, identifier: string) => {
  const screenshot = await page.locator('#storybook-root').screenshot({
    animations: 'disabled',
  })

  const snapshotPath = path.resolve(snapshotsDirPath, `${identifier}.png`)
  if (!(await hasFile(snapshotPath))) {
    await fs.mkdir(currentDirPath, { recursive: true })
    await fs.writeFile(
      path.resolve(currentDirPath, `${identifier}-new.png`),
      screenshot,
    )
  }

  expect(screenshot).toMatchImageSnapshot({
    customSnapshotIdentifier: identifier,
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
}

const getBodyTheme = (page: Page) =>
  page.evaluate(
    (prefix) =>
      Array.from(document.body.classList).find((className) =>
        className.startsWith(prefix),
      ),
    THEME_CLASS_PREFIX,
  )

const switchTheme = async (page: Page, theme: string) => {
  await page.evaluate((nextTheme) => {
    const channel = (
      globalThis as unknown as {
        __STORYBOOK_ADDONS_CHANNEL__: {
          emit: (event: string, payload: unknown) => void
        }
      }
    ).__STORYBOOK_ADDONS_CHANNEL__
    channel.emit('updateGlobals', { globals: { theme: nextTheme } })
  }, theme)

  await page.waitForFunction(
    (nextTheme) => document.body.classList.contains(nextTheme),
    theme,
  )
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
    const storyContext = await getStoryContext(page, context)
    const extraThemes = (storyContext.parameters.screenshotThemes ??
      []) as string[]
    const errors: Error[] = []

    const check = async (identifier: string) => {
      try {
        await matchScreenshot(page, identifier)
      } catch (error) {
        errors.push(error as Error)
      }
    }

    await page.waitForLoadState('domcontentloaded')
    await waitForStory(page, context.id)
    await check(context.id)

    if (extraThemes.length > 0) {
      const defaultTheme = await getBodyTheme(page)

      try {
        for (const theme of extraThemes) {
          await switchTheme(page, theme)
          await waitForStory(page, context.id)
          await check(`${context.id}--${theme}`)
        }
      } finally {
        if (defaultTheme) {
          await switchTheme(page, defaultTheme)
        }
      }
    }

    if (errors.length === 1) {
      throw errors[0]
    }
    if (errors.length > 1) {
      throw new Error(errors.map((error) => error.message).join('\n\n'))
    }
  },
}

export default config
