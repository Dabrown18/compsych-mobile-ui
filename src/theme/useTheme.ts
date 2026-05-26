import { useContext } from 'react';

import { ThemeContext } from './ThemeContext';
import type { Theme } from './types';

/**
 * Returns the active resolved theme. Components use this hook to read token
 * values at render time so they automatically reflect any ThemeProvider
 * override in the tree.
 *
 * Falls back to the GuidanceNow default theme when called outside a
 * ThemeProvider.
 */
export function useTheme(): Theme {
  return useContext(ThemeContext);
}
