import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Input } from '@/shared/ui'
import { VStack } from '@/shared/ui/stack'
import type { ArticleImageBlock } from '@/entities/article'

interface Props {
  className?: string
  block: ArticleImageBlock
  onChange: (changes: Partial<ArticleImageBlock>) => void
}

export const ArticleImageBlockEditor = memo(
  ({ className = '', block, onChange }: Props) => {
    const { t } = useTranslation()

    const onSrcChange = useCallback(
      (value: string) => onChange({ src: value }),
      [onChange],
    )

    const onTitleChange = useCallback(
      (value: string) => onChange({ title: value }),
      [onChange],
    )

    return (
      <VStack gap='8' align='stretch' className={className}>
        <Input
          placeholder={t('Ссылка на изображение')}
          value={block.src}
          onChange={onSrcChange}
        />
        <Input
          placeholder={t('Подпись к изображению')}
          value={block.title}
          onChange={onTitleChange}
        />
      </VStack>
    )
  },
)

ArticleImageBlockEditor.displayName = 'ArticleImageBlockEditor'
