import React, { useMemo, useState } from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

import { useTheme } from '../../theme';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  size?: InputSize;
  label?: string;
  helperText?: string;
  errorText?: string;
  invalid?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

// Focus-ring halo: 4px spread, sysPrimary08 colour — achieved with a fixed
// 4px-padded wrapper whose background switches on focus.
const RING_SIZE = 4;

export function Input({
  size = 'md',
  label,
  helperText,
  errorText,
  invalid = false,
  leadingIcon,
  trailingIcon,
  editable = true,
  onFocus,
  onBlur,
  ...rest
}: InputProps) {
  const { colorRoles: cr, dimensions: dim, typeScale: ts } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const SIZE_TOKENS = useMemo(
    () => ({
      sm: {
        height: 40,
        paddingH: dim.spacing.padding.sysPadding12,
        paddingV: dim.spacing.padding.sysPadding8,
        gap: dim.spacing.padding.sysPadding4,
        fontSize: ts.bodySmall.sysFontSize,
        lineHeight: ts.bodySmall.sysLineHeight,
        radius: dim.borderRadius.sysRadiusSm,
        iconSize: 20,
      },
      md: {
        height: 48,
        paddingH: dim.spacing.padding.sysPadding16,
        paddingV: dim.spacing.padding.sysPadding12,
        gap: dim.spacing.padding.sysPadding8,
        fontSize: ts.bodyMedium.sysFontSize,
        lineHeight: ts.bodyMedium.sysLineHeight,
        radius: dim.borderRadius.sysRadiusSm,
        iconSize: 20,
      },
      lg: {
        height: 56,
        paddingH: dim.spacing.padding.sysPadding20,
        paddingV: dim.spacing.padding.sysPadding16,
        gap: dim.spacing.padding.sysPadding8,
        fontSize: ts.bodyMedium.sysFontSize,
        lineHeight: ts.bodyMedium.sysLineHeight,
        radius: dim.borderRadius.sysRadiusMd,
        iconSize: 20,
      },
    }),
    [dim, ts],
  );

  const s = SIZE_TOKENS[size];
  const isDisabled = editable === false;
  const hasError = invalid || !!errorText;

  // ── Border ──────────────────────────────────────────────────────────────
  const borderWidth =
    isFocused || hasError
      ? dim.borderWidth.sysStrokeMedium
      : dim.borderWidth.sysStrokeThin;

  const borderColor = hasError
    ? cr.error.sysError
    : isFocused
      ? cr.accent.primary.sysPrimary
      : cr.outline.sysOutlineVariant;

  // ── Text colours ─────────────────────────────────────────────────────────
  const textColor = cr.surface.surface.sysOnSurface;
  const placeholderColor = cr.surface.surface.sysOnSurfaceVariant;

  // ── Helper / error text ──────────────────────────────────────────────────
  const supportingText = errorText ?? helperText;
  const supportingColor = hasError
    ? cr.error.sysError
    : cr.surface.surface.sysOnSurfaceVariant;

  return (
    <View style={[styles.wrapper, isDisabled && styles.disabled]}>
      {/* Label */}
      {label && (
        <Text
          style={[
            styles.label,
            {
              color: hasError
                ? cr.error.sysError
                : cr.surface.surface.sysOnSurfaceVariant,
              fontSize: ts.labelMedium.sysFontSize,
              lineHeight: ts.labelMedium.sysLineHeight,
            },
          ]}
        >
          {label}
        </Text>
      )}

      {/* Focus-ring halo wrapper — always 4px padding, bg appears on focus */}
      <View
        style={{
          padding: RING_SIZE,
          borderRadius: s.radius + RING_SIZE,
          backgroundColor:
            isFocused && !hasError
              ? cr.transparent.primary.sysPrimary08
              : 'transparent',
        }}
      >
        {/* Input container */}
        <View
          style={{
            height: s.height,
            borderRadius: s.radius,
            borderWidth,
            borderColor,
            backgroundColor:
              cr.surface.surfaceContainer.sysSurfaceContainerLowest,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: s.paddingH,
            paddingVertical: s.paddingV,
            gap: s.gap,
            overflow: 'hidden',
          }}
        >
          {/* Leading icon */}
          {leadingIcon && (
            <View
              style={{
                width: s.iconSize,
                height: s.iconSize,
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {leadingIcon}
            </View>
          )}

          {/* Text input */}
          <TextInput
            {...rest}
            editable={editable}
            accessibilityLabel={label ?? rest.placeholder}
            accessibilityHint={supportingText}
            accessibilityState={{ disabled: isDisabled }}
            onFocus={(e) => {
              setIsFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur?.(e);
            }}
            style={{
              flex: 1,
              fontSize: s.fontSize,
              lineHeight: s.lineHeight,
              color: textColor,
              includeFontPadding: false,
              // Reset RN TextInput default padding/margin
              padding: 0,
              margin: 0,
            }}
            placeholderTextColor={placeholderColor}
          />

          {/* Trailing icon */}
          {trailingIcon && (
            <View
              style={{
                width: s.iconSize,
                height: s.iconSize,
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {trailingIcon}
            </View>
          )}
        </View>
      </View>

      {/* Supporting text: error message or helper text */}
      {supportingText && (
        <Text
          style={[
            styles.supporting,
            {
              color: supportingColor,
              fontSize: ts.bodySmall.sysFontSize,
              lineHeight: ts.bodySmall.sysLineHeight,
            },
          ]}
        >
          {supportingText}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 4,
  },
  disabled: {
    opacity: 0.48,
  },
  label: {
    fontWeight: '500',
    includeFontPadding: false,
    // indent to align with the input text (ring padding + horizontal padding)
    paddingLeft: RING_SIZE,
  },
  supporting: {
    includeFontPadding: false,
    paddingLeft: RING_SIZE,
  },
});
