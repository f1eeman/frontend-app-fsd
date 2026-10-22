import { memo, useState } from 'react'
import cls from './StarRating.module.scss'
import StarIcon from '@/shared/assets/icons/star.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Icon } from '@/shared/ui/icon/Icon'

interface StarRatingProps {
  className?: string
  onSelect?: (starsCount: number) => void
  size?: number
  selectedStars?: number
}

const stars = [1, 2, 3, 4, 5]

export const StarRating = memo((props: StarRatingProps) => {
  const { className = '', size = 30, selectedStars = 0, onSelect } = props
  const [chosenStars, setChosenStars] = useState(selectedStars)
  const [hoveredStars, setHoveredStars] = useState(0)

  const rating = chosenStars || selectedStars
  const isSelected = rating > 0
  const filledStars = isSelected ? rating : hoveredStars

  const onHover = (starsCount: number) => () => {
    setHoveredStars(starsCount)
  }

  const onLeave = () => {
    setHoveredStars(0)
  }

  const onClick = (starsCount: number) => () => {
    onSelect?.(starsCount)
    setChosenStars(starsCount)
  }

  return (
    <div
      role='group'
      className={classNames(cls.StarRating, {}, [className])}
      onMouseLeave={onLeave}
      onBlur={onLeave}
    >
      {stars.map((starNumber) => (
        <button
          type='button'
          key={starNumber}
          className={cls.star}
          aria-label={`${starNumber} / ${stars.length}`}
          aria-pressed={starNumber <= rating}
          disabled={isSelected}
          onMouseEnter={onHover(starNumber)}
          onFocus={onHover(starNumber)}
          onClick={onClick(starNumber)}
        >
          <Icon
            className={filledStars >= starNumber ? cls.hovered : cls.normal}
            Svg={StarIcon}
            width={size}
            height={size}
          />
        </button>
      ))}
    </div>
  )
})

StarRating.displayName = 'StarRating Component'
