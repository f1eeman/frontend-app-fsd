import { BrowserRouter } from 'react-router'
import type { Decorator } from '@storybook/react'

export const RouterDecorator: Decorator = (story, context) => {
  if (context.parameters?.router === 'none') {
    return <>{story()}</>
  }

  return <BrowserRouter>{story()}</BrowserRouter>
}
