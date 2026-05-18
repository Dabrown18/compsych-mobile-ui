import Svg, { Path } from 'react-native-svg';

import { COMMON, DEFAULT_ICON_COLOR, type IconProps, SIZE_MAP } from './types';

export function HazeIcon({
  size = 'medium',
  color = DEFAULT_ICON_COLOR,
}: IconProps) {
  const { size: px, strokeWidth } = SIZE_MAP[size];
  return (
    <Svg width={px} height={px} viewBox="0 0 48 48" fill="none">
      <Path
        d="M10.4 12.4L13.2 15.2"
        stroke={color}
        strokeWidth={strokeWidth}
        {...COMMON}
      />
      <Path d="M4 26H8" stroke={color} strokeWidth={strokeWidth} {...COMMON} />
      <Path
        d="M40 26H44"
        stroke={color}
        strokeWidth={strokeWidth}
        {...COMMON}
      />
      <Path
        d="M34.8 15.2L37.6 12.4"
        stroke={color}
        strokeWidth={strokeWidth}
        {...COMMON}
      />
      <Path d="M44 34H4" stroke={color} strokeWidth={strokeWidth} {...COMMON} />
      <Path d="M44 42H4" stroke={color} strokeWidth={strokeWidth} {...COMMON} />
      <Path
        d="M32 26C32 23.8783 31.1571 21.8434 29.6569 20.3431C28.1566 18.8429 26.1217 18 24 18C21.8783 18 19.8434 18.8429 18.3431 20.3431C16.8429 21.8434 16 23.8783 16 26"
        stroke={color}
        strokeWidth={strokeWidth}
        {...COMMON}
      />
      <Path d="M24 10V5" stroke={color} strokeWidth={strokeWidth} {...COMMON} />
    </Svg>
  );
}
