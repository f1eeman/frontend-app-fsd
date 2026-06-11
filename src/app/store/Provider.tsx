import { useMemo, type FC, type ReactNode } from 'react'
import { Provider } from 'react-redux'
import { setupStore } from './store'
import type { RootState } from './store'
import type { DeepPartial } from '@/shared/types'

interface StoreProviderProps {
  children: ReactNode
  initialState?: DeepPartial<RootState>
}

export const StoreProvider: FC<StoreProviderProps> = ({
  children,
  initialState,
}) => {
  const store = useMemo(() => setupStore(initialState), [initialState])

  return <Provider store={store}>{children}</Provider>
}
