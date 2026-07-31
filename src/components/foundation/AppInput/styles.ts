import { StyleSheet } from 'react-native';
import { Theme } from '@/theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },

  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  required: {
    marginLeft: 2,
    color: Theme.colors.error,
  },

  inputContainer: {
    minHeight: 52,

    borderRadius: 16,

    borderWidth: 1,

    borderColor: Theme.colors.border,

    backgroundColor: Theme.colors.surface,

    flexDirection: 'row',

    alignItems: 'center',

    paddingHorizontal: 16,
  },

  focused: {
    borderColor: Theme.colors.primary,
  },

  error: {
    borderColor: Theme.colors.error,
  },

  disabled: {
    opacity: 0.5,
  },

  readOnly: {
    backgroundColor: Theme.colors.backgroundSecondary,
  },

  startIcon: {
    marginRight: 12,
  },

  endIcon: {
    marginLeft: 12,

    justifyContent: 'center',

    alignItems: 'center',
  },

  input: {
    flex: 1,

    color: Theme.colors.text,

    paddingVertical: 14,

    includeFontPadding: false,

    textAlignVertical: 'center',
  },

  helperContainer: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

    marginTop: 6,
  },

  helperText: {
    flex: 1,
  },

  counter: {
    marginLeft: 8,
  },
});
