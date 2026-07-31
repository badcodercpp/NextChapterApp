import { StyleSheet } from 'react-native';
import { Theme } from '@/theme';

export const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },

  card: {
    padding: 20,
    backgroundColor: Theme.colors.surface,

    shadowColor: '#000',

    shadowOpacity: 0.05,

    shadowRadius: 18,

    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 4,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },

  title: {
    flex: 1,
    marginLeft: 12,
  },

  preview: {
    marginTop: 16,
  },

  footer: {
    marginTop: 16,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
