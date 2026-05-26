import { sys } from '../tokens';
import type { Theme, ThemeOverride } from './types';

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function deepMerge(
  base: Record<string, unknown>,
  override: Record<string, unknown>,
): Record<string, unknown> {
  const result: Record<string, unknown> = { ...base };

  for (const key of Object.keys(override)) {
    const overrideVal = override[key];
    const baseVal = base[key];

    if (overrideVal === undefined || overrideVal === null) {
      // Ignore nullish overrides — preserve the default
      continue;
    }

    if (isPlainObject(baseVal) && isPlainObject(overrideVal)) {
      result[key] = deepMerge(baseVal, overrideVal);
    } else {
      result[key] = overrideVal;
    }
  }

  return result;
}

/**
 * Deep-merges a partial ThemeOverride on top of the GuidanceNow defaults.
 * Any key omitted from the override keeps its default value, so missing or
 * invalid overrides can never break the UI.
 */
export function mergeTheme(override?: ThemeOverride): Theme {
  if (!override) {
    return sys as unknown as Theme;
  }

  return deepMerge(
    sys as unknown as Record<string, unknown>,
    override as Record<string, unknown>,
  ) as Theme;
}
