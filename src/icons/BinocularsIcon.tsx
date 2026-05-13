import Svg, { Path } from 'react-native-svg';
import { COMMON, SIZE_MAP, type IconProps } from './types';

export function BinocularsIcon({ size = 'medium', color = '#000000' }: IconProps) {
  const { size: px, strokeWidth } = SIZE_MAP[size];
  return (
    <Svg width={px} height={px} viewBox="0 0 48 48" fill="none">
      <Path d="M20 20H28" stroke={color} strokeWidth={strokeWidth} {...COMMON} />
      <Path d="M38 14V8C38 7.46957 37.7893 6.96086 37.4142 6.58579C37.0391 6.21071 36.5304 6 36 6H32C31.4696 6 30.9609 6.21071 30.5858 6.58579C30.2107 6.96086 30 7.46957 30 8V14" stroke={color} strokeWidth={strokeWidth} {...COMMON} />
      <Path d="M40 42C41.0609 42 42.0783 41.5786 42.8284 40.8284C43.5786 40.0783 44 39.0609 44 38V30.298C44 27.518 40 24.374 40 20.64V16C40 15.4696 39.7893 14.9609 39.4142 14.5858C39.0391 14.2107 38.5304 14 38 14H30C29.4696 14 28.9609 14.2107 28.5858 14.5858C28.2107 14.9609 28 15.4696 28 16V38C28 39.0609 28.4214 40.0783 29.1716 40.8284C29.9217 41.5786 30.9391 42 32 42H40Z" stroke={color} strokeWidth={strokeWidth} {...COMMON} />
      <Path d="M44 32H4" stroke={color} strokeWidth={strokeWidth} {...COMMON} />
      <Path d="M8 42C6.93913 42 5.92172 41.5786 5.17157 40.8284C4.42143 40.0783 4 39.0609 4 38V30.298C4 27.518 8 24.374 8 20.64V16C8 15.4696 8.21071 14.9609 8.58579 14.5858C8.96086 14.2107 9.46957 14 10 14H18C18.5304 14 19.0391 14.2107 19.4142 14.5858C19.7893 14.9609 20 15.4696 20 16V38C20 39.0609 19.5786 40.0783 18.8284 40.8284C18.0783 41.5786 17.0609 42 16 42H8Z" stroke={color} strokeWidth={strokeWidth} {...COMMON} />
      <Path d="M18 14V8C18 7.46957 17.7893 6.96086 17.4142 6.58579C17.0391 6.21071 16.5304 6 16 6H12C11.4696 6 10.9609 6.21071 10.5858 6.58579C10.2107 6.96086 10 7.46957 10 8V14" stroke={color} strokeWidth={strokeWidth} {...COMMON} />
    </Svg>
  );
}
