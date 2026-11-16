import {
  AppButton,
  AppCard,
  AppIcon,
  AppPressable,
  AppScreen,
  AppText,
} from '@/components';
import { ArrowRight, Check, Lock } from 'lucide-react-native';
import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native';

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
      <View className="h-[150px]">
        <ImageBackground
          source={require('@/assets/images/landing-background.png')}
          resizeMode="cover"
          className="h-[150px] w-full"
        >
          <LinearGradient
            colors={[
              'rgba(46,16,101,0.55)',
              'rgba(46,16,101,0.35)',
              '#141129',
            ]}
            locations={[0, 0.5, 1]}
            style={StyleSheet.absoluteFill}
          />
        </ImageBackground>
      </View>
      <View className="flex-1 px-4">
        <View className="mb-4 items-center">
          <AppText variant="4xl" className="text-center font-bold text-text">
            What would you like
          </AppText>
          <AppText variant="4xl" className="text-center font-bold text-primary">
            help
            <AppText variant="4xl" className="font-bold text-text">
              {' '}
              with?
            </AppText>
          </AppText>
          <AppText
            variant="sm"
            className="mt-2 text-center text-text-secondary"
          >
            Choose what matters most to you. You can always change it later.
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
                      className="mb-3"
                      onPress={() =>
                        onChange(Array.from(new Set([...value, goal.id])))
                      }
                    >
                      <AppCard
                        className={cn(
                          'flex-row items-center rounded-2xl border p-3',
                          selected
                            ? 'border-primary bg-primary/25'
                            : 'border-white/10 bg-white/5',
                        )}
                      >
                        <View className="h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                          <AppIcon
                            icon={goal.icon}
                            size={24}
                            className="text-primary"
                          />
                        </View>

                        <View className="ml-3 flex-1 pr-9">
                          <AppText
                            variant="lg"
                            className="font-semibold text-text"
                          >
                            {goal.title}
                          </AppText>
                          <AppText variant="sm" className="text-text-secondary">
                            {goal.subtitle}
                          </AppText>
                        </View>

                        <View
                          className={cn(
                            'absolute right-3 h-7 w-7 items-center justify-center rounded-full',
                            selected ? 'bg-primary' : 'border-2 border-divider',
                          )}
                        >
                          {selected && (
                            <AppIcon
                              icon={Check}
                              size={16}
                              className="text-white"
                            />
                          )}
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
