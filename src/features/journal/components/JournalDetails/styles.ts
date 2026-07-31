import { Colors } from '@/theme/colors';
import { Radius } from '@/theme/radius';
import { Spacing } from '@/theme/spacing';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  hero: {
    height: 320,
    position: 'relative',
    overflow: 'hidden',
  },

  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },

  iconButton: {
    width: 42,
    height: 42,
    borderRadius: Radius.full,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(255,255,255,0.95)',
  },

  sheet: {
    marginTop: -32,

    backgroundColor: Colors.surface,

    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,

    padding: Spacing.xl,

    paddingBottom: Spacing.xl,

    minHeight: 500,
  },

  moodRow: {
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: Spacing.lg,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: Spacing.sm,
  },

  titleContainer: {
    flex: 1,
  },

  title: {
    marginBottom: 4,
  },

  meta: {
    color: Colors.textSecondary,
  },

  section: {
    marginTop: Spacing.xl,
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginTop: Spacing['2xl'],

    gap: Spacing.md,
  },

  actionButton: {
    flex: 1,
  },

  moodChipContainer: {
    alignItems: 'flex-start',
    marginBottom: 16,
  },

  dotContainer: {
    marginHorizontal: 8,
  },
});
