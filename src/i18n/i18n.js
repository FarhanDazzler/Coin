import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import english from './Translations/English.json';
import french from './Translations/French.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: english,
    },
    fr: {
      translation: french,
    },
    // Add more languages as needed
  },
  lng: 'en', // Default language
  fallbackLng: 'en', // Fallback language
  interpolation: {
    escapeValue: false, // React already escapes variables
  },
});

export default i18n;
