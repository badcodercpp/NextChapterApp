import {
  AppButton,
  AppCard,
  AppIcon,
  AppPressable,
  AppScreen,
  AppText,
} from '@/components';
import { ArrowRight, Check, Lock } from 'lucide-react-native';
import {
  ImageBackground,
  LayoutChangeEvent,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { Controller } from 'react-hook-form';
import { FEELINGS } from '../../constants';
import LinearGradient from 'react-native-linear-gradient';
import { cn } from '@/utils';
import { useHowAreYouFeeling } from './useHowAreYouFeeling';
import { useState } from 'react';

export function HowAreYouFeelingScreen() {
  const [cardHeight, setCardHeight] = useState(0);

  const { control, submitHowAreYouFeeling } = useHowAreYouFeeling();

  const handleLayout = (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;
    setCardHeight(prev => Math.max(prev, height));
  };

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
            How are you
            <AppText variant="4xl" className="font-bold text-primary">
              {' '}
              feeling
            </AppText>
          </AppText>
          <AppText variant="4xl" className="text-center font-bold text-text">
            today?
          </AppText>
          <AppText
            variant="sm"
            className="mt-2 text-center text-text-secondary"
          >
            Your feelings matter. Select all that apply.
          </AppText>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="flex-1">
            <Controller
              control={control}
              name="howAreYouFeeling"
              render={({ field: { value, onChange } }) => (
                <View className="flex-row flex-wrap justify-between">
                  {FEELINGS.map(item => {
                    const selected = value.includes(item.id);

                    return (
                      <AppPressable
                        key={item.id}
                        className="mb-3 w-[48.5%]"
                        onPress={() =>
                          onChange(Array.from(new Set([...value, item.id])))
                        }
                      >
                        <AppCard
                          className={cn(
                            'rounded-2xl border p-3',
                            selected
                              ? 'border-primary bg-primary/25'
                              : 'border-white/10 bg-white/5',
                          )}
                          onLayout={handleLayout}
                          style={
                            cardHeight ? { height: cardHeight } : undefined
                          }
                        >
                          <View
                            className={cn(
                              'absolute right-2 top-2 h-6 w-6 items-center justify-center rounded-full',
                              selected
                                ? 'bg-primary'
                                : 'border-2 border-divider',
                            )}
                          >
                            {selected && (
                              <AppIcon
                                icon={Check}
                                size={14}
                                className="text-white"
                              />
                            )}
                          </View>

                          <View className="h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                            <AppText className="text-2xl leading-h2">
                              {item.emoji}
                            </AppText>
                          </View>
                          <AppText
                            variant="lg"
                            className="mt-2 font-semibold text-text"
                          >
                            {item.title}
                          </AppText>
                          <AppText
                            variant="xs"
                            className="mt-0.5 text-text-secondary"
                          >
                            {item.subtitle}
                          </AppText>
                        </AppCard>
                      </AppPressable>
                    );
                  })}
                </View>
              )}
            />
          </View>
        </ScrollView>

        <View className=" bg-background pt-4">
          <AppButton
            title="Continue"
            size="lg"
            fullWidth
            onPress={submitHowAreYouFeeling}
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
