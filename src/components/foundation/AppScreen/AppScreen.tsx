import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { AppScreenProps } from './types';
import { Colors } from '@/theme/colors';
import React from 'react';
import { Spacing } from '@/theme/spacing';
import { TAB_BAR_HEIGHT } from '@/navigation/constants';
import { styles } from './styles';

export function AppScreen({
  children,
  scroll = false,
  safeArea = false,
  keyboard = false,
  backgroundColor = 'background',
  horizontalPadding = 'xl',
  verticalPadding = 'none',
  safeTop = true,
}: AppScreenProps) {
  const Container = safeArea ? SafeAreaView : View;
  const insets = useSafeAreaInsets();

  const content = scroll ? (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.content,
        {
          paddingHorizontal: Spacing[horizontalPadding],
          paddingVertical: Spacing[verticalPadding],
        },
      ]}
    >
      {children}
    </ScrollView>
  ) : (
    <View
      style={[
        styles.flex,
        {
          paddingHorizontal: Spacing[horizontalPadding],
          paddingVertical: Spacing[verticalPadding],
        },
      ]}
    >
      {children}
    </View>
  );

  const screen = (
    <Container
      style={[
        styles.flex,
        {
          backgroundColor: Colors[backgroundColor],
        },
        {
          paddingBottom: insets.bottom + TAB_BAR_HEIGHT,
          ...(safeTop
            ? {
                paddingTop: insets.top,
              }
            : {}),
        },
      ]}
    >
      {content}
    </Container>
  );

  if (!keyboard) {
    return screen;
  }

  return (
    <KeyboardAvoidingView
      style={[
        styles.flex,
        {
          paddingBottom: insets.bottom + TAB_BAR_HEIGHT,
          ...(safeTop
            ? {
                paddingTop: insets.top,
              }
            : {}),
        },
      ]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {screen}
    </KeyboardAvoidingView>
  );
}
