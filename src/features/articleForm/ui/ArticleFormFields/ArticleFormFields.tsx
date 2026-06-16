import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  articleFormActions,
  selectFormData,
  selectValidateError,
} from '../../model/slices/articleFormSlice'
import cls from './ArticleFormFields.module.scss'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { ArticleType } from '@/entities/article'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Input } from '@/shared/ui'

interface Props {
  className?: string
}

const ARTICLE_TYPES = [
  ArticleType.IT,
  ArticleType.SCIENCE,
  ArticleType.ECONOMICS,
] as const

export const ArticleFormFields = memo(({ className = '' }: Props) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const formData = useAppSelector(selectFormData)
  const validateError = useAppSelector(selectValidateError)

  return (
    <div className={classNames(cls.ArticleFormFields, {}, [className])}>
      <div className={cls.field}>
        <Input
          placeholder={t('Заголовок')}
          value={formData.title}
          onChange={(v) => dispatch(articleFormActions.setTitle(v))}
        />
        {validateError && <p className={cls.error}>{validateError}</p>}
      </div>
      <Input
        placeholder={t('Подзаголовок')}
        value={formData.subtitle}
        onChange={(v) => dispatch(articleFormActions.setSubtitle(v))}
      />
      <Input
        placeholder={t('Ссылка на обложку')}
        value={formData.img}
        onChange={(v) => dispatch(articleFormActions.setImg(v))}
      />
      <div className={cls.types}>
        {ARTICLE_TYPES.map((type) => (
          <button
            key={type}
            type='button'
            className={classNames(
              cls.typeBtn,
              { [cls.typeBtnActive]: formData.type.includes(type) },
              [],
            )}
            onClick={() => dispatch(articleFormActions.toggleType(type))}
          >
            {t(type)}
          </button>
        ))}
      </div>
    </div>
  )
})

ArticleFormFields.displayName = 'ArticleFormFields'
