import { memo } from 'react'
import cls from './ArticleTextBlockComponent.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Text2 } from '@/shared/ui/text2/Text2'
import type { ArticleTextBlock } from '../../model/types/article'

interface ArticleTextBlockComponentProps {
  className?: string
  block: ArticleTextBlock
}

export const ArticleTextBlockComponent = memo(
  (props: ArticleTextBlockComponentProps) => {
    const { className = '', block } = props

    return (
      <div
        className={classNames(cls.ArticleTextBlockComponent, {}, [className])}
      >
        {block.title && <Text2 title={block.title} className={cls.title} />}
        {block.paragraphs.map((paragraph) => (
          <Text2 key={paragraph} text={paragraph} className={cls.paragraph} />
        ))}
      </div>
    )
  },
)

ArticleTextBlockComponent.displayName = 'ArticleTextBlock Component'
