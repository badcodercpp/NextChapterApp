import Svg, { Circle, Ellipse, Path } from 'react-native-svg';

export function MountainIllustration() {
  return (
    <Svg width={120} height={120} viewBox="0 0 150 150">
      {/* Sun */}
      <Circle cx="112" cy="42" r="18" fill="#FFD98B" />

      {/* Back Mountain */}
      <Path d="M18 110 L56 52 L82 88 L100 70 L132 110 Z" fill="#8B7BFF" />

      {/* Front Mountain */}
      <Path d="M30 110 L68 40 L108 110 Z" fill="#6C5CE7" />

      {/* Snow */}
      <Path
        d="M68 40
           L58 56
           L66 54
           L72 60
           L80 52
           L76 46
           Z"
        fill="#FFFFFF"
      />

      {/* Ground */}
      <Ellipse cx="75" cy="118" rx="48" ry="10" fill="#E6DFFB" />
    </Svg>
  );
}
