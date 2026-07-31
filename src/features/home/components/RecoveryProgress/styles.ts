import { PROGRESS_BAR_HEIGHT } from './constants';
import { Radius } from '@/theme/radius';
import { Spacing } from '@/theme/spacing';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {},

  title: {
    marginBottom: Spacing.lg,
  },

  progressContainer: {
    overflow: 'hidden',
    height: PROGRESS_BAR_HEIGHT,
    borderRadius: Radius.full,
  },

  progressFill: {
    height: '100%',
    borderRadius: Radius.full,
  },

  footer: {
    marginTop: Spacing.md,

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',
  },
});
