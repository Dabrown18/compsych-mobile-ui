import { sys } from '../tokens';

export type IconSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';

/** Any Lucide icon component name, with or without the trailing "Icon" suffix.
 *  Examples: "Stethoscope", "StethoscopeIcon", "UserRound", "UserRoundIcon" */
export type IconName = string;

export const DEFAULT_ICON_COLOR = sys.colorRoles.surface.surface.sysOnSurface;

export interface IconProps {
  size?: IconSize;
  color?: string;
}

export const SIZE_MAP: Record<IconSize, { size: number; strokeWidth: number }> =
  {
    xsmall: { size: 16, strokeWidth: 1 },
    small: { size: 20, strokeWidth: 1 },
    medium: { size: 24, strokeWidth: 1.5 },
    large: { size: 32, strokeWidth: 1.5 },
    xlarge: { size: 48, strokeWidth: 1.5 },
  };

export const COMMON = {
  fill: 'none',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};
