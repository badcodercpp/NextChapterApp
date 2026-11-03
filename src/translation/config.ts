import { LANGUAGE_CODE } from './constants';
import { TAvailableLanguageResources } from './types';
import asIN from './resource/native/as-IN'; // Assamese
import bnIN from './resource/native/bn-IN'; // Bengali
import enIN from './resource/native/en-IN'; // English Indian
import enUS from './resource/foreign/en-US'; // English US
import guIN from './resource/native/gu-IN'; // Gujarati
import hiIN from './resource/native/hi-IN'; // Hindi
import knIN from './resource/native/kn-IN'; // Kannada
import kokIN from './resource/native/kok-IN'; // Konkani
import mlIN from './resource/native/ml-IN'; // Malayalam
import mrIN from './resource/native/mr-IN'; // Marathi
import orIN from './resource/native/or-IN'; // Odia
import paIN from './resource/native/pa-IN'; // Punjabi
import saIN from './resource/native/sa-IN'; // Sanskrit
import taIN from './resource/native/ta-IN'; // Tamil
import teIN from './resource/native/te-IN'; // Telugu

export const availableLanguageResources: TAvailableLanguageResources = {
  [LANGUAGE_CODE.BN_IN]: {
    displayName: 'বাংলা',
    translation: bnIN,
  },

  [LANGUAGE_CODE.EN_IN]: {
    displayName: 'English (India)',
    translation: enIN,
  },

  [LANGUAGE_CODE.EN_US]: {
    displayName: 'English (US)',
    translation: enUS,
  },

  [LANGUAGE_CODE.HI_IN]: {
    displayName: 'हिन्दी',
    translation: hiIN,
  },

  [LANGUAGE_CODE.AS_IN]: {
    displayName: 'অসমীয়া',
    translation: asIN,
  },

  [LANGUAGE_CODE.GU_IN]: {
    displayName: 'ગુજરાતી',
    translation: guIN,
  },

  [LANGUAGE_CODE.KN_IN]: {
    displayName: 'ಕನ್ನಡ',
    translation: knIN,
  },

  [LANGUAGE_CODE.KOK_IN]: {
    displayName: 'कोंकणी',
    translation: kokIN,
  },

  [LANGUAGE_CODE.ML_IN]: {
    displayName: 'മലയാളം',
    translation: mlIN,
  },

  [LANGUAGE_CODE.MR_IN]: {
    displayName: 'मराठी',
    translation: mrIN,
  },

  [LANGUAGE_CODE.OR_IN]: {
    displayName: 'ଓଡ଼ିଆ',
    translation: orIN,
  },

  [LANGUAGE_CODE.PA_IN]: {
    displayName: 'ਪੰਜਾਬੀ',
    translation: paIN,
  },

  [LANGUAGE_CODE.SA_IN]: {
    displayName: 'संस्कृतम्',
    translation: saIN,
  },

  [LANGUAGE_CODE.TA_IN]: {
    displayName: 'தமிழ்',
    translation: taIN,
  },

  [LANGUAGE_CODE.TE_IN]: {
    displayName: 'తెలుగు',
    translation: teIN,
  },
};

export const availableLanguages = Object.entries(
  availableLanguageResources,
).map(([code, resource]) => ({
  code,
  label: resource.displayName,
}));
