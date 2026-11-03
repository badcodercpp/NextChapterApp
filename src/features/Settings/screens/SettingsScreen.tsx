import {
  APP_SUPPORTED_LANGUAGES,
  APP_SUPPORTED_THEMES,
} from '@/features/Settings/constants';
import {
  AppAuthenticatedLayout,
  AppCard,
  AppIcon,
  AppPressable,
} from '@/components';
import { ChevronRight, Globe, Moon } from 'lucide-react-native';
import { LanguageSheet, ThemeSheet } from '@/features/Settings/components';
import React, { useState } from 'react';

import { AppText } from '@/components/foundation/AppText';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/state';
import { setThemePreference } from '@/state/slices/local/preferences';

export const SettingsScreen = () => {
  const [language, setLanguage] = useState('en-US');
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.app.preferences.theme);

  const [showLanguageSheet, setShowLanguageSheet] = useState(false);
  const [showThemeSheet, setShowThemeSheet] = useState(false);

  const selectedLanguage =
    APP_SUPPORTED_LANGUAGES.find(item => item.code === language)?.label ??
    'English';

  const selectedTheme =
    APP_SUPPORTED_THEMES.find(item => item.value === theme)?.label ??
    'System default';

  return (
    <AppAuthenticatedLayout noBottomPadding>
      {/* Header */}
      <View className="mb-8">
        <AppText variant="xl" className="font-bold text-text-secondary">
          Settings
        </AppText>

        <AppText variant="sm" className="mt-1 text-text-secondary">
          Customize your NextChapter experience
        </AppText>
      </View>

      {/* Preferences */}
      <View>
        <AppText
          variant="sm"
          className="mb-3 px-1 font-semibold uppercase tracking-wide text-text-secondary"
        >
          Preferences
        </AppText>

        <AppCard className="overflow-hidden p-0">
          {/* Language */}
          <AppPressable
            className="flex-row items-center px-4 py-4"
            onPress={() => setShowLanguageSheet(true)}
          >
            <View className="mr-4 h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <AppIcon icon={Globe} size={20} className="text-primary" />
            </View>

            <View className="flex-1">
              <AppText
                variant="lg"
                className="font-semibold text-text-secondary"
              >
                Language
              </AppText>

              <AppText variant="sm" className="mt-0.5 text-text-secondary">
                {selectedLanguage}
              </AppText>
            </View>

            <AppIcon
              icon={ChevronRight}
              size={20}
              className="text-text-secondary"
            />
          </AppPressable>

          <View className="ml-[68px] h-px bg-border" />

          {/* Theme */}
          <AppPressable
            accessibilityRole="button"
            accessibilityLabel="Choose theme"
            className="flex-row items-center px-4 py-4"
            onPress={() => setShowThemeSheet(true)}
          >
            <View className="mr-4 h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <AppIcon icon={Moon} size={20} className="text-primary" />
            </View>

            <View className="flex-1">
              <AppText
                variant="lg"
                className="font-semibold text-text-secondary"
              >
                Theme
              </AppText>

              <AppText variant="sm" className="mt-0.5 text-text-secondary">
                {selectedTheme}
              </AppText>
            </View>

            <AppIcon
              icon={ChevronRight}
              size={20}
              className="text-text-secondary"
            />
          </AppPressable>
        </AppCard>
      </View>

      {/* Language Sheet */}
      {showLanguageSheet && (
        <LanguageSheet
          selected={language}
          onSelect={code => {
            setLanguage(code);
            setShowLanguageSheet(false);
          }}
          onClose={() => setShowLanguageSheet(false)}
        />
      )}

      {/* Theme Sheet */}
      {showThemeSheet && (
        <ThemeSheet
          selected={theme}
          onSelect={value => {
            dispatch(setThemePreference(value));
            setShowThemeSheet(false);
          }}
          onClose={() => setShowThemeSheet(false)}
        />
      )}
    </AppAuthenticatedLayout>
  );
};
