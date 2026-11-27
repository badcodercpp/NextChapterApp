import React, { createContext, useContext } from 'react';
import { Pressable, View } from 'react-native';
import { LockKeyhole } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { AppIcon } from '../AppIcon';
import { AppText } from '../AppText';

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
  const label = t('app.locale.premium.unlockCard', {
    defaultValue: 'Locked. Upgrade to Premium',
  });

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      className="absolute inset-0 items-center justify-center rounded-[24px] bg-background-v2/90 px-2"
    >
      <AppIcon icon={LockKeyhole} size={26} className="text-link-v2" />
      <AppText
        variant="xs"
        className="mt-1 text-center font-semibold text-link-v2"
      >
        {label}
      </AppText>
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
