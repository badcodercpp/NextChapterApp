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
        <View className="mb-8">
          <View className="mt-4 items-center">
            <AppText variant="4xl" className="text-center text-text">
              How are you
              <AppText variant="4xl" className="text-primary">
                {' '}
                feeling
              </AppText>
            </AppText>
            <AppText variant="4xl" className="text-center text-text">
              today?
            </AppText>

            <AppText
              variant="sm"
              className="mt-2 text-center text-text-secondary"
            >
              Your feelings matter.
            </AppText>

            <AppText variant="sm" className="text-center text-text-secondary">
              Select all that apply.
            </AppText>
          </View>
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
                        className="mb-4 w-[48%]"
                        onPress={() =>
                          onChange(Array.from(new Set([...value, item.id])))
                        }
                      >
                        <AppCard
                          className={cn(
                            'rounded-2xl border p-4',
                            selected
                              ? 'border-primary bg-card'
                              : 'border-border bg-surface',
                          )}
                          onLayout={handleLayout}
                          style={
                            cardHeight ? { height: cardHeight } : undefined
                          }
                        >
                          {selected && (
                            <View className="absolute right-3 top-5 h-7 w-7 items-center justify-center rounded-full bg-primary">
                              <AppIcon
                                icon={Check}
                                size={16}
                                className="text-white"
                              />
                            </View>
                          )}

                          {!selected && (
                            <View className="absolute right-3 top-5 h-7 w-7 rounded-full border-2 border-divider" />
                          )}

                          <View className="mt-1 items-center justify-center">
                            <AppText className="text-5xl leading-h2">
                              {item.emoji}
                            </AppText>
                          </View>

                          <AppText
                            variant="xl"
                            className="mt-4 text-center text-text"
                          >
                            {item.title}
                          </AppText>

                          <AppText
                            variant="sm"
                            className=" text-center text-text-secondary"
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
