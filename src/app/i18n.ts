import { createInstance } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

export type LanguageCode = (typeof langMap)[keyof typeof langMap];

export const i18nInstance = createInstance();

export const langMap = {
  ru: "ru",
  en: "en",
} as const;

export const langList: LanguageCode[] = Object.values(langMap);

export const normalizeLang = (lang: string): "en" | "ru" => {
  const short = lang.toLowerCase().split("-")[0];
  return short === "en" ? "en" : "ru";
};

const initI18n = () =>
  i18nInstance
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(HttpBackend)
    .init({
      fallbackLng: langMap.ru,
      supportedLngs: [langMap.ru, langMap.en],
      defaultNS: "common",
      ns: ["common"],
      debug: __IS_DEV__,
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ["localStorage", "navigator"],
        caches: ["localStorage"],
      },
      backend: {
        loadPath: "/locales/{{lng}}/{{ns}}.json",
      },
      react: {
        useSuspense: true,
      },
    });

export const i18nPromise = initI18n();
