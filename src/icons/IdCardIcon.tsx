import Svg, { Path } from 'react-native-svg';

import { COMMON, DEFAULT_ICON_COLOR, type IconProps, SIZE_MAP } from './types';

export function IdCardIcon({ size = 'medium', color = DEFAULT_ICON_COLOR }: IconProps) {
  const { size: px, strokeWidth } = SIZE_MAP[size];
  return (
    <Svg width={px} height={px} viewBox="0 0 48 48" fill="none">
      <Path d="M32 20H36" stroke={color} strokeWidth={strokeWidth} {...COMMON} />
      <Path d="M32 28H36" stroke={color} strokeWidth={strokeWidth} {...COMMON} />
      <Path
        d="M12.34 30C12.7522 28.828 13.5182 27.8129 14.532 27.0948C15.5458 26.3768 16.7576 25.9911 18 25.9911C19.2423 25.9911 20.4541 26.3768 21.4679 27.0948C22.4818 27.8129 23.2477 28.828 23.66 30"
        stroke={color}
        strokeWidth={strokeWidth}
        {...COMMON}
      />
      <Path
        d="M18 26C20.2091 26 22 24.2091 22 22C22 19.7909 20.2091 18 18 18C15.7909 18 14 19.7909 14 22C14 24.2091 15.7909 26 18 26Z"
        stroke={color}
        strokeWidth={strokeWidth}
        {...COMMON}
      />
      <Path
        d="M40 10H8C5.79086 10 4 11.7909 4 14V34C4 36.2091 5.79086 38 8 38H40C42.2091 38 44 36.2091 44 34V14C44 11.7909 42.2091 10 40 10Z"
        stroke={color}
        strokeWidth={strokeWidth}
        {...COMMON}
      />
    </Svg>
  );
}
