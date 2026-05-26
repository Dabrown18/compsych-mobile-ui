import { createContext } from 'react';

import { sys } from '../tokens';
import type { Theme } from './types';

/**
 * Provides the active resolved theme to all components.
 * Default value is the GuidanceNow theme so components render correctly
 * even when no ThemeProvider is present in the tree.
 */
export const ThemeContext = createContext<Theme>(sys as unknown as Theme);
