import settings from "../screens/settings/settings.i18n.json";
import measure from "../screens/measure/measure.i18n.json";
import about from "../screens/about/about.i18n.json";
import formFields from "../components/form-fields/formFields.i18n.json";
import navigation from "../navigation/navigation.i18n.json";
import {ESupportedLocale, TNamespacesWithTranslations, TTranslationsFile} from "../types/i18n";


export const fallbackLang = ESupportedLocale.Hebrew;
export const supportedLocales = {
  [ESupportedLocale.English]: {
    name: "English",
    direction: 'LTR',
    translationFileLoader: () => getTranslations(ESupportedLocale.English),
  },
  [ESupportedLocale.Hebrew]: {
    name: "עברית",
    direction: 'RTL',
    translationFileLoader: () => getTranslations(ESupportedLocale.Hebrew),
  },
};

// export const defaultNamespace = "common";

const translations: TTranslationsFile[] = [
  settings,
  measure,
  about,
  formFields,
  navigation
];
export const namespaces = translations.map(t => t.ns);

const getTranslations = (lang: ESupportedLocale): TNamespacesWithTranslations =>
  Object.fromEntries(translations.map((file) => [file.ns, file[lang]]));


