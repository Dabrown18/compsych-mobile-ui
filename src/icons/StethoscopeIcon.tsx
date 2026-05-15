import Svg, { Path } from 'react-native-svg';
import { COMMON, SIZE_MAP, DEFAULT_ICON_COLOR, type IconProps } from './types';

export function StethoscopeIcon({ size = 'medium', color = DEFAULT_ICON_COLOR }: IconProps) {
  const { size: px, strokeWidth } = SIZE_MAP[size];
  return (
    <Svg width={px} height={px} viewBox="0 0 48 48" fill="none">
      <Path d="M22 4V8" stroke={color} strokeWidth={strokeWidth} {...COMMON} />
      <Path d="M10 4V8" stroke={color} strokeWidth={strokeWidth} {...COMMON} />
      <Path d="M10 6H8C6.93913 6 5.92172 6.42143 5.17157 7.17157C4.42143 7.92172 4 8.93913 4 10V18C4 21.1826 5.26428 24.2348 7.51472 26.4853C9.76516 28.7357 12.8174 30 16 30C19.1826 30 22.2348 28.7357 24.4853 26.4853C26.7357 24.2348 28 21.1826 28 18V10C28 8.93913 27.5786 7.92172 26.8284 7.17157C26.0783 6.42143 25.0609 6 24 6H22" stroke={color} strokeWidth={strokeWidth} {...COMMON} />
      <Path d="M16 30C16 33.1826 17.2643 36.2348 19.5147 38.4853C21.7652 40.7357 24.8174 42 28 42C31.1826 42 34.2348 40.7357 36.4853 38.4853C38.7357 36.2348 40 33.1826 40 30V24" stroke={color} strokeWidth={strokeWidth} {...COMMON} />
      <Path d="M40 24C42.2091 24 44 22.2091 44 20C44 17.7909 42.2091 16 40 16C37.7909 16 36 17.7909 36 20C36 22.2091 37.7909 24 40 24Z" stroke={color} strokeWidth={strokeWidth} {...COMMON} />
    </Svg>
  );
}
