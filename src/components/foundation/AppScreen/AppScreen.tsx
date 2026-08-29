import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { AppScreenProps } from './types';
import React from 'react';
import { TAB_BAR_HEIGHT } from '@/navigation/constants';
import { cn } from '@/utils';

export function AppScreen({
  children,

  scroll = false,

  keyboard = false,

  safeArea = true,

  safeTop = true,

  safeBottom = true,

  className,

  contentClassName,

  scrollProps,

  considerTabBar = false,

  ...props
}: AppScreenProps) {
  const insets = useSafeAreaInsets();

  const Container = safeArea ? SafeAreaView : View;

  const content = scroll ? (
    <ScrollView
      {...scrollProps}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerClassName={cn(
        'flex-grow',

        contentClassName,
      )}
    >
      {children}
    </ScrollView>
  ) : (
    <View
      className={cn(
        'flex-1',

        contentClassName,
      )}
    >
      {children}
    </View>
  );

  const screen = (
    <Container
      {...props}
      className={cn(
        'flex-1 bg-background',

        className,
      )}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        paddingTop: safeTop ? insets.top : 0,

        paddingBottom: safeBottom
          ? insets.bottom + (considerTabBar ? TAB_BAR_HEIGHT : 0)
          : 0,
      }}
    >
      {content}
    </Container>
  );

  if (!keyboard) {
    return screen;
  }

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {screen}
    </KeyboardAvoidingView>
  );
}
