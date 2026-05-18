import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { sys } from '../tokens';

export type CheckboxSize = 'sm' | 'md';
export type CheckboxCheckedState = boolean | 'indeterminate';

export interface CheckboxProps {
  checked?: CheckboxCheckedState;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: CheckboxSize;
  label?: string;
  description?: string;
  disabled?: boolean;
  invalid?: boolean;
  style?: StyleProp<ViewStyle>;
}

const { colorRoles: cr, dimensions: dim, typeScale: ts } = sys;

const SIZE_TOKENS = {
  sm: { box: 20, hitArea: 36, fontSize: ts.bodySmall.sysFontSize, lineHeight: ts.bodySmall.sysLineHeight, iconSize: 13 },
  md: { box: 24, hitArea: 40, fontSize: ts.bodyMedium.sysFontSize, lineHeight: ts.bodyMedium.sysLineHeight, iconSize: 16 },
};

export function Checkbox({
  checked: checkedProp,
  defaultChecked = false,
  onChange,
  size = 'md',
  label,
  description,
  disabled = false,
  invalid = false,
  style,
}: CheckboxProps) {
  const [internalChecked, setInternalChecked] = useState<boolean>(defaultChecked);
  const isControlled = checkedProp !== undefined;
  const checkedState: CheckboxCheckedState = isControlled ? checkedProp : internalChecked;

  const isChecked = checkedState === true;
  const isIndeterminate = checkedState === 'indeterminate';
  const isSelected = isChecked || isIndeterminate;

  const s = SIZE_TOKENS[size];
  const hitPad = (s.hitArea - s.box) / 2;

  function handlePress() {
    if (disabled) return;
    // Indeterminate → true on activation (matches HTML spec)
    const next = checkedState === true ? false : true;
    if (!isControlled) setInternalChecked(next);
    onChange?.(next);
  }

  const borderColor = invalid
    ? cr.error.sysError
    : isSelected
    ? 'transparent'
    : cr.outline.sysOutlineFixed;

  const boxBg = isSelected
    ? invalid
      ? cr.error.sysError
      : cr.accent.primary.sysPrimary
    : 'transparent';

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="checkbox"
      accessibilityLabel={label}
      accessibilityState={{
        checked: isIndeterminate ? 'mixed' : isChecked,
        disabled,
      }}
      style={({ pressed }) => [
        styles.root,
        disabled && styles.disabled,
        style,
      ]}
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
            {/* Checkbox box */}
            <View
              style={{
                width: s.box,
                height: s.box,
                borderRadius: dim.borderRadius.sysRadiusXs,
                borderWidth: isSelected ? 0 : dim.borderWidth.sysStrokeMedium,
                borderColor,
                backgroundColor: boxBg,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {isChecked && !isIndeterminate && (
                <Ionicons
                  name="checkmark"
                  size={s.iconSize}
                  color={cr.accent.primary.sysOnPrimary}
                />
              )}
              {isIndeterminate && (
                <View
                  style={{
                    width: s.box * 0.5,
                    height: 2,
                    borderRadius: 1,
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
