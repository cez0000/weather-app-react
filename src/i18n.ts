import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./translations/en.json";
import translationPL from "./translations/pl.json";
import translationRU from "./translations/ru.json";

// Konfiguracja zasobów językowych
const resources = {
  en: {
    translation: translationEN,
  },
  pl: {
    translation: translationPL,
  },
  ru: {
    translation: translationRU,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
