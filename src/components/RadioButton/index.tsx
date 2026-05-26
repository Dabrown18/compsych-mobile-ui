import React, { useMemo, useState } from 'react';

import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import { useTheme } from '../../theme';

export type RadioButtonSize = 'sm' | 'md';

export interface RadioButtonProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: RadioButtonSize;
  label?: string;
  description?: string;
  disabled?: boolean;
  invalid?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function RadioButton({
  checked: checkedProp,
  defaultChecked = false,
  onChange,
  size = 'md',
  label,
  description,
  disabled = false,
  invalid = false,
  style,
}: RadioButtonProps) {
  const { colorRoles: cr, dimensions: dim, typeScale: ts } = useTheme();
  const [internalChecked, setInternalChecked] =
    useState<boolean>(defaultChecked);
  const isControlled = checkedProp !== undefined;
  const isChecked: boolean = isControlled
    ? (checkedProp as boolean)
    : internalChecked;

  const sizeTokens = useMemo(
    () => ({
      sm: {
        // Container (overall hit area)
        hitArea: 36,
        // Visible circle
        circle: 20,
        // Inner dot when selected
        dot: 8,
        fontSize: ts.bodySmall.sysFontSize,
        lineHeight: ts.bodySmall.sysLineHeight,
      },
      md: {
        hitArea: 40,
        circle: 24,
        dot: 10,
        fontSize: ts.bodyMedium.sysFontSize,
        lineHeight: ts.bodyMedium.sysLineHeight,
      },
    }),
    [ts],
  );

  const s = sizeTokens[size];

  function handlePress() {
    if (disabled) return;
    const next = !isChecked;
    if (!isControlled) setInternalChecked(next);
    onChange?.(next);
  }

  // Border/fill colours
  const borderColor = invalid
    ? cr.error.sysError
    : isChecked
      ? cr.accent.primary.sysPrimary
      : cr.outline.sysOutlineFixed;

  const circleBg = isChecked ? cr.accent.primary.sysPrimary : 'transparent';

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="radio"
      accessibilityLabel={label}
      accessibilityState={{ checked: isChecked, disabled }}
      style={() => [styles.root, disabled && styles.disabled, style]}
    >
      {({ pressed }) => (
        <>
          {/* Hit-area / state-layer circle */}
          <View
            style={[
              styles.hitArea,
              {
                width: s.hitArea,
                height: s.hitArea,
                borderRadius: s.hitArea / 2,
                backgroundColor:
                  pressed && !disabled
                    ? cr.transparent.neutral.sysBlack10
                    : 'transparent',
              },
            ]}
          >
            {/* Visible radio circle */}
            <View
              style={{
                width: s.circle,
                height: s.circle,
                borderRadius: s.circle / 2,
                borderWidth: dim.borderWidth.sysStrokeMedium,
                borderColor,
                backgroundColor: circleBg,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Inner white dot — only visible when selected */}
              {isChecked && (
                <View
                  style={{
                    width: s.dot,
                    height: s.dot,
                    borderRadius: s.dot / 2,
                    backgroundColor: cr.accent.primary.sysOnPrimary,
                  }}
                />
              )}
            </View>
          </View>

          {(label || description) && (
            <View style={[styles.textBlock, { gap: 2 }]}>
              {label && (
                <Text
                  style={{
                    color: cr.surface.surface.sysOnSurface,
                    fontSize: s.fontSize,
                    lineHeight: s.lineHeight,
                    includeFontPadding: false,
                  }}
                >
                  {label}
                </Text>
              )}
              {description && (
                <Text
                  style={{
                    color: cr.surface.surface.sysOnSurfaceVariant,
                    fontSize: s.fontSize - 2,
                    lineHeight: s.lineHeight - 2,
                    includeFontPadding: false,
                  }}
                >
                  {description}
                </Text>
              )}
            </View>
          )}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hitArea: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBlock: {
    flex: 1,
    flexDirection: 'column',
  },
  disabled: {
    opacity: 0.48,
  },
});
