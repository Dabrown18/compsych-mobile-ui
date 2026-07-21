import React, { useMemo } from 'react';

import {
  ActivityIndicator,
  Pressable,
  type PressableProps,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useTheme } from '../../theme';

export type ButtonVariant =
  | 'filled'
  | 'tonal'
  | 'outlined'
  | 'elevated'
  | 'inverted'
  | 'text'
  | 'danger'
  | 'danger-outlined'
  | 'warning';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends Omit<
  PressableProps,
  'children' | 'style'
> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  label: string;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  iconOnly?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

export function Button({
  variant = 'filled',
  size = 'md',
  label,
  disabled = false,
  loading = false,
  fullWidth = false,
  iconOnly = false,
  leadingIcon,
  trailingIcon,
  onPress,
  accessibilityLabel,
  ...rest
}: ButtonProps) {
  const {
    colorRoles: cr,
    dimensions: dim,
    typeScale: ts,
    iconography: ico,
  } = useTheme();

  const VARIANT_TOKENS = useMemo(
    () =>
      ({
        filled: {
          bg: cr.accent.primary.sysPrimary,
          label: cr.accent.primary.sysOnPrimary,
          borderColor: 'transparent',
          borderWidth: 0,
        },
        tonal: {
          bg: cr.addOn.primaryFixed.sysPrimaryFixedDim,
          label: cr.addOn.primaryFixed.sysOnPrimaryFixed,
          borderColor: 'transparent',
          borderWidth: 0,
        },
        outlined: {
          bg: 'transparent',
          label: cr.surface.surface.sysOnSurface,
          borderColor: cr.outline.sysOutline,
          borderWidth: dim.borderWidth.sysStrokeThin,
        },
        elevated: {
          bg: cr.surface.surfaceContainer.sysSurfaceContainerLowest,
          label: cr.surface.surface.sysOnSurface,
          borderColor: 'transparent',
          borderWidth: 0,
        },
        inverted: {
          bg: cr.accent.primary.sysOnPrimary,
          label: cr.surface.surface.sysOnSurface,
          borderColor: cr.outline.sysOutline,
          borderWidth: dim.borderWidth.sysStrokeThin,
        },
        text: {
          bg: 'transparent',
          label: cr.surface.surface.sysOnSurface,
          borderColor: 'transparent',
          borderWidth: 0,
        },
        danger: {
          bg: cr.error.sysError,
          label: cr.error.sysOnError,
          borderColor: 'transparent',
          borderWidth: 0,
        },
        'danger-outlined': {
          bg: 'transparent',
          label: cr.error.sysError,
          borderColor: cr.error.sysErrorContainer,
          borderWidth: dim.borderWidth.sysStrokeThin,
        },
        warning: {
          bg: cr.custom.warning.sysWarning,
          label: cr.custom.warning.sysOnWarning,
          borderColor: 'transparent',
          borderWidth: 0,
        },
      }) as Record<
        ButtonVariant,
        { bg: string; label: string; borderColor: string; borderWidth: number }
      >,
    [cr, dim],
  );

  const SIZE_TOKENS = useMemo(
    () => ({
      sm: {
        height: 32,
        paddingH: dim.spacing.padding.sysPadding12,
        paddingV: dim.spacing.padding.sysPadding4,
        fontSize: ts.labelSmall.sysFontSize,
        lineHeight: ts.labelSmall.sysLineHeight,
        iconSize: ico.sysSizeXs,
      },
      md: {
        height: 40,
        paddingH: dim.spacing.padding.sysPadding16,
        paddingV: dim.spacing.padding.sysPadding8,
        fontSize: ts.labelMedium.sysFontSize,
        lineHeight: ts.labelMedium.sysLineHeight,
        iconSize: ico.sysSizeXs,
      },
      lg: {
        height: 48,
        paddingH: dim.spacing.padding.sysPadding24,
        paddingV: dim.spacing.padding.sysPadding12,
        fontSize: ts.labelLarge.sysFontSize,
        lineHeight: ts.labelLarge.sysLineHeight,
        iconSize: ico.sysSizeSm,
      },
      xl: {
        height: 56,
        paddingH: dim.spacing.padding.sysPadding32,
        paddingV: dim.spacing.padding.sysPadding16,
        fontSize: ts.titleSmall.sysFontSize,
        lineHeight: ts.titleSmall.sysLineHeight,
        iconSize: ico.sysSizeMd,
      },
    }),
    [dim, ts, ico],
  );

  const v = VARIANT_TOKENS[variant];
  const s = SIZE_TOKENS[size];
  const isDisabled = disabled || loading;
  const paddingH = variant === 'text' ? 0 : s.paddingH;

  return (
    <Pressable
      {...rest}
      onPress={isDisabled ? undefined : onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      style={({ pressed }) => [
        styles.root,
        {
          backgroundColor: v.bg,
          borderColor: v.borderColor,
          borderWidth: v.borderWidth,
          borderRadius: dim.borderRadius.sysRadiusFull,
          ...(iconOnly
            ? { width: s.height, height: s.height }
            : variant === 'text'
              ? {
                  // Text variant is content-height (no fixed container). Figma:
                  // sm=26px, md=28px, lg=31px, xl=32px — each resolves to
                  // lineHeight + 2×paddingV, not the standard fixed height.
                  paddingHorizontal: 0,
                  paddingVertical: s.paddingV,
                }
              : {
                  height: s.height,
                  paddingHorizontal: paddingH,
                  paddingVertical: s.paddingV,
                }),
          ...(fullWidth && !iconOnly ? { alignSelf: 'stretch' } : {}),
          opacity: isDisabled ? 0.48 : pressed ? 0.82 : 1,
          // Elevated: Figma specifies two drop shadows — RN only supports one
          // on iOS, so we use the larger/more visible one (lv2: 0px 4px 16px
          // rgba(0,0,0,0.10)) and fall back to elevation: 2 on Android.
          ...(variant === 'elevated'
            ? {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 16,
                elevation: 2,
              }
            : {}),
          // Inverted: a deliberately sharper, more pronounced "lifted off the
          // screen" shadow — tighter radius reads as a crisper edge, higher
          // opacity/offset than Elevated's soft lv2 shadow.
          ...(variant === 'inverted'
            ? {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.11,
                shadowRadius: 8,
                elevation: 10,
              }
            : {}),
        },
      ]}
    >
      <View style={[styles.content, { gap: dim.spacing.padding.sysPadding8 }]}>
        {loading ? (
          <ActivityIndicator size={s.iconSize} color={v.label} />
        ) : (
          <>
            {!iconOnly && leadingIcon && (
              <View
                style={{
                  width: s.iconSize,
                  height: s.iconSize,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {leadingIcon}
              </View>
            )}
            {!iconOnly && (
              <Text
                style={{
                  color: v.label,
                  fontSize: s.fontSize,
                  lineHeight: s.lineHeight,
                  fontWeight: '600',
                  includeFontPadding: false,
                }}
                numberOfLines={1}
              >
                {label}
              </Text>
            )}
            {trailingIcon && (
              <View
                style={{
                  width: s.iconSize,
                  height: s.iconSize,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {trailingIcon}
              </View>
            )}
          </>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // No overflow: 'hidden' here — on iOS that clips to bounds, which cuts
    // off the elevated/inverted drop shadow (shadows render outside the
    // layer's frame). Background/border-radius already render correctly
    // rounded without it, and this button's content (icon + text) never
    // overflows its own corners.
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
