import Svg, { Path } from 'react-native-svg';

import { COMMON, DEFAULT_ICON_COLOR, type IconProps, SIZE_MAP } from './types';

export function SnowflakeIcon({ size = 'medium', color = DEFAULT_ICON_COLOR }: IconProps) {
  const { size: px, strokeWidth } = SIZE_MAP[size];
  return (
    <Svg width={px} height={px} viewBox="0 0 48 48" fill="none">
      <Path d="M20 40L17.5 35L12 36" stroke={color} strokeWidth={strokeWidth} {...COMMON} />
      <Path d="M20 8L17.5 13L12 12" stroke={color} strokeWidth={strokeWidth} {...COMMON} />
      <Path d="M28 40L30.5 35L36 36" stroke={color} strokeWidth={strokeWidth} {...COMMON} />
      <Path d="M28 8L30.5 13L36 12" stroke={color} strokeWidth={strokeWidth} {...COMMON} />
      <Path d="M34 42L28 30H20" stroke={color} strokeWidth={strokeWidth} {...COMMON} />
      <Path d="M34 6L28 18L31 24" stroke={color} strokeWidth={strokeWidth} {...COMMON} />
      <Path d="M4 24H17L20 18" stroke={color} strokeWidth={strokeWidth} {...COMMON} />
      <Path d="M40 20L37 24L40 28" stroke={color} strokeWidth={strokeWidth} {...COMMON} />
      <Path d="M44 24H31L28 30" stroke={color} strokeWidth={strokeWidth} {...COMMON} />
      <Path d="M8 20L11 24L8 28" stroke={color} strokeWidth={strokeWidth} {...COMMON} />
      <Path d="M14 42L20 30L17 24" stroke={color} strokeWidth={strokeWidth} {...COMMON} />
      <Path d="M14 6L20 18H28" stroke={color} strokeWidth={strokeWidth} {...COMMON} />
    </Svg>
  );
}
