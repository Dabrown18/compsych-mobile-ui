import { sys } from '../tokens';

export type IconSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';

export type IconName =
  | 'UserRoundIcon'
  | 'GlobeIcon'
  | 'HandshakeIcon'
  | 'HeartHandshakeIcon'
  | 'AtomIcon'
  | 'HazeIcon'
  | 'HourglassIcon'
  | 'GraduationCapIcon'
  | 'HandHeartIcon'
  | 'IdCardIcon'
  | 'MessageCirclePlusIcon'
  | 'StethoscopeIcon'
  | 'BinocularsIcon'
  | 'FlagIcon'
  | 'MountainSnowIcon'
  | 'SnowflakeIcon'
  | 'FileChartColumnIncreasingIcon'
  | 'WheatIcon';

export const DEFAULT_ICON_COLOR = sys.colorRoles.surface.surface.sysOnSurface;

export interface IconProps {
  size?: IconSize;
  color?: string;
}

export const SIZE_MAP: Record<IconSize, { size: number; strokeWidth: number }> =
  {
    xsmall: { size: 16, strokeWidth: 1 },
    small: { size: 20, strokeWidth: 1.5 },
    medium: { size: 24, strokeWidth: 2 },
    large: { size: 32, strokeWidth: 2 },
    xlarge: { size: 48, strokeWidth: 2 },
  };

export const COMMON = {
  fill: 'none',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};
