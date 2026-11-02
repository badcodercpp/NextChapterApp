import { Image, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { useCSSVariable } from 'uniwind';

export function LandingBackground() {
  const background = useCSSVariable('--color-landing-background');
  if (typeof background !== 'string') {
    throw new Error(
      'The landing background color must be defined in global.css',
    );
  }

  return (
    <View
      pointerEvents="none"
      accessible={false}
      className="absolute bottom-0 left-0 right-0 h-[55%]"
    >
      <Image
        source={require('@/assets/images/landing-background.png')}
        resizeMode="cover"
        className="h-full w-full"
      />
      <View className="absolute top-0 bottom-0 left-0 right-0">
        <Svg width="100%" height="100%" color={background}>
          <Defs>
            <LinearGradient
              id="landing-artwork-fade"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <Stop offset="0" stopColor={background} stopOpacity={1} />
              <Stop offset="0.28" stopColor={background} stopOpacity={0} />
              <Stop offset="0.6" stopColor={background} stopOpacity={0} />
              <Stop offset="0.86" stopColor={background} stopOpacity={0.65} />
              <Stop offset="1" stopColor={background} stopOpacity={1} />
            </LinearGradient>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#landing-artwork-fade)" />
        </Svg>
      </View>
    </View>
  );
}
