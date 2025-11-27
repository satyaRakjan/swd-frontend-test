"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./en.json";
import th from "./th.json";

i18n
  .use(initReactI18next)
  // .use(LanguageDetector)
  .init({
    fallbackLng: "en",
    resources: {
      en: { translation: en },
      th: { translation: th }
    }
  });

export default i18n;
