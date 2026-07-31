import { StyleSheet } from 'react-native';
import { Theme } from '@/theme';

export const styles = StyleSheet.create({
  container: {
    marginTop: Theme.spacing.xl,

    borderRadius: 28,
    overflow: 'hidden',

    backgroundColor: Theme.colors.reflectionBackground,
  },

  content: {
    flex: 1,

    flexDirection: 'row',
    alignItems: 'center',

    paddingLeft: 24,
    paddingRight: 0,
    paddingVertical: 24,
  },

  left: {
    flex: 1,
    paddingRight: 12,
  },

  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 12,
  },

  badgeIcon: {
    fontSize: 14,
    marginRight: 6,
  },

  badge: {
    color: Theme.colors.primary,
    letterSpacing: 1,
    marginLeft: 6,
  },

  title: {
    color: Theme.colors.text,
    marginBottom: 12,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  action: {
    color: Theme.colors.primary,
  },

  arrow: {
    marginLeft: 6,
    color: Theme.colors.primary,
  },

  illustrationContainer: {
    justifyContent: 'center',
    alignItems: 'center',

    // marginLeft: 8,
  },

  illustration: {
    width: 150,
    height: 150,

    resizeMode: 'contain',
  },
});
