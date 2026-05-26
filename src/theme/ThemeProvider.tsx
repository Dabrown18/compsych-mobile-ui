import React, { useMemo } from 'react';

import { ThemeContext } from './ThemeContext';
import { mergeTheme } from './mergeTheme';
import type { ThemeOverride } from './types';

export interface ThemeProviderProps {
  /**
   * Optional partial theme override. Keys present here replace the
   * corresponding GuidanceNow default values; all other tokens keep their
   * defaults. Pass `undefined` (or omit this prop) to use the GuidanceNow
   * theme unchanged.
   */
  theme?: ThemeOverride;
  children: React.ReactNode;
}

/**
 * Wraps your application (or a subtree) and provides a resolved theme to all
 * `@compsych/mobile-ui` components beneath it.
 *
 * @example — default GuidanceNow theme
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 *
 * @example — custom brand override
 * <ThemeProvider theme={{ colorRoles: { accent: { primary: { sysPrimary: '#c00000' } } } }}>
 *   <App />
 * </ThemeProvider>
 */
export function ThemeProvider({ theme, children }: ThemeProviderProps) {
  const resolvedTheme = useMemo(() => mergeTheme(theme), [theme]);

  return (
    <ThemeContext.Provider value={resolvedTheme}>
      {children}
    </ThemeContext.Provider>
  );
}
