import { isOneOf } from './isOneOf'

describe('isOneOf.test', () => {
  const values = ['asc', 'desc'] as const

  test('should accept a value from the list', () => {
    expect(isOneOf(values, 'desc')).toBe(true)
  })

  test('should reject a value outside the list', () => {
    expect(isOneOf(values, 'up')).toBe(false)
  })

  test('should reject null', () => {
    expect(isOneOf(values, null)).toBe(false)
  })
})
