import { memo } from 'react'
import cls from './ArticleImageBlockComponent.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppImage } from '@/shared/ui/appImage/AppImage'
import { Skeleton } from '@/shared/ui/skeleton/Skeleton'
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
        <AppImage
          src={block.src}
          alt={block.title}
          className={cls.img}
          fallback={<Skeleton width='100%' height={300} />}
        />
        {block.title && <Text text={block.title} align={TextAlign.CENTER} />}
      </div>
    )
  },
)

ArticleImageBlockComponent.displayName = 'ArticleImageBlock Component'
