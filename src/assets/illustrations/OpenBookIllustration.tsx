import Svg, {
  Circle,
  Defs,
  Ellipse,
  Line,
  LinearGradient,
  Path,
  RadialGradient,
  Stop,
} from 'react-native-svg';

import React from 'react';
import { Theme } from '@/theme';

interface Props {
  width?: number;
  height?: number;
}

export function OpenBookIllustration({ width = 150, height = 150 }: Props) {
  const colors = Theme.colors;

  return (
    <Svg width={width} height={height} viewBox="0 0 170 170" fill="none">
      <Defs>
        <LinearGradient id="cover" x1="25" y1="30" x2="135" y2="120">
          <Stop offset="0%" stopColor={colors.primaryLight} />
          <Stop offset="100%" stopColor={colors.primary} />
        </LinearGradient>

        <LinearGradient id="page" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor={colors.surface} />
          <Stop offset="100%" stopColor={colors.background} />
        </LinearGradient>

        <RadialGradient
          id="glow"
          cx="85"
          cy="70"
          r="65"
          gradientUnits="userSpaceOnUse"
        >
          <Stop
            offset="0%"
            stopColor={colors.reflectionPurpleLight}
            stopOpacity="0.35"
          />
          <Stop
            offset="100%"
            stopColor={colors.reflectionBackground}
            stopOpacity="0"
          />
        </RadialGradient>
      </Defs>

      {/* Purple Glow */}
      <Ellipse cx="85" cy="70" rx="65" ry="55" fill="url(#glow)" />

      {/* Ground Shadow */}
      <Ellipse
        cx="85"
        cy="138"
        rx="52"
        ry="8"
        fill={colors.reflectionPurpleLight}
        opacity={0.35}
      />

      {/* Left Cover */}
      <Path
        d="
          M30 45
          Q55 34 78 45
          L78 118
          Q55 108 30 116
          Z
        "
        fill="url(#cover)"
      />

      {/* Right Cover */}
      <Path
        d="
          M92 45
          Q115 34 140 45
          L140 116
          Q115 108 92 118
          Z
        "
        fill="url(#cover)"
      />

      {/* Left Page */}
      <Path
        d="
          M36 48
          Q56 42 78 50
          L78 114
          Q56 106 36 112
          Z
        "
        fill="url(#page)"
      />

      {/* Right Page */}
      <Path
        d="
          M92 50
          Q114 42 134 48
          L134 112
          Q114 106 92 114
          Z
        "
        fill="url(#page)"
      />

      {/* Spine */}
      <Path
        d="
          M85 45
          Q88 80 85 118
        "
        stroke={colors.border}
        strokeWidth={2}
      />

      {/* Left Page Lines */}
      {[58, 68, 78, 88].map(y => (
        <Line
          key={`l-${y}`}
          x1="45"
          y1={y}
          x2="70"
          y2={y - 3}
          stroke={colors.divider}
          strokeWidth={1.4}
          strokeLinecap="round"
        />
      ))}

      {/* Right Page Lines */}
      {[55, 65, 75, 85].map(y => (
        <Line
          key={`r-${y}`}
          x1="98"
          y1={y}
          x2="123"
          y2={y + 3}
          stroke={colors.divider}
          strokeWidth={1.4}
          strokeLinecap="round"
        />
      ))}

      {/* Sparkles */}
      <Path
        d="M84 18 L86 24 L92 26 L86 28 L84 34 L82 28 L76 26 L82 24 Z"
        fill={colors.warning}
      />

      <Path
        d="M42 32 L43 36 L47 37 L43 38 L42 42 L41 38 L37 37 L41 36 Z"
        fill={colors.primaryLight}
      />

      <Path
        d="M126 28 L127 32 L131 33 L127 34 L126 38 L125 34 L121 33 L125 32 Z"
        fill={colors.primaryLight}
      />

      {/* Decorative Leaves */}

      <Path
        d="
          M28 110
          Q18 98 22 88
          Q34 94 36 106
          Z
        "
        fill={colors.success}
        opacity={0.85}
      />

      <Path
        d="
          M142 110
          Q152 98 148 88
          Q136 94 134 106
          Z
        "
        fill={colors.success}
        opacity={0.85}
      />

      {/* Small Dots */}

      <Circle cx="58" cy="24" r="2" fill={colors.primaryLight} />

      <Circle cx="112" cy="18" r="2" fill={colors.warning} />

      <Circle cx="100" cy="132" r="2" fill={colors.primaryLight} />
    </Svg>
  );
}
