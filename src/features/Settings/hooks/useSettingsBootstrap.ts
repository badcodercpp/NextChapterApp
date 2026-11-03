import { useOptimisticLanguage } from './useOptimisticLanguage';
import { useOptimisticTheme } from './useOptimisticTheme';
import { useState } from 'react';

export const useSettingsBootstrap = () => {
  const { optimisticLanguage, changeAppLanguage, selectedLanguage } =
    useOptimisticLanguage();
  const { optimisticTheme, changeAppTheme, selectedTheme } =
    useOptimisticTheme();

  const [showLanguageSheet, setShowLanguageSheet] = useState(false);
  const [showThemeSheet, setShowThemeSheet] = useState(false);

  return {
    optimisticLanguage,
    changeAppLanguage,
    selectedLanguage,
    optimisticTheme,
    changeAppTheme,
    selectedTheme,
    showLanguageSheet,
    setShowLanguageSheet,
    showThemeSheet,
    setShowThemeSheet,
  };
};
