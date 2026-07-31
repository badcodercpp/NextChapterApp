import { Colors, Radius, Shadows, Spacing } from '@/theme';

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {},

  navigationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  iconButton: {
    width: 40,
    height: 40,
    borderRadius: Radius.full,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.lg,
  },

  notificationButton: {
    marginRight: Spacing['5xl'],
  },

  notificationDot: {
    position: 'absolute',

    top: -2,
    right: -3,

    width: 6,
    height: 6,
    borderRadius: 3,

    backgroundColor: Colors.primary,
  },

  greetingRow: {
    marginTop: Spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  greetingContainer: {
    flex: 1,
    marginRight: Spacing.lg,
    maxWidth: 240,
  },

  title: {
    marginBottom: Spacing.xs,
  },

  subtitle: {
    lineHeight: 24,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
});
