import { useTranslation } from 'react-i18next'
import { BugButton } from '@/app/errorBoundary/BugButton'
import { Page } from '@/shared/ui'

const AboutPage = () => {
  const { t } = useTranslation('about')
  return (
    <Page>
      <BugButton />
      {t('О сайте')}
    </Page>
  )
}

export default AboutPage
