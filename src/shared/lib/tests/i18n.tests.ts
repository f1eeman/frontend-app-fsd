import { createInstance } from 'i18next'
import { initReactI18next } from 'react-i18next'

const i18nInstance = createInstance()

void i18nInstance.use(initReactI18next).init({
  lng: 'ru',
  fallbackLng: 'ru',
  ns: ['common'],
  defaultNS: 'common',
  debug: false,
  showSupportNotice: false,
  resources: { ru: { common: {} } },
})

export default i18nInstance
