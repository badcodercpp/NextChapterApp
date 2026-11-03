import { LANGUAGE_CODE } from '@/translation/constants';

export type TLanguageCode = (typeof LANGUAGE_CODE)[keyof typeof LANGUAGE_CODE];

export type TLanguageResource = {
  displayName: string;
  translation: Record<string, string>;
};

export type TAvailableLanguageResources = Record<
  TLanguageCode,
  TLanguageResource
>;
