import { Colors } from '@/theme/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',

    right: 24,

    bottom: 24,

    justifyContent: 'center',

    alignItems: 'center',

    flexDirection: 'row',

    backgroundColor: Colors.primary,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.18,

    shadowRadius: 8,

    elevation: 6,
  },

  label: {
    marginLeft: 10,
  },
});
