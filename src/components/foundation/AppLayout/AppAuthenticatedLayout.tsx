import { ScrollView, View } from 'react-native';

import { AppScreen } from '@/components/foundation/AppScreen';
import React from 'react';

interface AppAuthenticatedLayoutProps {
  children?: React.ReactNode;
  noBottomPadding?: boolean;
  withoutScrollView?: boolean;
}

export function AppAuthenticatedLayout({
  children,
  noBottomPadding,
  withoutScrollView,
}: AppAuthenticatedLayoutProps) {
  return (
    <AppScreen
      safeBottom={true}
      safeTop={false}
      className="flex-1 bg-background"
      contentClassName="flex-1 bg-background"
      safeArea={false}
    >
      {withoutScrollView ? (
        <View className="flex-1 px-4">
          <View
            className={`flex-1 ${
              !noBottomPadding ? 'pb-20' : ''
            } bg-background`}
          >
            {children}
          </View>
        </View>
      ) : (
        <View className="flex-1 px-4">
          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerClassName="bg-background"
          >
            <View
              className={`flex-1 ${
                !noBottomPadding ? 'pb-20' : ''
              } bg-background`}
            >
              {children}
            </View>
          </ScrollView>
        </View>
      )}
    </AppScreen>
  );
}
