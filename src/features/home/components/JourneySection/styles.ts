import { StyleSheet } from 'react-native';
import { Theme } from '@/theme';

export const styles = StyleSheet.create({
  container: {
    marginTop: Theme.spacing.xl,

    padding: 24,

    borderRadius: 18,

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

  content: {
    marginTop: 24,

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',
  },

  left: {
    flex: 1,
  },

  right: {
    width: 120,

    alignItems: 'center',
  },

  dayRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  marginTop: {
    marginTop: 12,
  },

  totalDays: {
    marginLeft: 6,
    marginBottom: 5,
  },

  phaseLabel: {
    marginTop: 8,
  },

  score: {
    marginTop: 4,
  },

  changeRow: {
    marginTop: 6,

    flexDirection: 'row',

    alignItems: 'center',
  },

  changeText: {
    marginLeft: 4,

    color: Theme.colors.success,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerTitle: {
    marginLeft: 8,
    marginRight: 4,
  },

  footer: {
    marginTop: 28,
  },

  footerLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginBottom: 10,
  },

  progressTrack: {
    height: 10,

    borderRadius: 999,

    overflow: 'hidden',

    backgroundColor: '#F3F1EE',
  },

  progressFill: {
    height: '100%',

    borderRadius: 999,

    backgroundColor: Theme.colors.primary,
  },

  topRow: {
    flexDirection: 'row',

    alignItems: 'flex-start',

    justifyContent: 'space-between',
  },

  progressContainer: {
    flex: 1,
  },

  scoreContainer: {
    alignItems: 'center',

    marginHorizontal: 20,
  },

  ringContainer: {
    width: 70,

    alignItems: 'flex-end',
  },

  phase: {
    marginTop: 10,
    marginBottom: 24,
  },

  horizontalSpacing: {
    marginHorizontal: 8,
  },
});
