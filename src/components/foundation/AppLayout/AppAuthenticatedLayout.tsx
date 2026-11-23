import { ScrollView, View } from 'react-native';

import { AppScreen } from '@/components/foundation/AppScreen';
import React from 'react';

interface AppAuthenticatedLayoutProps {
  children?: React.ReactNode;
  noBottomPadding?: boolean;
  withoutScrollView?: boolean;
  backgroundClassName?: string;
}

export function AppAuthenticatedLayout({
  children,
  noBottomPadding,
  withoutScrollView,
  backgroundClassName = 'bg-background',
}: AppAuthenticatedLayoutProps) {
  return (
    <AppScreen
      safeBottom={true}
      safeTop={false}
      className={`flex-1 ${backgroundClassName}`}
      contentClassName={`flex-1 ${backgroundClassName}`}
      safeArea={false}
    >
      {withoutScrollView ? (
        <View className="flex-1 px-4">
          <View
            className={`flex-1 ${
              !noBottomPadding ? 'pb-20' : ''
            } ${backgroundClassName}`}
          >
            {children}
          </View>
        </View>
      ) : (
        <View className="flex-1 px-4">
          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerClassName={backgroundClassName}
          >
            <View
              className={`flex-1 ${
                !noBottomPadding ? 'pb-20' : ''
              } ${backgroundClassName}`}
            >
              {children}
            </View>
          </ScrollView>
        </View>
      )}
    </AppScreen>
  );
}
