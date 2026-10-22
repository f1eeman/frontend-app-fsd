import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { StarRating } from './StarRating'

const getStar = (starNumber: number) =>
  screen.getByRole('button', { name: `${starNumber} / 5` })

const getPressedCount = () =>
  screen
    .getAllByRole('button')
    .filter((star) => star.getAttribute('aria-pressed') === 'true').length

describe('StarRating.test', () => {
  test('should show selectedStars as pressed and lock stars', () => {
    render(<StarRating selectedStars={3} />)

    expect(getPressedCount()).toBe(3)
    screen.getAllByRole('button').forEach((star) => {
      expect(star).toBeDisabled()
    })
  })

  test('should call onSelect and lock stars on click', async () => {
    const onSelect = jest.fn()
    render(<StarRating onSelect={onSelect} />)

    await userEvent.click(getStar(4))

    expect(onSelect).toHaveBeenCalledWith(4)
    expect(getPressedCount()).toBe(4)
    expect(getStar(1)).toBeDisabled()
  })

  test('should pick up selectedStars change before click', () => {
    const { rerender } = render(<StarRating selectedStars={0} />)
    expect(getPressedCount()).toBe(0)

    rerender(<StarRating selectedStars={3} />)
    expect(getPressedCount()).toBe(3)
  })

  test('should pick up selectedStars change from non-zero value', () => {
    const { rerender } = render(<StarRating selectedStars={3} />)

    rerender(<StarRating selectedStars={5} />)

    expect(getPressedCount()).toBe(5)
  })

  test('should select star from keyboard', async () => {
    const onSelect = jest.fn()
    render(<StarRating onSelect={onSelect} />)

    await userEvent.tab()
    await userEvent.tab()
    expect(getStar(2)).toHaveFocus()

    await userEvent.keyboard('{Enter}')

    expect(onSelect).toHaveBeenCalledWith(2)
  })
})
