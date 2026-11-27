import { AppCardProps } from './types';
import { CardVariants } from './variants';
import React, { ComponentType } from 'react';
import { AppIcon } from '../AppIcon';
import {
  CardAccessContext,
  CardLockOverlay,
  useCardAccess,
} from './CardAccess';
import { View } from 'react-native';
import { cn } from '@/utils';
import Svg, { Circle, Path } from 'react-native-svg';
import { useCSSVariable } from 'uniwind';

export function AppCard({
  children,
  variant = 'surface',
  border = false,
  decorated = false,
  lockExempt = false,
  className,
  ...props
}: AppCardProps) {
  const access = useCardAccess();
  const locked = !lockExempt && !!access?.locked;

  return (
    <View
      {...props}
      className={cn(
        'rounded-3xl p-6',

        CardVariants[variant],

        border && 'border border-border',

        'shadow-lg',

        decorated && 'overflow-hidden',

        className,
      )}
    >
      {decorated && <AppCardDecoration />}
      {locked ? (
        <>
          <View
            pointerEvents="none"
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
          >
            <CardAccessContext.Provider value={null}>
              {children}
            </CardAccessContext.Provider>
          </View>
          <CardLockOverlay onPress={access.openPremium} />
        </>
      ) : (
        children
      )}
    </View>
  );
}

export function AppCardDecoration() {
  return (
    <View
      pointerEvents="none"
      accessible={false}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      className="absolute inset-0"
    >
      <View className="absolute -right-12 -top-16 h-40 w-40 rounded-full bg-primary-v2/15" />
      <View className="absolute -bottom-16 -left-12 h-32 w-32 rounded-full bg-primary-v2/10" />
    </View>
  );
}

export function AppHeroArtwork() {
  return (
    <View
      pointerEvents="none"
      accessible={false}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      className="absolute inset-0 overflow-hidden"
    >
      <View className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-primary-v2/15" />
      <View className="absolute -right-4 top-16 h-24 w-24 rounded-full bg-primary-v2/10" />
      <View className="absolute -bottom-24 -left-20 h-44 w-44 rounded-full bg-primary-v2/10" />
    </View>
  );
}

const MOUNTAIN_PATHS = {
  peaks: [
    {
      d: 'M0 100 L38 58 L62 74 L100 30 L128 56 L156 38 L200 66 L200 100 Z',
      opacity: 0.14,
    },
    {
      d: 'M24 100 L64 70 L92 84 L132 52 L166 76 L200 60 L200 100 Z',
      opacity: 0.22,
    },
    {
      d: 'M70 100 C104 86 132 90 160 80 C178 74 190 78 200 74 L200 100 Z',
      opacity: 0.3,
    },
  ],
  hills: [
    {
      d: 'M0 100 C40 92 70 70 110 46 C140 30 160 52 200 62 L200 100 Z',
      opacity: 0.12,
    },
    {
      d: 'M30 100 C70 90 110 82 150 70 C172 64 188 70 200 74 L200 100 Z',
      opacity: 0.18,
    },
  ],
} as const;

interface AppMountainArtworkProps {
  variant?: keyof typeof MOUNTAIN_PATHS;
  className?: string;
}

export function AppMountainArtwork({
  variant = 'peaks',
  className,
}: AppMountainArtworkProps) {
  const primary = useCSSVariable('--color-primary-v2');
  const color = typeof primary === 'string' ? primary : '#7c3aed';

  return (
    <View
      pointerEvents="none"
      accessible={false}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      className={cn('absolute bottom-0 right-0 h-full w-2/3', className)}
    >
      {/* Keyed by colour so react-native-svg repaints on theme change. */}
      <Svg
        key={color}
        width="100%"
        height="100%"
        viewBox="0 0 200 100"
        preserveAspectRatio="none"
      >
        {MOUNTAIN_PATHS[variant].map(path => (
          <Path
            key={path.d}
            d={path.d}
            fill={color}
            fillOpacity={path.opacity}
          />
        ))}
      </Svg>
    </View>
  );
}

export type AppPatternArtworkVariant =
  | 'grid'
  | 'rings'
  | 'waves'
  | 'sparkles'
  | 'bubbles'
  | 'stripes';

