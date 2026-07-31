import asIN from './resource/native/as-IN'; // Assamese
import bnIN from './resource/native/bn-IN'; // Bengali
import enIN from './resource/native/en-IN'; // English Indian
import enUS from './resource/foreign/en-US'; // English US
import guIN from './resource/native/gu-IN'; // Gujarati
import hiIN from './resource/native/hi-IN'; // Hindi
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import knIN from './resource/native/kn-IN'; // Kannada
import kokIN from './resource/native/kok-IN'; // Konkani
import mlIN from './resource/native/ml-IN'; // Malayalam
import mrIN from './resource/native/mr-IN'; // Marathi
import orIN from './resource/native/or-IN'; // Odia
import paIN from './resource/native/pa-IN'; // Punjabi
import saIN from './resource/native/sa-IN'; // Sanskrit
import taIN from './resource/native/ta-IN'; // Tamil
import teIN from './resource/native/te-IN'; // Telugu

const resources = {
  'bn-IN': {
    translation: bnIN,
  },
  'en-IN': {
    translation: enIN,
  },
  'en-US': {
    translation: enUS,
  },
  'hi-IN': {
    translation: hiIN,
  },
  'as-IN': {
    translation: asIN,
  },
  'gu-IN': {
    translation: guIN,
  },
  'kn-IN': {
    translation: knIN,
  },
  'kok-IN': {
    translation: kokIN,
  },
  'ml-IN': {
    translation: mlIN,
  },
  'mr-IN': {
    translation: mrIN,
  },
  'or-IN': {
    translation: orIN,
  },
  'pa-IN': {
    translation: paIN,
  },
  'sa-IN': {
    translation: saIN,
  },
  'ta-IN': {
    translation: taIN,
  },
  'te-IN': {
    translation: teIN,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en-US', // default language
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
