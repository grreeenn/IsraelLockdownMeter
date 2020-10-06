import i18next, {TOptions} from 'i18next';
import {I18nManager as RNI18nManager} from 'react-native';
import {fallbackLang, namespaces} from './i18n.config';
import languageDetectorPlugin from './languageDetector.plugin';
import translationLoader from './translationLoader.plugin';
import {TLayoutDirection} from "../types/i18n";
import {initReactI18next} from "react-i18next";

const i18n = {

  init: () => new Promise((resolve, reject) => {
    i18next
      .use(languageDetectorPlugin)
      .use(translationLoader)
      .use(initReactI18next)
      .init({
        react: {
          useSuspense: false
        },
        fallbackLng: fallbackLang,
        ns: namespaces,
        interpolation: {
          escapeValue: false,
        },
      }, (error) => {
        if (error) {
          return reject(error);
        }
        return resolve(true);
      });
  }),
  t: (key: string, options?: TOptions) => i18next.t(key, options),

  get locale(): string {
    return i18next.language;
  },

  get dir(): TLayoutDirection {
    return i18next.dir().toUpperCase() as TLayoutDirection;
  },

  get isRTL(): boolean {
    return RNI18nManager.isRTL;
  },
};

export const t = i18n.t;
export default i18n;
