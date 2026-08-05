import { firstCharUpperCase } from '../firstCharUpperCase.mjs'

/**
 * Тест слайса по образцу addCommentFormSlice.test.ts: DeepPartial-состояние
 * плюс каст к схеме. Проверяет сгенерированный setIsLoading — переписывается
 * вместе со слайсом.
 */
export const sliceTestTemplate = (sliceName) => {
  const schemaName = `${firstCharUpperCase(sliceName)}Schema`

  return `import { ${sliceName}Actions, ${sliceName}Reducer } from './${sliceName}Slice'
import type { ${schemaName} } from '../types/${sliceName}Schema'
import type { DeepPartial } from '@/shared/types'

describe('${sliceName}Slice.test', () => {
  test('setIsLoading updates isLoading', () => {
    const state: DeepPartial<${schemaName}> = { isLoading: false }

    expect(
      ${sliceName}Reducer(
        state as ${schemaName},
        ${sliceName}Actions.setIsLoading(true),
      ),
    ).toEqual({ isLoading: true })
  })
})
`
}
