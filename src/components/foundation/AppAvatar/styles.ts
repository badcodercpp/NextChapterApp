import { StyleSheet } from 'react-native';
import { Theme } from '@/theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderColor: Theme.colors.border,
    borderWidth: 2,
    ...Theme.shadows.sm,
  },

  initials: {
    color: Theme.colors.primary,
    fontWeight: '700',
  },
});
