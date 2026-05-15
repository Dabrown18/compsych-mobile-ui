import Svg, { Path } from 'react-native-svg';
import { COMMON, SIZE_MAP, DEFAULT_ICON_COLOR, type IconProps } from './types';

export function HourglassIcon({ size = 'medium', color = DEFAULT_ICON_COLOR }: IconProps) {
  const { size: px, strokeWidth } = SIZE_MAP[size];
  return (
    <Svg width={px} height={px} viewBox="0 0 48 48" fill="none">
      <Path d="M10 44H38" stroke={color} strokeWidth={strokeWidth} {...COMMON} />
      <Path d="M10 4H38" stroke={color} strokeWidth={strokeWidth} {...COMMON} />
      <Path d="M34 44V35.656C33.9998 34.5952 33.5782 33.578 32.828 32.828L24 24L15.172 32.828C14.4218 33.578 14.0002 34.5952 14 35.656V44" stroke={color} strokeWidth={strokeWidth} {...COMMON} />
      <Path d="M14 4V12.344C14.0002 13.4048 14.4218 14.422 15.172 15.172L24 24L32.828 15.172C33.5782 14.422 33.9998 13.4048 34 12.344V4" stroke={color} strokeWidth={strokeWidth} {...COMMON} />
    </Svg>
  );
}
