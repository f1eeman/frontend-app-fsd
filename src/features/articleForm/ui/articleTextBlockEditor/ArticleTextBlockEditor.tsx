import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import cls from './ArticleTextBlockEditor.module.scss'
import { Button, buttonTheme, Input } from '@/shared/ui'
import { HStack, VStack } from '@/shared/ui/stack'
import type { ArticleTextBlock } from '@/entities/article'

interface Props {
  className?: string
  block: ArticleTextBlock
  onChange: (changes: Partial<ArticleTextBlock>) => void
}

export const ArticleTextBlockEditor = memo(
  ({ className = '', block, onChange }: Props) => {
    const { t } = useTranslation()

    const onTitleChange = useCallback(
      (value: string) => onChange({ title: value }),
      [onChange],
    )

    const onParagraphChange = useCallback(
      (value: string, index: number) => {
        const paragraphs = [...block.paragraphs]
        paragraphs[index] = value
        onChange({ paragraphs })
      },
      [block.paragraphs, onChange],
    )

    const addParagraph = useCallback(
      () => onChange({ paragraphs: [...block.paragraphs, ''] }),
      [block.paragraphs, onChange],
    )

    const removeParagraph = useCallback(
      (index: number) =>
        onChange({
          paragraphs: block.paragraphs.filter((_, i) => i !== index),
        }),
      [block.paragraphs, onChange],
    )

    return (
      <VStack gap='8' align='stretch' className={className}>
        <Input
          placeholder={t('Заголовок блока (необязательно)')}
          value={block.title ?? ''}
          onChange={onTitleChange}
        />
        {block.paragraphs.map((p, i) => (
          <HStack key={i} gap='8' align='start'>
            <textarea
              className={cls.textarea}
              value={p}
              onChange={(e) => onParagraphChange(e.target.value, i)}
              placeholder={t('Параграф')}
            />
            <Button
              theme={buttonTheme.outline}
              onClick={() => removeParagraph(i)}
            >
              {t('Удалить')}
            </Button>
          </HStack>
        ))}
        <Button theme={buttonTheme.outline} onClick={addParagraph}>
          {t('+ Параграф')}
        </Button>
      </VStack>
    )
  },
)

ArticleTextBlockEditor.displayName = 'ArticleTextBlockEditor'
