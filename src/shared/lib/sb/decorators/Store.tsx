import { type RootState, StoreProvider } from '@/app/store'
import type { Decorator } from '@storybook/react'
import type { DeepPartial } from '@/shared/types'

type StoreDecoratorType = (state: DeepPartial<RootState>) => Decorator

export const StoreDecorator: StoreDecoratorType = (state) => {
  const Decorator = (story: () => React.ReactElement) => (
    <StoreProvider initialState={state}>{story()}</StoreProvider>
  )
  Decorator.displayName = 'StoreDecorator'
  return Decorator
}
