import {
  addCommentFormActions,
  addCommentFormReducer,
} from './addCommentFormSlice'
import type { AddCommentFormSchema } from '../types/addCommentForm'
import type { DeepPartial } from '@/shared/types'

describe('addCommentFormSlice.test', () => {
  test('setText updates text', () => {
    const state: DeepPartial<AddCommentFormSchema> = { text: '' }

    expect(
      addCommentFormReducer(
        state as AddCommentFormSchema,
        addCommentFormActions.setText('hello'),
      ),
    ).toEqual({ text: 'hello' })
  })

  test('setText overwrites previous text', () => {
    const state: DeepPartial<AddCommentFormSchema> = { text: 'old' }

    expect(
      addCommentFormReducer(
        state as AddCommentFormSchema,
        addCommentFormActions.setText('new'),
      ),
    ).toEqual({ text: 'new' })
  })
})
