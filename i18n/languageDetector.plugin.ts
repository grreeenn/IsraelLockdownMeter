import { locale } from 'expo-localization';
import {LanguageDetectorAsyncModule} from "i18next";

const languageDetectorPlugin: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  detect: (callback: (arg0: string) => void) => {
    // We will get back a string like "en-US". We
    // return a string like "en" to match our language files.
    callback(locale.split('-')[0]);
  },
  init: () => { },
  cacheUserLanguage: () => { },
};
export default languageDetectorPlugin;
