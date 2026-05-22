import { sys } from '../../tokens';
import { mergeTheme } from '../mergeTheme';

describe('mergeTheme', () => {
  it('returns the default GuidanceNow theme when no override is provided', () => {
    expect(mergeTheme()).toEqual(sys);
  });

  it('returns the default theme when override is undefined', () => {
    expect(mergeTheme(undefined)).toEqual(sys);
  });

  it('overrides a single top-level color token', () => {
    const result = mergeTheme({
      colorRoles: { accent: { primary: { sysPrimary: '#c00000' } } },
    });

    expect(result.colorRoles.accent.primary.sysPrimary).toBe('#c00000');
  });

  it('preserves all non-overridden default values', () => {
    const result = mergeTheme({
      colorRoles: { accent: { primary: { sysPrimary: '#c00000' } } },
    });

    expect(result.colorRoles.accent.primary.sysOnPrimary).toBe(
      sys.colorRoles.accent.primary.sysOnPrimary,
    );
    expect(result.colorRoles.error.sysError).toBe(
      sys.colorRoles.error.sysError,
    );
    expect(result.dimensions.borderRadius.sysRadiusMd).toBe(
      sys.dimensions.borderRadius.sysRadiusMd,
    );
    expect(result.typeScale.bodyMedium.sysFontSize).toBe(
      sys.typeScale.bodyMedium.sysFontSize,
    );
  });

  it('overrides a numeric dimension token', () => {
    const result = mergeTheme({
      dimensions: { borderRadius: { sysRadiusMd: 99 } },
    });

    expect(result.dimensions.borderRadius.sysRadiusMd).toBe(99);
    expect(result.dimensions.borderRadius.sysRadiusSm).toBe(
      sys.dimensions.borderRadius.sysRadiusSm,
    );
  });

  it('overrides a typeScale token', () => {
    const result = mergeTheme({
      typeScale: { bodyMedium: { sysFontSize: 18 } },
    });

    expect(result.typeScale.bodyMedium.sysFontSize).toBe(18);
    expect(result.typeScale.bodyMedium.sysLineHeight).toBe(
      sys.typeScale.bodyMedium.sysLineHeight,
    );
  });

  it('ignores null override values and keeps defaults', () => {
    const result = mergeTheme({
      colorRoles: {
        accent: { primary: { sysPrimary: null as unknown as string } },
      },
    });

    expect(result.colorRoles.accent.primary.sysPrimary).toBe(
      sys.colorRoles.accent.primary.sysPrimary,
    );
  });

  it('handles an empty override object without changing anything', () => {
    const result = mergeTheme({});
    expect(result).toEqual(sys);
  });

  it('handles deeply partial overrides spanning multiple branches', () => {
    const result = mergeTheme({
      colorRoles: { accent: { primary: { sysPrimary: '#aabbcc' } } },
      dimensions: { borderRadius: { sysRadiusFull: 500 } },
    });

    expect(result.colorRoles.accent.primary.sysPrimary).toBe('#aabbcc');
    expect(result.dimensions.borderRadius.sysRadiusFull).toBe(500);
    expect(result.colorRoles.error.sysError).toBe(
      sys.colorRoles.error.sysError,
    );
    expect(result.dimensions.borderRadius.sysRadiusMd).toBe(
      sys.dimensions.borderRadius.sysRadiusMd,
    );
  });
});
