import { Provider } from 'react-redux'
import { setupStore } from './store'
import type { FC, ReactNode } from 'react'
import type { RootState, AppStore } from './store'
import type { DeepPartial } from '@/shared/types'

interface StoreProviderProps {
  children: ReactNode
  initialState?: DeepPartial<RootState>
}

export const StoreProvider: FC<StoreProviderProps> = ({
  children,
  initialState,
}) => {
  const store: AppStore = setupStore(initialState)
  return <Provider store={store}>{children}</Provider>
}
