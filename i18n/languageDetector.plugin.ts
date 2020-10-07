import { locale } from 'expo-localization';
import {LanguageDetectorAsyncModule} from "i18next";
import {fallbackLang} from "./i18n.config";
import {ESupportedLocale} from "../types/i18n";

const languageDetectorPlugin: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  detect: (callback: (arg0: string) => void) => {
    // We will get back a string like "en-US". We
    // return a string like "en" to match our language files.
    if ((<any>Object).values(ESupportedLocale).includes(locale.split('-')[0])) {
      callback(locale.split('-')[0]);
    } else {
      callback(fallbackLang);
    }

  },
  init: () => { },
  cacheUserLanguage: () => { },
};
export default languageDetectorPlugin;
