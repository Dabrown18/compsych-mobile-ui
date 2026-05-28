import type { LucideIcon } from 'lucide-react-native';

export type { IconProps, IconSize, IconName } from './types';
export { DEFAULT_ICON_COLOR, SIZE_MAP } from './types';

/**
 * Resolves an icon name to a Lucide React Native component.
 * Accepts both "StethoscopeIcon" (trailing Icon suffix) and "Stethoscope".
 * Returns undefined if the icon name is not found in lucide-react-native.
 */
export function resolveIcon(name: string): LucideIcon | undefined {
  const componentName = name.endsWith('Icon') ? name.slice(0, -4) : name;

  const icons = require('lucide-react-native') as Record<string, unknown>;
  return icons[componentName] as LucideIcon | undefined;
}
