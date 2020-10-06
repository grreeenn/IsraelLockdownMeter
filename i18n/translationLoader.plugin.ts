import {supportedLocales} from './i18n.config';
import {BackendModule} from "i18next";
import {ESupportedLocale} from "../types/i18n";

const translationLoader: BackendModule = {
  type: 'backend',
  init: () => {
  },
  create: () => {
  },
  read(language: ESupportedLocale, namespace, callback) {
    let resource, error = null;
    try {
      resource = supportedLocales[language]
        .translationFileLoader()[namespace];
    } catch (_error) {
      error = _error;
    }
    callback(error, resource || '');
  },
};
export default translationLoader;
