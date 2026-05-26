import { sys } from '../../tokens';
import { defaultTheme } from '../defaultTheme';

describe('defaultTheme', () => {
  it('equals the GuidanceNow default token values', () => {
    expect(defaultTheme).toEqual(sys);
  });

  it('exposes colorRoles tokens at the correct paths', () => {
    expect(defaultTheme.colorRoles.accent.primary.sysPrimary).toBe(
      sys.colorRoles.accent.primary.sysPrimary,
    );
    expect(defaultTheme.colorRoles.error.sysError).toBe(
      sys.colorRoles.error.sysError,
    );
  });

  it('exposes dimension tokens at the correct paths', () => {
    expect(defaultTheme.dimensions.borderRadius.sysRadiusMd).toBe(
      sys.dimensions.borderRadius.sysRadiusMd,
    );
  });

  it('exposes typeScale tokens at the correct paths', () => {
    expect(defaultTheme.typeScale.bodyMedium.sysFontSize).toBe(
      sys.typeScale.bodyMedium.sysFontSize,
    );
  });

  it('is typed as Theme — readable without a ThemeProvider in scope', () => {
    // This is a compile-time check: accessing a property on the widened Theme type
    // (not the narrow `as const` literal type) must not require a type cast.
    const primary: string = defaultTheme.colorRoles.accent.primary.sysPrimary;
    expect(typeof primary).toBe('string');
  });
});
