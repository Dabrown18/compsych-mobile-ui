import { sys } from '../tokens';

// Strip `as const` readonly modifiers and widen literal types to their
// primitive base (string, number, boolean) so consumers can supply any valid
// CSS color or numeric value in a ThemeOverride — not just the exact GuidanceNow
// hex literals.
type DeepWritable<T> = {
  -readonly [P in keyof T]: DeepWritable<T[P]>;
};

type WidenLiterals<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends object
        ? { [K in keyof T]: WidenLiterals<T[K]> }
        : T;

/** The full resolved theme object consumed by every component via useTheme(). */
export type Theme = WidenLiterals<DeepWritable<typeof sys>>;

type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

/**
 * A partial theme override — any subset of the token tree.
 * Missing keys fall back to the GuidanceNow defaults.
 *
 * @example
 * const brandTheme: ThemeOverride = {
 *   colorRoles: {
 *     accent: { primary: { sysPrimary: '#c00000' } },
 *   },
 * };
 */
export type ThemeOverride = DeepPartial<Theme>;
