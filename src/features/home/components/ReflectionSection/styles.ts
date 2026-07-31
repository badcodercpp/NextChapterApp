import { StyleSheet } from 'react-native';
import { Theme } from '@/theme';

export const styles = StyleSheet.create({
  container: {
    marginTop: Theme.spacing.xl,
  },

  /* Header */

  header: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  seeAll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  /* Card */

  card: {
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#FFF9F5',
  },

  background: {
    ...StyleSheet.absoluteFill,
  },

  /* Layout */

  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 24,
    paddingRight: 0,
    paddingVertical: 24,
  },

  left: {
    flex: 1,
    paddingRight: 20,
  },

  /* Question */

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  question: {
    marginTop: 12,
  },

  description: {
    marginTop: 16,
  },

  /* Bottom */

  bottomRow: {
    marginTop: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },

  /* Button */

  button: {
    height: 56,
    width: 210,
    borderRadius: 28,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  /* Time Chip */

  chip: {
    marginLeft: 16,
  },

  /* Illustration */

  illustration: {
    width: 90,
    height: 150,
  },

  questionDesc: {
    marginTop: 8,
  },
});
