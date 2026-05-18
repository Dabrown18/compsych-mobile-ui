import Svg, { Path } from 'react-native-svg';

import { COMMON, DEFAULT_ICON_COLOR, type IconProps, SIZE_MAP } from './types';

export function FileChartColumnIncreasingIcon({
  size = 'medium',
  color = DEFAULT_ICON_COLOR,
}: IconProps) {
  const { size: px, strokeWidth } = SIZE_MAP[size];
  return (
    <Svg width={px} height={px} viewBox="0 0 48 48" fill="none">
      <Path
        d="M12 44C10.9391 44 9.92172 43.5786 9.17157 42.8284C8.42143 42.0783 8 41.0609 8 40V8.00001C8 6.93914 8.42143 5.92172 9.17157 5.17158C9.92172 4.42143 10.9391 4.00001 12 4.00001H28C28.6331 3.99898 29.2602 4.12321 29.8451 4.36554C30.43 4.60788 30.9611 4.96353 31.408 5.41201L38.584 12.588C39.0337 13.035 39.3903 13.5667 39.6334 14.1523C39.8764 14.738 40.001 15.3659 40 16V40C40 41.0609 39.5786 42.0783 38.8284 42.8284C38.0783 43.5786 37.0609 44 36 44H12Z"
        stroke={color}
        strokeWidth={strokeWidth}
        {...COMMON}
      />
      <Path
        d="M28 4V14C28 14.5304 28.2107 15.0391 28.5858 15.4142C28.9609 15.7893 29.4696 16 30 16H40"
        stroke={color}
        strokeWidth={strokeWidth}
        {...COMMON}
      />
      <Path
        d="M16 36V32"
        stroke={color}
        strokeWidth={strokeWidth}
        {...COMMON}
      />
      <Path
        d="M24 36V28"
        stroke={color}
        strokeWidth={strokeWidth}
        {...COMMON}
      />
      <Path
        d="M32 36V24"
        stroke={color}
        strokeWidth={strokeWidth}
        {...COMMON}
      />
    </Svg>
  );
}
