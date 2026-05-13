import Svg, { Path } from 'react-native-svg';
import { COMMON, SIZE_MAP, type IconProps } from './types';

export function MountainSnowIcon({ size = 'medium', color = '#000000' }: IconProps) {
  const { size: px, strokeWidth } = SIZE_MAP[size];
  return (
    <Svg width={px} height={px} viewBox="0 0 48 48" fill="none">
      <Path d="M16 6L24 22L34 12L44 42H4L16 6Z" stroke={color} strokeWidth={strokeWidth} {...COMMON} />
      <Path d="M8.28003 30.16C13.52 27.02 18.76 27.3 24 31C29.48 34.88 34.98 35 40.46 31.38" stroke={color} strokeWidth={strokeWidth} {...COMMON} />
    </Svg>
  );
}
