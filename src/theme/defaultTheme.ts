import { sys } from '../tokens';
import type { Theme } from './types';

/**
 * The GuidanceNow default theme — the full resolved token tree typed as `Theme`
 * (widened, mutable types) so consumers can read individual values without a
 * ThemeProvider in scope.
 *
 * @example
 * import { defaultTheme } from '@compsych/mobile-ui';
 *
 * const primaryColor = defaultTheme.colorRoles.accent.primary.sysPrimary;
 * const bodyFont = defaultTheme.typeScale.body.md.fontFamily;
 */
export const defaultTheme: Theme = sys as unknown as Theme;
