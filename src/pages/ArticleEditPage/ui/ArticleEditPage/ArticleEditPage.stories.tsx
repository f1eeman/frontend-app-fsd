import { MemoryRouter, Route, Routes } from 'react-router'
import ArticleEditPage from './ArticleEditPage'
import { ArticleType } from '@/entities/article'
import { StoreDecorator } from '@/shared/lib/sb/decorators/Store'
import type { Decorator, Meta, StoryObj } from '@storybook/react-webpack5'

const EDIT_ROUTE_PATTERN = '/articles/:id/edit'
const EDIT_ROUTE_ENTRY = '/articles/1/edit'

const meta = {
  title: 'pages/ArticleEditPage',
  component: ArticleEditPage,
} satisfies Meta<typeof ArticleEditPage>

export default meta
type Story = StoryObj<typeof meta>

const EditRouteDecorator: Decorator = (Story) => (
  <MemoryRouter initialEntries={[EDIT_ROUTE_ENTRY]}>
    <Routes>
      <Route path={EDIT_ROUTE_PATTERN} element={<Story />} />
    </Routes>
  </MemoryRouter>
)

export const Normal: Story = {
  parameters: { router: 'none' },
  decorators: [
    StoreDecorator({
      articleForm: {
        formData: {
          title: 'My Article',
          subtitle: 'Subtitle',
          img: '',
          type: [ArticleType.IT],
          blocks: [],
        },
        isLoading: false,
      },
    }),
    EditRouteDecorator,
  ],
}
