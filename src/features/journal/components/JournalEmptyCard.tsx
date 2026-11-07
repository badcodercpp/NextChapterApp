import { AppIcon, AppText } from '@/components';
import { Pressable, View } from 'react-native';

import { BookOpen } from 'lucide-react-native';
import React from 'react';
import Svg, {
  Defs,
  Ellipse,
  G,
  LinearGradient,
  Path,
  Stop,
} from 'react-native-svg';
import { useResolveClassNames } from 'uniwind';

interface JournalEmptyCardProps {
  onPress?: () => void;
}

export function JournalEmptyCard({ onPress }: JournalEmptyCardProps) {
  const { backgroundColor: primaryColor } =
    useResolveClassNames('bg-primary-v2');
  const { color: highlightColor } = useResolveClassNames('text-link-v2');
  const { backgroundColor: shadeColor } =
    useResolveClassNames('bg-selected-v2');
  const primary = primaryColor?.toString();
  const highlight = highlightColor?.toString();
  const shade = shadeColor?.toString();

  return (
    <Pressable
      onPress={onPress}
      className="overflow-hidden rounded-[26px] border border-primary-v2/40 bg-background-v2"
    >
      <View
        pointerEvents="none"
        className="absolute -right-12 -top-24 h-64 w-64 rounded-full bg-primary-v2/15"
      />
      <View
        pointerEvents="none"
        className="absolute -bottom-40 right-0 h-64 w-80 rotate-[-25deg] rounded-full bg-primary-v2/10"
      />
      <View className="min-h-[170px] flex-row items-center px-5 py-5">
        <View className="z-10 flex-1">
          <View className="mb-3 h-11 w-11 items-center justify-center rounded-[14px] border border-primary-v2/50 bg-primary-v2/25">
            <AppIcon
              icon={BookOpen}
              size={25}
              strokeWidth={2}
              className="text-link-v2"
            />
          </View>
          <AppText variant="xl" className="font-bold leading-7 text-text-v2">
            Write. Reflect. Heal.
          </AppText>

          <AppText variant="sm" className="mt-2 leading-5 text-text-muted-v2">
            Your thoughts matter. Let it out, one step at a time.
          </AppText>
        </View>

        <View pointerEvents="none" className="ml-2 w-[34%]">
          <Svg width="100%" height={145} viewBox="0 0 180 180">
            <Defs>
              <LinearGradient id="journalCover" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0" stopColor={primary} />
                <Stop offset="1" stopColor={shade} />
              </LinearGradient>
              <LinearGradient id="journalPaperTint" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor={primary} stopOpacity={0.04} />
                <Stop offset="1" stopColor={primary} stopOpacity={0.25} />
              </LinearGradient>
              <LinearGradient id="journalPen" x1="0" y1="0" x2="1" y2="0">
                <Stop offset="0" stopColor={shade} />
                <Stop offset="0.5" stopColor={highlight} />
                <Stop offset="1" stopColor={primary} />
              </LinearGradient>
            </Defs>
            <Ellipse
              cx="92"
              cy="153"
              rx="70"
              ry="12"
              fill={primary}
              opacity={0.2}
            />
            <G transform="rotate(9 90 100)">
              <Path
                d="M19 53 Q47 38 87 57 Q118 40 158 53 L163 137 Q162 149 149 149 L88 141 L25 149 Q13 149 14 136 Z"
                fill="url(#journalCover)"
                stroke={primary}
                strokeWidth={3}
              />
              <Path
                d="M24 47 Q52 33 88 53 L88 133 Q52 115 21 133 Z M88 53 Q117 35 153 46 L156 133 Q119 116 88 133 Z"
                fill="#FFFFFF"
                stroke={highlight}
                strokeWidth={2}
              />
              <Path
                d="M24 47 Q52 33 88 53 L88 133 Q52 115 21 133 Z M88 53 Q117 35 153 46 L156 133 Q119 116 88 133 Z"
                fill="url(#journalPaperTint)"
              />
              <Path
                d="M88 54 L88 133"
                stroke={primary}
                strokeOpacity={0.5}
                strokeWidth={2}
              />
              {[64, 77, 90, 103].map(y => (
                <G key={y} stroke={primary} strokeWidth={2} opacity={0.35}>
                  <Path d={`M33 ${y} Q53 ${y - 5} 76 ${y + 4}`} fill="none" />
                  <Path
                    d={`M101 ${y + 4} Q121 ${y - 5} 143 ${y}`}
                    fill="none"
                  />
                </G>
              ))}
              <Path
                d="M66 127 L62 165 L74 157 L81 164 L84 132 Z"
                fill="url(#journalCover)"
              />
            </G>
            <G transform="rotate(32 130 78)">
              <Path
                d="M122 31 Q122 22 130 22 Q138 22 138 31 L138 113 L122 113 Z"
                fill="url(#journalPen)"
                stroke={primary}
                strokeWidth={2}
              />
              <Path d="M122 113 L130 134 L138 113 Z" fill={highlight} />
              <Path d="M127 126 L130 137 L133 126 Z" fill={primary} />
              <Path
                d="M138 41 L142 41 L142 75"
                fill="none"
                stroke={highlight}
                strokeWidth={3}
                strokeLinecap="round"
              />
              <Path
                d="M125 34 L125 104"
                stroke="#FFFFFF"
                strokeWidth={2}
                opacity={0.55}
              />
            </G>
          </Svg>
        </View>
      </View>
    </Pressable>
  );
}
