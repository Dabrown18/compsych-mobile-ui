import Svg, { Path } from 'react-native-svg';

import { COMMON, DEFAULT_ICON_COLOR, type IconProps, SIZE_MAP } from './types';

export function GlobeIcon({ size = 'medium', color = DEFAULT_ICON_COLOR }: IconProps) {
  const { size: px, strokeWidth } = SIZE_MAP[size];
  return (
    <Svg width={px} height={px} viewBox="0 0 48 48" fill="none">
      <Path
        d="M44 24C44 35.0457 35.0457 44 24 44M44 24C44 12.9543 35.0457 4 24 4M44 24H4M24 44C12.9543 44 4 35.0457 4 24M24 44C18.8645 38.6077 16 31.4465 16 24C16 16.5535 18.8645 9.39231 24 4M24 44C29.1355 38.6077 32 31.4465 32 24C32 16.5535 29.1355 9.39231 24 4M4 24C4 12.9543 12.9543 4 24 4"
        stroke={color}
        strokeWidth={strokeWidth}
        {...COMMON}
      />
    </Svg>
  );
}
