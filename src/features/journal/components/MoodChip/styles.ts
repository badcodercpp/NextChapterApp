import { StyleSheet } from 'react-native';
import { Theme } from '@/theme';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  circle: {
    // width: MoodChipConfig.circleSize,
    // height: MoodChipConfig.circleSize,
    // borderRadius: MoodChipConfig.circleSize / 2,

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 2,
    borderColor: Theme.colors.border,
  },

  selectedCircle: {},

  emoji: {
    // fontSize: MoodChipConfig.emojiSize,
    // lineHeight: 48,
  },

  label: {
    // marginTop: MoodChipConfig.labelSpacing,
    textAlign: 'center',
  },
});
