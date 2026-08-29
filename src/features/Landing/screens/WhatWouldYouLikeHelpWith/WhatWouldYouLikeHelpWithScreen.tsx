import {
  AppButton,
  AppCard,
  AppIcon,
  AppPressable,
  AppScreen,
  AppText,
} from '@/components';
import { ArrowRight, Check, Lock } from 'lucide-react-native';
import { ImageBackground, ScrollView, View } from 'react-native';

import { Controller } from 'react-hook-form';
import { GOALS } from '../../constants';
import LinearGradient from 'react-native-linear-gradient';
import { cn } from '@/utils';
import { useWhatWouldYouLikeHelpWith } from './useWhatWouldYouLikeHelpWith';

export function WhatWouldYouLikeHelpWithScreen() {
  const { control, submitWhatWouldYouLikeHelpWith } =
    useWhatWouldYouLikeHelpWith();

  return (
    <AppScreen
      safeBottom={true}
      safeTop={false}
      className="flex-1 bg-background"
      contentClassName="flex-1 bg-background"
      safeArea={false}
    >
      <View className="items-center pt-4 h-[150px]">
        <ImageBackground
          source={require('@/assets/images/landing-background.png')}
          resizeMode="cover"
          className="absolute top-0 left-0 right-0 h-[150px] w-full"
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ width: '100%' }}
        >
          <LinearGradient
            colors={[
              '#141129',
              'rgba(20,17,41,0.75)',
              'transparent',
              'rgba(20,17,41,0.75)',
            ]}
            locations={[0, 0.7, 0.45, 0.2]}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              position: 'absolute',
              inset: 0,
            }}
          />
        </ImageBackground>
      </View>
      <View className="flex-1 px-4">
        <View className="mt-4 items-center mb-8">
          <AppText variant="4xl" className="text-center text-text">
            What would you like
          </AppText>

          <AppText variant="4xl" className="text-center text-primary">
            help
            <AppText variant="4xl" className="text-text">
              {' '}
              with?
            </AppText>
          </AppText>

          <AppText
            variant="sm"
            className="mt-2 text-center text-text-secondary"
          >
            Choose what matters most to you.
          </AppText>

          <AppText variant="sm" className="text-center text-text-secondary">
            You can always change it later.
          </AppText>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <Controller
            control={control}
            name="whatWouldYouLikeHelpWith"
            render={({ field: { value, onChange } }) => (
              <View className="flex-1">
                {GOALS.map(goal => {
                  const selected = value.includes(goal.id);

                  return (
                    <AppPressable
                      key={goal.id}
                      className="mb-4"
                      onPress={() =>
                        onChange(Array.from(new Set([...value, goal.id])))
                      }
                    >
                      <AppCard
                        className={cn(
                          'flex-row items-center rounded-2xl border p-4',
                          selected
                            ? 'border-primary bg-card'
                            : 'border-border bg-surface',
                        )}
                      >
                        {selected && (
                          <View className="absolute right-3 top-8 h-7 w-7 items-center justify-center rounded-full bg-primary">
                            <AppIcon
                              icon={Check}
                              size={16}
                              className="text-white"
                            />
                          </View>
                        )}

                        {!selected && (
                          <View className="absolute right-3 top-8 h-7 w-7 rounded-full border-2 border-divider" />
                        )}
                        <AppIcon
                          icon={goal.icon}
                          size={30}
                          className="text-primary"
                        />

                        <View className="flex-1 pr-8 ml-4">
                          <AppText variant="xl" className="text-text">
                            {goal.title}
                          </AppText>

                          <AppText
                            variant="sm"
                            className="mt-1 text-text-secondary"
                          >
                            {goal.subtitle}
                          </AppText>
                        </View>
                      </AppCard>
                    </AppPressable>
                  );
                })}
              </View>
            )}
          />
        </ScrollView>

        <View className=" bg-background pt-4">
          <AppButton
            title="Continue"
            size="lg"
            fullWidth
            onPress={submitWhatWouldYouLikeHelpWith}
            rightIcon={ArrowRight}
          />

          <View className="mt-2 flex-row justify-center items-center">
            <AppIcon icon={Lock} size={16} className="text-primary" />
            <AppText variant="sm" className="px-1 text-center text-text-muted ">
              Your privacy is our privacy.
            </AppText>
          </View>
        </View>
      </View>
    </AppScreen>
  );
}
