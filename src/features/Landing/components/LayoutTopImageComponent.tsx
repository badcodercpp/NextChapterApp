import { ImageBackground, ImageSourcePropType, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { FC } from 'react';
import { useCSSVariable } from 'uniwind';

interface LayoutTopImageComponentProps {
  source: ImageSourcePropType;
}

export const LayoutTopImageComponent: FC<LayoutTopImageComponentProps> = ({
  source,
}) => {
  const background = useCSSVariable('--color-background');
  if (typeof background !== 'string') {
    throw new Error('The background color must be defined in global.css');
  }

  return (
    <View className="items-center pt-4 h-[150px]">
      <ImageBackground
        source={source}
        resizeMode="cover"
        className="absolute top-0 left-0 right-0 h-[150px] w-full"
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ width: '100%' }}
      >
        <View
          pointerEvents="none"
          accessible={false}
          className="absolute inset-0"
        >
          <Svg width="100%" height="100%">
            <Defs>
              <LinearGradient
                id="auth-top-image-fade"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <Stop offset="0.35" stopColor={background} stopOpacity={0} />
                <Stop offset="1" stopColor={background} stopOpacity={1} />
              </LinearGradient>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#auth-top-image-fade)" />
          </Svg>
        </View>
      </ImageBackground>
    </View>
  );
};
