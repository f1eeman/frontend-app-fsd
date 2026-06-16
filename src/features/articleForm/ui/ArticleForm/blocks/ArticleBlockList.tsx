import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import {
  articleFormActions,
  selectBlocks,
} from '../../../model/slices/articleFormSlice'
import cls from './ArticleBlockList.module.scss'
import { ArticleCodeBlockEditor } from './ArticleCodeBlockEditor'
import { ArticleImageBlockEditor } from './ArticleImageBlockEditor'
import { ArticleTextBlockEditor } from './ArticleTextBlockEditor'
import { useAppDispatch, useAppSelector } from '@/app/store'
import {
  ArticleBlockType,
  type ArticleBlock,
  type ArticleCodeBlock,
  type ArticleImageBlock,
  type ArticleTextBlock,
} from '@/entities/article'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button, buttonTheme } from '@/shared/ui'

interface Props {
  className?: string
}

export const ArticleBlockList = memo(({ className = '' }: Props) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const blocks = useAppSelector(selectBlocks)

  const onRemove = useCallback(
    (id: string) => dispatch(articleFormActions.removeBlock(id)),
    [dispatch],
  )

  const onChange = useCallback(
    (id: string, changes: Partial<ArticleBlock>) =>
      dispatch(articleFormActions.updateBlock({ id, changes })),
    [dispatch],
  )

  return (
    <div className={classNames(cls.ArticleBlockList, {}, [className])}>
      {blocks.map((block) => (
        <div key={block.id} className={cls.block}>
          {block.type === ArticleBlockType.TEXT && (
            <ArticleTextBlockEditor
              block={block as ArticleTextBlock}
              onChange={(changes) => onChange(block.id, changes)}
            />
          )}
          {block.type === ArticleBlockType.CODE && (
            <ArticleCodeBlockEditor
              block={block as ArticleCodeBlock}
              onChange={(changes) => onChange(block.id, changes)}
            />
          )}
          {block.type === ArticleBlockType.IMAGE && (
            <ArticleImageBlockEditor
              block={block as ArticleImageBlock}
              onChange={(changes) => onChange(block.id, changes)}
            />
          )}
          <Button
            theme={buttonTheme.outline}
            onClick={() => onRemove(block.id)}
            className={cls.removeBtn}
          >
            {t('Удалить блок')}
          </Button>
        </div>
      ))}
    </div>
  )
})

ArticleBlockList.displayName = 'ArticleBlockList'
