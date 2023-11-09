import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translations: require('./locales/en/translations.json')
  },
  ru: {
    translations: require('./locales/ru/translations.json')
  }
};

const DETECTION_OPTIONS = {
  order: ['localStorage', 'navigator'],
  caches: ['localStorage']
};

i18n.use(LanguageDetector)
  .use(initReactI18next)
  .init({
  detection: DETECTION_OPTIONS,
  resources,
  fallbackLng: 'en',
  ns: ['translations'],
  defaultNS: 'translations'
});

i18n.languages = ['en', 'ru'];

export default i18n;