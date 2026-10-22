import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RatingCard } from './RatingCard'
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender'

const TITLE = 'Оцените статью'
const THANKS = 'Спасибо за оценку'

const getStar = (starNumber: number) =>
  screen.getByRole('button', { name: `${starNumber} / 5` })

describe('RatingCard.test', () => {
  test('should accept rating right after click without feedback', async () => {
    const onAccept = jest.fn()
    componentRender(<RatingCard title={TITLE} onAccept={onAccept} />)

    await userEvent.click(getStar(4))

    expect(onAccept).toHaveBeenCalledTimes(1)
    expect(onAccept).toHaveBeenCalledWith(4)
    expect(screen.getByText(THANKS)).toBeInTheDocument()
  })

  test('should accept rating with feedback on submit', async () => {
    const onAccept = jest.fn()
    componentRender(
      <RatingCard title={TITLE} onAccept={onAccept} hasFeedback />,
    )

    await userEvent.click(getStar(4))

    expect(onAccept).not.toHaveBeenCalled()
    expect(screen.getByText(TITLE)).toBeInTheDocument()

    await userEvent.type(screen.getByRole('textbox'), 'Отлично')
    await userEvent.click(screen.getByRole('button', { name: 'Отправить' }))

    expect(onAccept).toHaveBeenCalledTimes(1)
    expect(onAccept).toHaveBeenCalledWith(4, 'Отлично')
    expect(screen.getByText(THANKS)).toBeInTheDocument()
  })

  test('should accept rating without feedback when window is closed', async () => {
    const onAccept = jest.fn()
    componentRender(
      <RatingCard title={TITLE} onAccept={onAccept} hasFeedback />,
    )

    await userEvent.click(getStar(2))
    await userEvent.click(screen.getByRole('button', { name: 'Закрыть' }))

    expect(onAccept).toHaveBeenCalledTimes(1)
    expect(onAccept).toHaveBeenCalledWith(2)
    expect(screen.getByText(THANKS)).toBeInTheDocument()
  })

  test('should accept rating once when close is clicked during closing animation', async () => {
    const onAccept = jest.fn()
    componentRender(
      <RatingCard title={TITLE} onAccept={onAccept} hasFeedback />,
    )

    await userEvent.click(getStar(5))
    const closeButton = screen.getByRole('button', { name: 'Закрыть' })
    await userEvent.click(closeButton)
    await userEvent.click(closeButton)

    expect(onAccept).toHaveBeenCalledTimes(1)
    expect(onAccept).toHaveBeenCalledWith(5)
  })

  test('should show existing rate as thanked and locked', () => {
    const onAccept = jest.fn()
    componentRender(<RatingCard title={TITLE} rate={3} onAccept={onAccept} />)

    expect(screen.getByText(THANKS)).toBeInTheDocument()
    expect(getStar(3)).toHaveAttribute('aria-pressed', 'true')
    expect(getStar(4)).toHaveAttribute('aria-pressed', 'false')
    expect(getStar(1)).toBeDisabled()
  })

  test('should show rate that arrives after first render', () => {
    const onAccept = jest.fn()
    const { rerender } = componentRender(
      <RatingCard title={TITLE} onAccept={onAccept} />,
    )
    expect(screen.getByText(TITLE)).toBeInTheDocument()

    rerender(<RatingCard title={TITLE} rate={3} onAccept={onAccept} />)

    expect(getStar(3)).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText(THANKS)).toBeInTheDocument()
  })
})
