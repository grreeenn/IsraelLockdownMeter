import {IStringDictionary} from "./commonTypes";

export enum ESupportedLocale {
  English = 'en',
  Hebrew = 'he',
}

type TTranslationsFromFile = {
  [key in ESupportedLocale]: IStringDictionary;
}

export type TTranslationsFile = TTranslationsFromFile & {ns: string}

export type TNamespacesWithTranslations = {
  [namespace: string]: IStringDictionary
}

export type TLayoutDirection = 'LTR' | 'RTL';
