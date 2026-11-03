import React, { useLayoutEffect } from 'react';
import { StatusBar } from 'react-native';
import { Uniwind, useUniwind } from 'uniwind';
import { useSelector } from 'react-redux';
import type { RootState } from '@/state';

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const selectedTheme = useSelector(
    (state: RootState) => state.app.preferences.theme,
  );
  const { theme } = useUniwind();

  useLayoutEffect(() => {
    if (theme !== selectedTheme) {
      Uniwind.setTheme(selectedTheme);
    }
  }, [selectedTheme, theme]);

  return (
    <>
      <StatusBar
        barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
      />
      {children}
    </>
  );
}
