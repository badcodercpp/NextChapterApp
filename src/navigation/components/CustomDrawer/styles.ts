import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
  },

  scrollContent: {
    flexGrow: 1,
  },

  /* Header */

  header: {
    alignItems: 'center',
    paddingVertical: 28,
  },

  avatar: {
    marginBottom: 16,
  },

  greeting: {
    marginTop: 12,
    marginBottom: 4,
  },

  name: {
    marginBottom: 8,
  },

  subtitle: {
    textAlign: 'center',
  },

  /* Menu */

  menu: {
    marginTop: 20,
  },

  sectionTitle: {
    marginBottom: 12,
    marginLeft: 16,
  },

  divider: {
    height: 1,
    marginVertical: 24,
  },

  /* Drawer Item */

  item: {
    paddingHorizontal: 18,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
  },

  activeItem: {},

  iconContainer: {
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  label: {
    marginLeft: 16,
    flex: 1,
  },

  activeLabel: {
    fontWeight: '600',
  },

  /* Footer */

  footer: {
    marginTop: 'auto',
    paddingTop: 20,
    paddingBottom: 24,
  },

  version: {
    textAlign: 'center',
    marginTop: 20,
  },
});
