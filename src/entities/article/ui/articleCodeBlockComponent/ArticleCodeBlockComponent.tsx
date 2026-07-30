import { memo } from 'react'
import cls from './ArticleCodeBlockComponent.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Code } from '@/shared/ui/code/Code'
import type { ArticleCodeBlock } from '../../model/types/article'

interface ArticleCodeBlockComponentProps {
  className?: string
  block: ArticleCodeBlock
}

export const ArticleCodeBlockComponent = memo(
  (props: ArticleCodeBlockComponentProps) => {
    const { className = '', block } = props

    return (
      <div
        className={classNames(cls.ArticleCodeBlockComponent, {}, [className])}
      >
        <Code text={block.code} />
      </div>
    )
  },
)

ArticleCodeBlockComponent.displayName = 'ArticleCodeBlock Component'
