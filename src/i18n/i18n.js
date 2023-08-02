import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import english from './Translations/English.json';
import french from './Translations/French.json';
import Mandarin from './Translations/Mandarin.json';
import Spanish from './Translations/Spanish.json';
import Korean from './Translations/Korean.json';
import Portugese from './Translations/Portugese.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: english,
    },
    fr: {
      translation: french,
    },
    zh: {
      translation: Mandarin,
    },
    es: {
      translation: Spanish,
    },
    ko: {
      translation: Korean,
    },
    pt: {
      translation: Portugese,
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
