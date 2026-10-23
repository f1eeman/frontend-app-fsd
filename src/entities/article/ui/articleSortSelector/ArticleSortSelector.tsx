import { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ArticleSortField } from '../../model/types/article'
import { Select } from '@/shared/ui/select/Select'
import { HStack } from '@/shared/ui/stack'
import type { SortOrder } from '@/shared/types'
import type { SelectOption } from '@/shared/ui/select/Select'

interface ArticleSortSelectorProps {
  className?: string
  sort: ArticleSortField
  order: SortOrder
  onChangeOrder: (newOrder: SortOrder) => void
  onChangeSort: (newSort: ArticleSortField) => void
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
  const { className = '', onChangeOrder, onChangeSort, order, sort } = props
  const { t } = useTranslation()

  const orderOptions = useMemo<SelectOption<SortOrder>[]>(
    () => [
      {
        value: 'asc',
        content: t('возрастанию'),
      },
      {
        value: 'desc',
        content: t('убыванию'),
      },
    ],
    [t],
  )

  const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
    () => [
      {
        value: ArticleSortField.CREATED,
        content: t('дате создания'),
      },
      {
        value: ArticleSortField.TITLE,
        content: t('названию'),
      },
      {
        value: ArticleSortField.VIEWS,
        content: t('просмотрам'),
      },
    ],
    [t],
  )

  return (
    <HStack gap='8' className={className}>
      <Select
        options={sortFieldOptions}
        label={t('Сортировать ПО')}
        value={sort}
        onChange={onChangeSort}
      />
      <Select
        options={orderOptions}
        label={t('по')}
        value={order}
        onChange={onChangeOrder}
      />
    </HStack>
  )
})

ArticleSortSelector.displayName = 'ArticleSortSelector Component'
