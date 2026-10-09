import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { articleFormActions } from '../../model/slices/articleFormSlice'
import { useAppDispatch } from '@/app/store'
import { ArticleBlockType } from '@/entities/article'
import { Button, buttonTheme } from '@/shared/ui'
import { HStack } from '@/shared/ui/stack'

interface Props {
  className?: string
}

export const ArticleBlockAdder = memo(({ className = '' }: Props) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const onAdd = useCallback(
    (type: ArticleBlockType) => dispatch(articleFormActions.addBlock(type)),
    [dispatch],
  )

  return (
    <HStack gap='8' align='stretch' className={className}>
      <Button
        theme={buttonTheme.outline}
        onClick={() => onAdd(ArticleBlockType.TEXT)}
      >
        {t('+ Текст')}
      </Button>
      <Button
        theme={buttonTheme.outline}
        onClick={() => onAdd(ArticleBlockType.CODE)}
      >
        {t('+ Код')}
      </Button>
      <Button
        theme={buttonTheme.outline}
        onClick={() => onAdd(ArticleBlockType.IMAGE)}
      >
        {t('+ Изображение')}
      </Button>
    </HStack>
  )
})

ArticleBlockAdder.displayName = 'ArticleBlockAdder'
