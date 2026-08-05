/**
 * Стори в CSF3 по образцу src/features/langSwitcher.
 *
 * StoreDecorator, темы и роутер добавлены глобально в config/storybook/preview.ts,
 * поэтому локальные декораторы здесь не нужны — только предзаполнение стора,
 * которое дописывается вручную под конкретный слайс.
 */
export const storyTemplate = ({ layer, componentName, withAsync }) => {
  const componentImport = withAsync
    ? `import ${componentName} from './${componentName}'`
    : `import { ${componentName} } from './${componentName}'`

  return `${componentImport}
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: '${layer}/${componentName}',
  component: ${componentName},
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Внешний класс для композиции стилей',
      table: { type: { summary: 'string' } },
    },
  },
} satisfies Meta<typeof ${componentName}>

export default meta
type Story = StoryObj<typeof meta>

/** Полностью настраиваемая песочница — крути любой проп в панели Controls */
export const Playground: Story = {}

export const Normal: Story = {}
`
}
