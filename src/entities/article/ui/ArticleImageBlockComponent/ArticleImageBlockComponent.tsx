import { memo } from 'react'
import cls from './ArticleImageBlockComponent.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { TextAlign } from '@/shared/ui/text/consts'
import { Text } from '@/shared/ui/text/Text'
import type { ArticleImageBlock } from '../../model/types/article'

interface ArticleImageBlockComponentProps {
  className?: string
  block: ArticleImageBlock
}

export const ArticleImageBlockComponent = memo(
  (props: ArticleImageBlockComponentProps) => {
    const { className = '', block } = props

    return (
      <div
        className={classNames(cls.ArticleImageBlockComponent, {}, [className])}
      >
        <img src={block.src} alt={block.title} className={cls.img} />
        {block.title && <Text text={block.title} align={TextAlign.CENTER} />}
      </div>
    )
  },
)

ArticleImageBlockComponent.displayName = 'ArticleImageBlock Component'
