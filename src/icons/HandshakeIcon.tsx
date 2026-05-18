import Svg, { Path } from 'react-native-svg';

import { COMMON, DEFAULT_ICON_COLOR, type IconProps, SIZE_MAP } from './types';

export function HandshakeIcon({
  size = 'medium',
  color = DEFAULT_ICON_COLOR,
}: IconProps) {
  const { size: px, strokeWidth } = SIZE_MAP[size];
  return (
    <Svg width={px} height={px} viewBox="0 0 48 48" fill="none">
      <Path
        d="M22 34L26 38C26.394 38.394 26.8617 38.7065 27.3764 38.9197C27.8912 39.1329 28.4428 39.2426 29 39.2426C29.5572 39.2426 30.1088 39.1329 30.6236 38.9197C31.1383 38.7065 31.606 38.394 32 38C32.394 37.606 32.7065 37.1383 32.9197 36.6236C33.1329 36.1088 33.2426 35.5572 33.2426 35C33.2426 34.4428 33.1329 33.8912 32.9197 33.3764C32.7065 32.8617 32.394 32.394 32 32"
        stroke={color}
        strokeWidth={strokeWidth}
        {...COMMON}
      />
      <Path
        d="M28 28L33 33C33.7957 33.7957 34.8748 34.2427 36 34.2427C37.1252 34.2427 38.2044 33.7957 39 33C39.7957 32.2044 40.2427 31.1252 40.2427 30C40.2427 28.8748 39.7957 27.7957 39 27L31.24 19.24C30.115 18.1164 28.59 17.4853 27 17.4853C25.41 17.4853 23.885 18.1164 22.76 19.24L21 21C20.2044 21.7957 19.1252 22.2427 18 22.2427C16.8748 22.2427 15.7957 21.7957 15 21C14.2044 20.2044 13.7574 19.1252 13.7574 18C13.7574 16.8748 14.2044 15.7957 15 15L20.62 9.38003C22.4445 7.56032 24.8238 6.40113 27.3813 6.08598C29.9388 5.77082 32.5284 6.31769 34.74 7.64003L35.68 8.20003C36.5316 8.714 37.5441 8.89226 38.52 8.70003L42 8.00003"
        stroke={color}
        strokeWidth={strokeWidth}
        {...COMMON}
      />
      <Path
        d="M42 6L44 28H40"
        stroke={color}
        strokeWidth={strokeWidth}
        {...COMMON}
      />
      <Path
        d="M6 6L4 28L17 41C17.7956 41.7956 18.8748 42.2426 20 42.2426C21.1252 42.2426 22.2044 41.7956 23 41C23.7956 40.2044 24.2426 39.1252 24.2426 38C24.2426 36.8748 23.7956 35.7956 23 35"
        stroke={color}
        strokeWidth={strokeWidth}
        {...COMMON}
      />
      <Path d="M6 8H22" stroke={color} strokeWidth={strokeWidth} {...COMMON} />
    </Svg>
  );
}
