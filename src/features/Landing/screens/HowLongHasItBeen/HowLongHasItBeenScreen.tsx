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
import { TIMELINES } from '../../constants';
import { cn } from '@/utils';
import { useState } from 'react';

export function HowLongHasItBeenScreen() {
  const [selected, setSelected] = useState('today');

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
              How long has it been?
            </AppText>

            <AppText
              variant="sm"
              className="mt-2 text-center text-text-secondary"
            >
              This helps us support you better {'\n'} and personalize your
              journey.
            </AppText>
          </View>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="flex-1">
            {TIMELINES.map(item => {
              const isSelected = selected === item.id;

              return (
                <AppPressable
                  key={item.id}
                  className="mb-5"
                  onPress={() => setSelected(item.id)}
                >
                  <AppCard
                    className={cn(
                      'flex-row items-center rounded-2xl border px-4 py-4',
                      isSelected
                        ? 'border-primary bg-card'
                        : 'border-border bg-surface',
                    )}
                  >
                    <AppIcon
                      icon={item.icon}
                      size={36}
                      className={
                        selected ? 'text-primary' : 'text-text-secondary'
                      }
                      strokeWidth={1}
                    />

                    <View className="flex-1 ml-4">
                      <AppText variant="xl" className="text-text">
                        {item.title}
                      </AppText>

                      <AppText variant="sm" className=" text-text-secondary">
                        {item.subtitle}
                      </AppText>
                    </View>

                    <View className="absolute right-4 top-7">
                      {isSelected && (
                        <View className="h-6 w-6 items-center justify-center rounded-full bg-primary">
                          <AppIcon
                            icon={Check}
                            size={16}
                            className="text-white"
                          />
                        </View>
                      )}
                    </View>
                  </AppCard>
                </AppPressable>
              );
            })}
          </View>
        </ScrollView>

        <View className=" bg-background pt-4">
          <AppButton
            title="Continue"
            size="lg"
            fullWidth
            onPress={() => {}}
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
