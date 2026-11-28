import { Pressable, View } from 'react-native';
import React, { createContext, useContext } from 'react';

import { AppIcon } from '../AppIcon';
import { AppText } from '../AppText';
import { LockKeyhole } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

interface CardAccess {
  locked: boolean;
  openPremium: () => void;
}

export const CardAccessContext = createContext<CardAccess | null>(null);

export function useCardAccess() {
  return useContext(CardAccessContext);
}

export function CardLockOverlay({ onPress }: { onPress: () => void }) {
  const { t } = useTranslation();
  const label = t('app.locale.premium.unlockCard');

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      className="absolute inset-x-0 bottom-0 min-h-1/3 items-center justify-center rounded-[24px] bg-background-v2 px-2"
    >
      <View className="py-2">
        <AppIcon icon={LockKeyhole} size={26} className="text-link-v2" />
        <AppText
          variant="xs"
          className="mt-1 text-center font-semibold text-link-v2"
        >
          {label}
        </AppText>
      </View>
    </Pressable>
  );
}

export function CardAccessBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  const access = useCardAccess();
  if (!access?.locked) {
    return <>{children}</>;
  }

  return (
    <View className="relative">
      <View
        pointerEvents="none"
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      >
        <CardAccessContext.Provider value={null}>
          {children}
        </CardAccessContext.Provider>
      </View>
      <CardLockOverlay onPress={access.openPremium} />
    </View>
  );
}
