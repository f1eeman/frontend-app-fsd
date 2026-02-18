import { BrowserRouter } from 'react-router'
import type { Decorator } from '@storybook/react'

export const RouterDecorator: Decorator = (story) => (
  <BrowserRouter>{story()}</BrowserRouter>
)
