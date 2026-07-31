import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  content: {
    flex: 1,
  },

  title: {},

  subtitle: {
    marginTop: 6,
  },

  avatarContainer: {
    marginLeft: 16,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
});
