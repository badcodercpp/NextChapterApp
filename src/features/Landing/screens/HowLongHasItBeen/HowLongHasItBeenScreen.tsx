import { AppIcon, AppPressable, AppScreen, AppText } from '@/components';
import {
  ArrowRight,
  CalendarClock,
  Check,
  ChevronLeft,
  Lock,
} from 'lucide-react-native';
import { Controller } from 'react-hook-form';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { LandingNavigationProp } from '@/features/Landing/navigation/types';
import { TIMELINES } from '../../constants';
import { cn } from '@/utils';
import { useHowLongHasItBeen } from './useHowLongHasItBeen';
import { useScreenHeader } from '@/navigation/hooks';

export function HowLongHasItBeenScreen() {
  const { control, submitHowLongHasItBeen } = useHowLongHasItBeen();
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
              icon={CalendarClock}
              size={34}
              className="text-on-primary-v2"
            />
          </View>
          <AppText
            variant="3xl"
            className="mt-5 text-center font-bold text-text-v2"
          >
            How long has it been?
          </AppText>
          <AppText
            variant="sm"
            className="mt-3 text-center leading-body text-text-muted-v2"
          >
            This helps us support you better and personalize your journey.
          </AppText>
        </View>

        <Controller
          control={control}
          name="howLongHasItBeen"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <>
              <View accessibilityRole="radiogroup">
                {TIMELINES.map(item => {
                  const selected = value === item.id;
                  return (
                    <AppPressable
                      key={item.id}
                      accessibilityRole="radio"
                      accessibilityLabel={item.title}
                      accessibilityHint={item.subtitle}
                      accessibilityState={{ checked: selected }}
                      className={cn(
                        'mb-3 min-h-20 flex-row items-center rounded-3xl border p-4',
                        selected
                          ? 'border-primary-v2 bg-selected-v2'
                          : 'border-border-v2 bg-surface-v2',
                      )}
                      onPress={() => onChange(item.id)}
                    >
                      <View className="h-11 w-11 items-center justify-center rounded-xl bg-input-v2">
                        <AppIcon
                          icon={item.icon}
                          size={25}
                          className="text-link-v2"
                        />
                      </View>
                      <View className="mx-3 flex-1">
                        <AppText
                          variant="md"
                          className="font-semibold text-text-v2"
                        >
                          {item.title}
                        </AppText>
                        <AppText
                          variant="sm"
                          className="mt-1 text-text-muted-v2"
                        >
                          {item.subtitle}
                        </AppText>
                      </View>
                      <View
                        className={cn(
                          'h-5 w-5 items-center justify-center rounded-full border',
                          selected
                            ? 'border-primary-v2 bg-primary-v2'
                            : 'border-border-v2',
                        )}
                      >
                        {selected && (
                          <AppIcon
                            icon={Check}
                            size={13}
                            className="text-on-primary-v2"
                          />
                        )}
                      </View>
                    </AppPressable>
                  );
                })}
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
            onPress={submitHowLongHasItBeen}
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
