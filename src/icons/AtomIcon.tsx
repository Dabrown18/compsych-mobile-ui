import Svg, { Path } from 'react-native-svg';

import { COMMON, DEFAULT_ICON_COLOR, type IconProps, SIZE_MAP } from './types';

export function AtomIcon({ size = 'medium', color = DEFAULT_ICON_COLOR }: IconProps) {
  const { size: px, strokeWidth } = SIZE_MAP[size];
  return (
    <Svg width={px} height={px} viewBox="0 0 48 48" fill="none">
      <Path
        d="M24 26C25.1046 26 26 25.1046 26 24C26 22.8954 25.1046 22 24 22C22.8954 22 22 22.8954 22 24C22 25.1046 22.8954 26 24 26Z"
        stroke={color}
        strokeWidth={strokeWidth}
        {...COMMON}
      />
      <Path
        d="M40.4 40.4C44.48 36.34 40.44 25.68 31.4 16.6C22.32 7.56002 11.66 3.52002 7.60002 7.60002C3.52002 11.66 7.56002 22.32 16.6 31.4C25.68 40.44 36.34 44.48 40.4 40.4Z"
        stroke={color}
        strokeWidth={strokeWidth}
        {...COMMON}
      />
      <Path
        d="M31.4 31.4C40.44 22.32 44.48 11.66 40.4 7.60002C36.34 3.52002 25.68 7.56002 16.6 16.6C7.56002 25.68 3.52002 36.34 7.60002 40.4C11.66 44.48 22.32 40.44 31.4 31.4Z"
        stroke={color}
        strokeWidth={strokeWidth}
        {...COMMON}
      />
    </Svg>
  );
}
