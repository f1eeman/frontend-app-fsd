import { firstCharUpperCase } from '../firstCharUpperCase.mjs'

/**
 * Слайс по образцу src/features/articleForm.
 *
 * Стор собран через combineSlices().withLazyLoadedSlices(), поэтому редьюсер
 * подключается сам: injectInto(rootReducer) плюс расширение LazyLoadedSlices
 * через declare module. Править src/app/store после генерации не нужно.
 */
export const reduxSliceTemplate = (sliceName) => {
  const schemaName = `${firstCharUpperCase(sliceName)}Schema`

  return `import {
  createSlice,
  type PayloadAction,
  type WithSlice,
} from '@reduxjs/toolkit'
import { rootReducer } from '@/app/store'
import type { ${schemaName} } from '../types/${sliceName}Schema'

const initialState: ${schemaName} = {
  isLoading: false,
}

const ${sliceName}Slice = createSlice({
  name: '${sliceName}',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
  selectors: {
    selectIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error,
  },
})

export const with${firstCharUpperCase(sliceName)}Slice =
  ${sliceName}Slice.injectInto(rootReducer)
export const { actions: ${sliceName}Actions } = ${sliceName}Slice
export const { reducer: ${sliceName}Reducer } = ${sliceName}Slice
export const { selectIsLoading, selectError } =
  with${firstCharUpperCase(sliceName)}Slice.selectors

declare module '@/app/store' {
  export interface LazyLoadedSlices
    extends WithSlice<typeof ${sliceName}Slice> {}
}
`
}
