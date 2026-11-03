import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { Uniwind, useUniwind } from 'uniwind';
import {
  selectCurrentLanguage,
  selectCurrentTheme,
} from '@/state/selectors/local/preferences';

import { StatusBar } from 'react-native';
import { TLanguageCode } from '@/translation/types';
import i18n from '@/translation/i18n';
import { useSelector } from 'react-redux';

export function AppPrefrencesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const selectedTheme = useSelector(selectCurrentTheme);
  const selectedLanguage = useSelector(selectCurrentLanguage);

  const handleLanguageChange = useCallback(async (code: TLanguageCode) => {
    await i18n.changeLanguage(code);
  }, []);

  const { theme } = useUniwind();

  useLayoutEffect(() => {
    if (theme !== selectedTheme) {
      Uniwind.setTheme(selectedTheme);
    }
  }, [selectedTheme, theme]);

  useEffect(() => {
    handleLanguageChange(selectedLanguage);
  }, [handleLanguageChange, selectedLanguage]);

  return (
    <>
      <StatusBar
        barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
      />
      {children}
    </>
  );
}
