import { Fonts } from './fonts';
import { LineHeights } from './line-heights';

export const Typography = {
  // Hero
  display: {
    fontFamily: Fonts.bold,
    fontSize: 40,
    lineHeight: LineHeights.display,
  },

  // Headings
  h1: {
    fontFamily: Fonts.bold,
    fontSize: 32,
    lineHeight: LineHeights.h1,
  },

  h2: {
    fontFamily: Fonts.bold,
    fontSize: 28,
    lineHeight: LineHeights.h2,
  },

  h3: {
    fontFamily: Fonts.semiBold,
    fontSize: 24,
    lineHeight: LineHeights.h3,
  },

  // Titles
  titleLarge: {
    fontFamily: Fonts.semiBold,
    fontSize: 20,
    lineHeight: LineHeights.titleLarge,
  },

  titleLargeBold: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    lineHeight: LineHeights.titleLarge,
  },

  titleLargeExtraBold: {
    fontFamily: Fonts.extraBold,
    fontSize: 20,
    lineHeight: LineHeights.titleLarge,
  },

  titleMedium: {
    fontFamily: Fonts.semiBold,
    fontSize: 18,
    lineHeight: LineHeights.titleMedium,
  },

  titleMediumBold: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    lineHeight: LineHeights.titleMedium,
  },

  titleMediumExtraBold: {
    fontFamily: Fonts.extraBold,
    fontSize: 18,
    lineHeight: LineHeights.titleMedium,
  },

  titleSmall: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    lineHeight: LineHeights.titleSmall,
  },

  titleSmallBold: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    lineHeight: LineHeights.titleSmall,
  },

  titleSmallExtraBold: {
    fontFamily: Fonts.extraBold,
    fontSize: 16,
    lineHeight: LineHeights.titleSmall,
  },

  // Body
  bodyLarge: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    lineHeight: LineHeights.bodyLarge,
  },

  bodyLargeBold: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    lineHeight: LineHeights.bodyLarge,
  },

  body: {
    fontFamily: Fonts.regular,
    fontSize: 15,
    lineHeight: LineHeights.body,
  },

  bodyBold: {
    fontFamily: Fonts.bold,
    fontSize: 15,
    lineHeight: LineHeights.body,
  },

  bodySmall: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    lineHeight: LineHeights.bodySmall,
  },

  bodySmallBold: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    lineHeight: LineHeights.bodySmall,
  },

  // Labels
  label: {
    fontFamily: Fonts.medium,
    fontSize: 13,
    lineHeight: LineHeights.label,
  },

  caption: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    lineHeight: LineHeights.caption,
  },

  captionBold: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    lineHeight: LineHeights.caption,
  },
} as const;
