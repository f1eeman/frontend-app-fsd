import { validateArticleForm } from './validateArticleForm'

describe('validateArticleForm', () => {
  test('returns error string when title is empty', () => {
    expect(validateArticleForm({ title: '' })).toBe('Заголовок обязателен')
  })

  test('returns error string when title is only whitespace', () => {
    expect(validateArticleForm({ title: '   ' })).toBe('Заголовок обязателен')
  })

  test('returns undefined when title is non-empty', () => {
    expect(validateArticleForm({ title: 'My Article' })).toBeUndefined()
  })
})
