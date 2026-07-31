import { StyleSheet } from 'react-native';
import { Theme } from '@/theme';

export const styles = StyleSheet.create({
  container: {
    marginTop: Theme.spacing.xl,
    backgroundColor: Theme.colors.surface,

    borderRadius: 32,

    paddingHorizontal: 20,
    paddingVertical: 22,

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 5,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  title: {
    flex: 1,
    color: Theme.colors.text,
    marginRight: 12,
  },

  edit: {
    color: Theme.colors.primary,
  },

  list: {
    gap: 14,
    paddingHorizontal: 2,
  },

  option: {
    width: 80,
    height: 80,

    borderRadius: 12,

    borderWidth: 1,
    borderColor: Theme.colors.border,

    backgroundColor: Theme.colors.surface,

    justifyContent: 'center',
    alignItems: 'center',
  },

  selectedOption: {
    borderWidth: 2,
    borderColor: Theme.colors.primary,
    backgroundColor: Theme.colors.reflectionBackground,
  },

  emoji: {
    fontSize: 16,
  },

  optionTitle: {
    color: Theme.colors.text,
    textAlign: 'center',
  },

  selectedTitle: {
    color: Theme.colors.primary,
  },
});
