import {
  createSlice,
  type WithSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'
import { rootReducer } from '@/app/store'
import type { AddCommentFormSchema } from '../types/addCommentForm'

const initialState: AddCommentFormSchema = {
  text: '',
}

const addCommentFormSlice = createSlice({
  name: 'addCommentForm',
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload
    },
  },
  selectors: {
    selectText: (state) => state.text,
    selectError: (state) => state.error,
  },
})

export const { actions: addCommentFormActions } = addCommentFormSlice
export const { reducer: addCommentFormReducer } = addCommentFormSlice
export const withAddCommentFormSlice =
  addCommentFormSlice.injectInto(rootReducer)

export const { selectText, selectError } = withAddCommentFormSlice.selectors

declare module '@/app/store' {
  export interface LazyLoadedSlices
    extends WithSlice<typeof addCommentFormSlice> {}
}