export const APP_PATTERN_ARTWORK_VARIANTS: AppPatternArtworkVariant[] = [
  'rings',
  'sparkles',
  'grid',
  'waves',
  'bubbles',
  'stripes',
];

const SPARKLE = (x: number, y: number, r: number) =>
  `M${x} ${y - r} Q${x} ${y} ${x + r} ${y} Q${x} ${y} ${x} ${
    y + r
  } Q${x} ${y} ${x - r} ${y} Q${x} ${y} ${x} ${y - r} Z`;

export function AppPatternArtwork({
  variant,
  className,
  icon,
  iconClassName,
}: {
  variant: AppPatternArtworkVariant;
  className?: string;
  /** Faded watermark of the card's subject, so each card's artwork matches its context. */
  icon?: ComponentType<any>;
  iconClassName?: string;
}) {
  const primary = useCSSVariable('--color-primary-v2');
  const color = typeof primary === 'string' ? primary : '#7c3aed';

  return (
    <View
      pointerEvents="none"
      accessible={false}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      className={cn('absolute bottom-0 right-0 h-full w-1/2', className)}
    >
      {/* Keyed by colour so react-native-svg repaints on theme change. */}
      <Svg key={color} width="100%" height="100%" viewBox="0 0 100 100">
        {variant === 'grid' && (
          <>
            <Circle cx={104} cy={104} r={46} fill={color} fillOpacity={0.12} />
            {[0, 1, 2, 3].flatMap(row =>
              [0, 1, 2, 3].map(col => (
                <Circle
                  key={`${row}-${col}`}
                  cx={52 + col * 13}
                  cy={18 + row * 13}
                  r={2.6}
                  fill={color}
                  fillOpacity={0.18 + ((row + col) % 3) * 0.08}
                />
              )),
            )}
          </>
        )}
        {variant === 'rings' &&
          [22, 38, 54, 70].map((r, index) => (
            <Circle
              key={r}
              cx={100}
              cy={100}
              r={r}
              stroke={color}
              strokeOpacity={0.32 - index * 0.06}
              strokeWidth={5}
              fill="none"
            />
          ))}
        {variant === 'waves' && (
          <>
            <Path
              d="M0 70 C20 55 40 80 60 62 C76 48 90 58 100 46 L100 100 L0 100 Z"
              fill={color}
              fillOpacity={0.12}
            />
            <Path
              d="M0 86 C22 74 42 94 64 80 C80 70 92 78 100 70 L100 100 L0 100 Z"
              fill={color}
              fillOpacity={0.2}
            />
          </>
        )}
        {variant === 'sparkles' && (
          <>
            <Circle cx={96} cy={4} r={34} fill={color} fillOpacity={0.1} />
            <Path d={SPARKLE(74, 70, 16)} fill={color} fillOpacity={0.26} />
            <Path d={SPARKLE(92, 40, 9)} fill={color} fillOpacity={0.2} />
            <Path d={SPARKLE(52, 88, 7)} fill={color} fillOpacity={0.16} />
          </>
        )}
        {variant === 'bubbles' && (
          <>
            <Circle cx={88} cy={22} r={18} fill={color} fillOpacity={0.14} />
            <Circle cx={62} cy={58} r={10} fill={color} fillOpacity={0.2} />
            <Circle cx={92} cy={78} r={24} fill={color} fillOpacity={0.12} />
            <Circle cx={44} cy={90} r={5} fill={color} fillOpacity={0.22} />
          </>
        )}
        {variant === 'stripes' &&
          [0, 1, 2, 3, 4].map(index => (
            <Path
              key={index}
              d={`M${40 + index * 16} 110 L${110 + index * 16} 40`}
              stroke={color}
              strokeOpacity={0.12 + index * 0.04}
              strokeWidth={6}
              strokeLinecap="round"
            />
          ))}
      </Svg>
      {icon && (
        <View
          className={cn(
            'absolute -bottom-3 right-10 -rotate-12 opacity-20',
            iconClassName,
          )}
        >
          <AppIcon icon={icon} size={64} className="text-primary-v2" />
        </View>
      )}
    </View>
  );
}
