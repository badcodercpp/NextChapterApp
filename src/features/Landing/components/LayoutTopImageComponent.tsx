import { ImageBackground, ImageSourcePropType, View } from 'react-native';

import { FC } from 'react';
import LinearGradient from 'react-native-linear-gradient';

interface LayoutTopImageComponentProps {
  source: ImageSourcePropType;
}

export const LayoutTopImageComponent: FC<LayoutTopImageComponentProps> = ({
  source,
}) => {
  return (
    <View className="items-center pt-4 h-[150px]">
      <ImageBackground
        source={source}
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
  );
};
