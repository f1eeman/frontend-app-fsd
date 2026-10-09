import { memo, useCallback, useMemo } from 'react'
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

  const orderOptions = useMemo<SelectOption[]>(
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

  const sortFieldOptions = useMemo<SelectOption[]>(
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

  const changeSortHandler = useCallback(
    (newSort: string) => {
      onChangeSort(newSort as ArticleSortField)
    },
    [onChangeSort],
  )

  const changeOrderHandler = useCallback(
    (newOrder: string) => {
      onChangeOrder(newOrder as SortOrder)
    },
    [onChangeOrder],
  )

  return (
    <HStack gap='8' className={className}>
      <Select
        options={sortFieldOptions}
        label={t('Сортировать ПО')}
        value={sort}
        onChange={changeSortHandler}
      />
      <Select
        options={orderOptions}
        label={t('по')}
        value={order}
        onChange={changeOrderHandler}
      />
    </HStack>
  )
})

ArticleSortSelector.displayName = 'ArticleSortSelector Component'
