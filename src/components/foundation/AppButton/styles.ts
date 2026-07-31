import { Radius } from '@/theme/radius';
import { Spacing } from '@/theme/spacing';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Radius.full,
  },

  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconLeft: {
    marginRight: Spacing.sm,
  },

  iconRight: {
    marginLeft: Spacing.sm,
  },
});
