import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    // height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingHorizontal: 16,
  },

  side: {
    width: 60,
    justifyContent: 'center',
  },

  left: {
    alignItems: 'flex-start',
  },

  right: {
    alignItems: 'flex-end',
  },

  title: {
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 8,
  },

  save: {
    fontSize: 17,
    fontWeight: '600',
  },
});
