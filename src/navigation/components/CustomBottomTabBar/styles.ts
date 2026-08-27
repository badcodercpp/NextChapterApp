import { StyleSheet } from 'react-native';
import { TAB_BAR_HEIGHT } from '@/navigation/constants';

export const styles = StyleSheet.create({
  parentContainer: {
    position: 'absolute',

    left: 0,
    right: 0,
    bottom: 0,

    height: TAB_BAR_HEIGHT + 20,
  },
  container: {
    position: 'absolute',

    left: 0,
    right: 0,
    bottom: 0,

    height: TAB_BAR_HEIGHT,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 12,

    borderRadius: 24,
  },

  button: {
    height: 52,

    borderRadius: 26,

    justifyContent: 'center',
    alignItems: 'center',

    paddingHorizontal: 14,
  },

  activeButton: {
    flexDirection: 'row',

    paddingHorizontal: 18,
  },

  label: {
    marginLeft: 8,
  },
});
