import { memo } from 'react'
import { ArticleView } from '../../model/types/article'
import cls from './ArticleViewSelector.module.scss'
import ListIcon from '@/shared/assets/icons/list-24-24.svg'
import TiledIcon from '@/shared/assets/icons/tiled-24-24.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { buttonTheme } from '@/shared/ui'
import { Button } from '@/shared/ui/button/Button'
import { Icon } from '@/shared/ui/icon/Icon'

interface ArticleViewSelectorProps {
  className?: string
  view: ArticleView
  onViewClick?: (view: ArticleView) => void
}

const viewTypes = [
  {
    view: ArticleView.SMALL,
    icon: TiledIcon,
  },
  {
    view: ArticleView.BIG,
    icon: ListIcon,
  },
]

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
  const { className = '', view, onViewClick } = props

  const onClick = (newView: ArticleView) => () => {
    onViewClick?.(newView)
  }

  return (
    <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
      {viewTypes.map((viewType, index) => (
        <Button
          theme={buttonTheme.clear}
          onClick={onClick(viewType.view)}
          key={index}
        >
          <Icon
            Svg={viewType.icon}
            className={classNames('', {
              [cls.notSelected]: viewType.view !== view,
            })}
          />
        </Button>
      ))}
    </div>
  )
})

ArticleViewSelector.displayName = 'ArticleViewSelector Component'
