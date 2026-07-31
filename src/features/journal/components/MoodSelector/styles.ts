import { MoodSelectorConfig } from './config';
import { StyleSheet } from 'react-native';
import { Theme } from '@/theme';

export const styles = StyleSheet.create({
  content: {
    // paddingHorizontal: MoodSelectorConfig.contentPaddingHorizontal,
    gap: MoodSelectorConfig.itemSpacing,
    marginBottom: 16,
    // backgroundColor: Theme.colors.surface,
    // padding: 16,
    // borderRadius: 24,
  },

  item: {
    alignItems: 'center',
    width: MoodSelectorConfig.circleSize,
  },

  circle: {
    width: MoodSelectorConfig.circleSize,
    height: MoodSelectorConfig.circleSize,
    borderRadius: MoodSelectorConfig.circleSize / 2,

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: MoodSelectorConfig.borderWidth,
    borderColor: Theme.colors.border,
  },

  selectedCircle: {},

  emoji: {
    fontSize: MoodSelectorConfig.emojiSize,
    lineHeight: 48,
  },

  label: {
    marginTop: MoodSelectorConfig.labelSpacing,
    textAlign: 'center',
  },

  selectedLabel: {},

  titleContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
});
