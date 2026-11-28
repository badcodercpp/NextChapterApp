import {
  AppAuthenticatedLayout,
  AppHeroArtwork,
  AppIcon,
  AppMountainArtwork,
  AppPatternArtwork,
  AppPressable,
} from '@/components';
import {
  ChevronRight,
  Globe,
  Palette,
  Settings2,
  Sparkles,
} from 'lucide-react-native';
import { LanguageSheet, ThemeSheet } from '@/features/Settings/components';

import { AppText } from '@/components/foundation/AppText';
import React from 'react';
import { TLanguageCode } from '@/translation/types';
import { View } from 'react-native';
import { useSettingsBootstrap } from '../hooks/useSettingsBootstrap';

export const SettingsScreen = () => {
  const {
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
  } = useSettingsBootstrap();

  const rows = [
    {
      key: 'language',
      title: 'Language',
      value: selectedLanguage,
      icon: Globe,
      artwork: 'grid' as const,
      accessibilityLabel: 'Choose language',
      onPress: () => setShowLanguageSheet(true),
    },
    {
      key: 'theme',
      title: 'Theme',
      value: selectedTheme,
      icon: Palette,
      artwork: 'bubbles' as const,
      accessibilityLabel: 'Choose theme',
      onPress: () => setShowThemeSheet(true),
    },
  ];

  return (
    <AppAuthenticatedLayout
      noBottomPadding
      backgroundClassName="bg-background-v2"
    >
      {/* Hero */}
      <View className="mt-4 overflow-hidden rounded-[24px] border border-primary-v2/25 bg-surface-v2 p-5">
        <AppHeroArtwork />
        <View className="flex-row items-center">
          <View className="h-14 w-14 items-center justify-center rounded-2xl bg-primary-v2">
            <AppIcon
              icon={Settings2}
              size={28}
              className="text-on-primary-v2"
            />
          </View>
          <View className="ml-4 flex-1">
            <AppText variant="xl" className="font-bold text-text-v2">
              Make it{' '}
              <AppText variant="xl" className="font-bold text-link-v2">
                yours
              </AppText>
            </AppText>
            <AppText variant="sm" className="mt-1 text-text-muted-v2">
              Customize your KhudSe experience
            </AppText>
          </View>
        </View>
      </View>

      {/* Preferences */}
      <AppText
        variant="sm"
        className="mb-3 mt-6 px-1 font-semibold uppercase tracking-wide text-text-muted-v2"
      >
        Preferences
      </AppText>

      <View className="gap-3">
        {rows.map(row => (
          <AppPressable
            key={row.key}
            accessibilityRole="button"
            accessibilityLabel={row.accessibilityLabel}
            className="flex-row items-center overflow-hidden rounded-[20px] border border-primary-v2/20 bg-surface-v2 px-4 py-4"
            onPress={row.onPress}
          >
            <AppPatternArtwork variant={row.artwork} className="w-2/5" />
            <View className="mr-4 h-12 w-12 items-center justify-center rounded-2xl bg-primary-v2/15">
              <AppIcon icon={row.icon} size={22} className="text-link-v2" />
            </View>
            <View className="flex-1">
              <AppText variant="lg" className="font-semibold text-text-v2">
                {row.title}
              </AppText>
              <AppText variant="sm" className="mt-0.5 text-text-muted-v2">
                {row.value}
              </AppText>
            </View>
            <View className="h-9 w-9 items-center justify-center rounded-full bg-primary-v2/10">
              <AppIcon icon={ChevronRight} size={20} className="text-text-v2" />
            </View>
          </AppPressable>
        ))}
      </View>

      {/* Footer */}
      <View className="mt-6 overflow-hidden rounded-[24px] border border-primary-v2/20 bg-surface-v2 p-5">
        <AppMountainArtwork className="h-3/4 w-3/5" />
        <View className="h-10 w-10 items-center justify-center rounded-full bg-primary-v2/15">
          <AppIcon icon={Sparkles} size={20} className="text-link-v2" />
        </View>
        <AppText variant="md" className="mt-3 font-semibold text-text-v2">
          Your journey, your way
        </AppText>
        <AppText variant="sm" className="mt-1 pr-16 text-text-muted-v2">
          Pick the language and look that feel most comfortable as you move
          forward.
        </AppText>
      </View>

      {/* Language Sheet */}
      {showLanguageSheet && (
        <LanguageSheet
          selected={optimisticLanguage}
          onSelect={async (code: TLanguageCode) => {
            changeAppLanguage(code);
            setShowLanguageSheet(false);
          }}
          onClose={() => setShowLanguageSheet(false)}
        />
      )}

      {/* Theme Sheet */}
      {showThemeSheet && (
        <ThemeSheet
          selected={optimisticTheme}
          onSelect={value => {
            changeAppTheme(value);
            setShowThemeSheet(false);
          }}
          onClose={() => setShowThemeSheet(false)}
        />
      )}
    </AppAuthenticatedLayout>
  );
};
