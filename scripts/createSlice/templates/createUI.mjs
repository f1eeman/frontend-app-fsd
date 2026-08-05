import { mkdir } from 'node:fs/promises'
import { asyncTemplate } from './asyncTemplate.mjs'
import { componentTemplate } from './componentTemplate.mjs'
import { storyTemplate } from './storyTemplate.mjs'
import { styleTemplate } from './styleTemplate.mjs'
import { firstCharUpperCase } from '../firstCharUpperCase.mjs'
import { resolveRoot } from '../resolveRoot.mjs'
import { writeFormatted } from '../writeFormatted.mjs'

/** ui-сегмент: ui/<sliceName>/<ComponentName>.{tsx,module.scss,stories.tsx}. */
export const createUI = async ({ layer, sliceName, withAsync }) => {
  const componentName = firstCharUpperCase(sliceName)
  const resolveUIPath = (...segments) =>
    resolveRoot('src', layer, sliceName, 'ui', sliceName, ...segments)

  await mkdir(resolveUIPath(), { recursive: true })

  const created = [
    await writeFormatted(
      resolveUIPath(`${componentName}.tsx`),
      componentTemplate({ componentName, withAsync }),
    ),
    await writeFormatted(
      resolveUIPath(`${componentName}.module.scss`),
      styleTemplate(componentName),
    ),
    await writeFormatted(
      resolveUIPath(`${componentName}.stories.tsx`),
      storyTemplate({ layer, componentName, withAsync }),
    ),
  ]

  if (withAsync) {
    created.push(
      await writeFormatted(
        resolveUIPath(`${componentName}.async.tsx`),
        asyncTemplate(componentName),
      ),
    )
  }

  return created
}
