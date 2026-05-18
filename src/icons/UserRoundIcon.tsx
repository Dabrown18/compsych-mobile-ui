import Svg, { Path } from 'react-native-svg';

import { COMMON, DEFAULT_ICON_COLOR, type IconProps, SIZE_MAP } from './types';

export function UserRoundIcon({
  size = 'medium',
  color = DEFAULT_ICON_COLOR,
}: IconProps) {
  const { size: px, strokeWidth } = SIZE_MAP[size];
  return (
    <Svg width={px} height={px} viewBox="0 0 48 48" fill="none">
      <Path
        d="M24 26C29.5228 26 34 21.5228 34 16C34 10.4772 29.5228 6 24 6C18.4772 6 14 10.4772 14 16C14 21.5228 18.4772 26 24 26Z"
        stroke={color}
        strokeWidth={strokeWidth}
        {...COMMON}
      />
      <Path
        d="M40 42C40 37.7565 38.3143 33.6869 35.3137 30.6863C32.3131 27.6857 28.2435 26 24 26C19.7565 26 15.6869 27.6857 12.6863 30.6863C9.68571 33.6869 8 37.7565 8 42"
        stroke={color}
        strokeWidth={strokeWidth}
        {...COMMON}
      />
    </Svg>
  );
}
