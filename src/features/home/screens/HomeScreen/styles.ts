import { Colors } from '@/theme/colors';
import { Spacing } from '@/theme/spacing';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    paddingHorizontal: Spacing.xs,
    // paddingTop: 60,
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  bell: {
    marginRight: Spacing.lg,
  },

  greeting: {
    marginTop: Spacing.lg,
  },

  subtitle: {
    marginTop: Spacing.md,
    width: '78%',
  },
});
