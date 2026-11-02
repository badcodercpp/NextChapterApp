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
      className="bg-login-background"
      contentClassName="grow items-center bg-login-background px-5 pb-6 pt-2"
    >
      <View className="w-full max-w-md flex-1">
        <AppPressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          className="h-10 w-10 items-center justify-center rounded-full border border-login-border bg-login-surface"
          onPress={() => navigation.goBack()}
        >
          <AppIcon icon={ChevronLeft} size={22} className="text-login-text" />
        </AppPressable>

        <View className="items-center pb-6 pt-5">
          <View className="h-20 w-20 items-center justify-center rounded-3xl bg-login-primary">
            <AppIcon icon={CalendarClock} size={34} className="text-white" />
          </View>
          <AppText
            variant="3xl"
            className="mt-5 text-center font-bold text-login-text"
          >
            How long has it been?
          </AppText>
          <AppText
            variant="sm"
            className="mt-3 text-center leading-body text-login-muted"
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
                          ? 'border-login-primary bg-login-selected'
                          : 'border-login-border bg-login-surface',
                      )}
                      onPress={() => onChange(item.id)}
                    >
                      <View className="h-11 w-11 items-center justify-center rounded-xl bg-login-input">
                        <AppIcon
                          icon={item.icon}
                          size={25}
                          className="text-login-link"
                        />
                      </View>
                      <View className="mx-3 flex-1">
                        <AppText
                          variant="md"
                          className="font-semibold text-login-text"
                        >
                          {item.title}
                        </AppText>
                        <AppText variant="sm" className="mt-1 text-login-muted">
                          {item.subtitle}
                        </AppText>
                      </View>
                      <View
                        className={cn(
                          'h-5 w-5 items-center justify-center rounded-full border',
                          selected
                            ? 'border-login-primary bg-login-primary'
                            : 'border-login-border',
                        )}
                      >
                        {selected && (
                          <AppIcon
                            icon={Check}
                            size={13}
                            className="text-white"
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
            className="min-h-14 flex-row items-center justify-center rounded-2xl bg-login-primary px-4 py-4"
            onPress={submitHowLongHasItBeen}
          >
            <AppText variant="lg" className="font-semibold text-white">
              Continue
            </AppText>
            <View className="ml-3">
              <AppIcon icon={ArrowRight} size={22} className="text-white" />
            </View>
          </AppPressable>
          <View className="mt-4 flex-row items-center justify-center">
            <AppIcon icon={Lock} size={13} className="text-login-muted" />
            <AppText variant="xs" className="ml-2 text-center text-login-muted">
              Your privacy is our privacy.
            </AppText>
          </View>
        </View>
      </View>
    </AppScreen>
  );
}
