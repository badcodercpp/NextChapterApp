import { AppIcon, AppPressable, AppScreen, AppText } from '@/components';
import {
  ArrowRight,
  Check,
  ChevronLeft,
  HeartHandshake,
  Lock,
} from 'lucide-react-native';
import { Controller } from 'react-hook-form';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { LandingNavigationProp } from '@/features/Landing/navigation/types';
import { REASONS } from '../../constants';
import { cn } from '@/utils';
import { useScreenHeader } from '@/navigation/hooks';
import { useWhatBringsYouHere } from './useWhatBringsYouHere';

export function WhatBringsYouHereScreen() {
  const { control, submitWhatBringsYouHere } = useWhatBringsYouHere();
  const navigation = useNavigation<LandingNavigationProp>();

  useScreenHeader({ headerShown: false });

  return (
    <AppScreen
      scroll
      safeArea={false}
      className="bg-background-v2"
      contentClassName="grow items-center bg-background-v2 px-5 pb-6 pt-2"
    >
      <View className="w-full max-w-md flex-1">
        <AppPressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          className="h-10 w-10 items-center justify-center rounded-full border border-border-v2 bg-surface-v2"
          onPress={() => navigation.goBack()}
        >
          <AppIcon icon={ChevronLeft} size={22} className="text-text-v2" />
        </AppPressable>

        <View className="items-center pb-6 pt-5">
          <View className="h-20 w-20 items-center justify-center rounded-3xl bg-primary-v2">
            <AppIcon
              icon={HeartHandshake}
              size={34}
              className="text-on-primary-v2"
            />
          </View>
          <AppText
            variant="3xl"
            className="mt-5 text-center font-bold text-text-v2"
          >
            What brings you here?
          </AppText>
          <AppText
            variant="sm"
            className="mt-3 text-center leading-body text-text-muted-v2"
          >
            Everyone's journey is different. Let's personalize yours.
          </AppText>
        </View>

        <Controller
          control={control}
          name="whatBringsYouHere"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <>
              <View accessibilityRole="radiogroup">
                {REASONS.filter((_, index) => index % 2 === 0).map((_, row) => (
                  <View key={row} className="mb-3 flex-row items-stretch gap-3">
                    {REASONS.slice(row * 2, row * 2 + 2).map(reason => {
                      const selected = value === reason.id;
                      return (
                        <AppPressable
                          key={reason.id}
                          accessibilityRole="radio"
                          accessibilityLabel={reason.title}
                          accessibilityHint={reason.description}
                          accessibilityState={{ checked: selected }}
                          className={cn(
                            'min-h-44 flex-1 rounded-3xl border p-4',
                            selected
                              ? 'border-primary-v2 bg-selected-v2'
                              : 'border-border-v2 bg-surface-v2',
                          )}
                          onPress={() => onChange(reason.id)}
                        >
                          <View className="mb-4 flex-row items-start justify-between">
                            <View className="h-10 w-10 items-center justify-center rounded-xl bg-input-v2">
                              <AppIcon
                                icon={reason.icon}
                                size={24}
                                className="text-link-v2"
                              />
                            </View>
                            {selected && (
                              <View className="h-5 w-5 items-center justify-center rounded-full bg-primary-v2">
                                <AppIcon
                                  icon={Check}
                                  size={13}
                                  className="text-on-primary-v2"
                                />
                              </View>
                            )}
                          </View>
                          <AppText
                            variant="md"
                            className="font-semibold text-text-v2"
                          >
                            {reason.title}
                          </AppText>
                          <AppText
                            variant="sm"
                            className="mt-2 text-text-muted-v2"
                          >
                            {reason.description}
                          </AppText>
                        </AppPressable>
                      );
                    })}
                  </View>
                ))}
              </View>
              {error && (
                <AppText
                  accessibilityRole="alert"
                  variant="sm"
                  className="mb-3 text-center text-error"
                >
                  {error.message}
                </AppText>
              )}
            </>
          )}
        />

        <View className="mt-auto pt-3">
          <AppPressable
            accessibilityRole="button"
            accessibilityLabel="Continue"
            className="min-h-14 flex-row items-center justify-center rounded-2xl bg-primary-v2 px-4 py-4"
            onPress={submitWhatBringsYouHere}
          >
            <AppText variant="lg" className="font-semibold text-on-primary-v2">
              Continue
            </AppText>
            <View className="ml-3">
              <AppIcon
                icon={ArrowRight}
                size={22}
                className="text-on-primary-v2"
              />
            </View>
          </AppPressable>
          <View className="mt-4 flex-row items-center justify-center">
            <AppIcon icon={Lock} size={13} className="text-text-muted-v2" />
            <AppText
              variant="xs"
              className="ml-2 text-center text-text-muted-v2"
            >
              Your privacy is our privacy.
            </AppText>
          </View>
        </View>
      </View>
    </AppScreen>
  );
}
