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

import LinearGradient from 'react-native-linear-gradient';
import { REASONS } from '../../constants';
import { cn } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

export function WhatBringsYouHereScreen() {
  const navigation = useNavigation();

  const [selectedReason, setSelectedReason] = useState('breakup');

  return (
    <View className="flex-1 bg-background">
      <AppScreen
        // scroll
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
            <View className="flex-row justify-center items-center">
              <AppText variant="4xl" className="text-center text-text">
                What brings
              </AppText>

              <AppText variant="4xl" className="text-center text-primary pl-1">
                you here?
              </AppText>
            </View>

            <AppText
              variant="sm"
              className="mt-2 px-4 text-center text-text-secondary leading-caption"
            >
              Everyone's journey is different. {'\n'} Let's personalize yours.
            </AppText>
          </View>
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <View className="flex-row flex-wrap justify-between">
              {REASONS.map(reason => {
                const selected = selectedReason === reason.id;

                return (
                  <AppPressable
                    key={reason.id}
                    className="mb-4 w-[48%]"
                    onPress={() => setSelectedReason(reason.id)}
                  >
                    <AppCard
                      className={cn(
                        'rounded-2xl border p-4',
                        selected
                          ? 'border-primary bg-card'
                          : 'border-border bg-surface',
                      )}
                    >
                      <View className="absolute right-4 top-5">
                        {selected && (
                          <View className="h-6 w-6 items-center justify-center rounded-full bg-primary">
                            <AppIcon
                              icon={Check}
                              size={16}
                              className="text-white"
                            />
                          </View>
                        )}
                      </View>

                      <AppIcon
                        icon={reason.icon}
                        size={36}
                        className={
                          selected ? 'text-primary' : 'text-text-secondary'
                        }
                        strokeWidth={1}
                      />

                      <View className="mt-5">
                        <AppText variant="lg" className="text-text">
                          {reason.title}
                        </AppText>

                        <AppText
                          variant="sm"
                          className="mt-2 text-text-secondary"
                        >
                          {reason.description}
                        </AppText>
                      </View>
                    </AppCard>
                  </AppPressable>
                );
              })}
            </View>
          </ScrollView>

          <View>
            <View className="mt-4">
              <AppButton
                title="Continue"
                size="lg"
                fullWidth
                onPress={() => navigation.navigate('HowLongHasItBeen' as never)}
                rightIcon={ArrowRight}
              />
            </View>

            <View className="mt-2 flex-row justify-center items-center">
              <AppIcon icon={Lock} size={16} className="text-primary" />
              <AppText
                variant="sm"
                className="px-1 text-center text-text-muted "
              >
                Your privacy is our privacy.
              </AppText>
            </View>
          </View>
        </View>
      </AppScreen>
    </View>
  );
}
