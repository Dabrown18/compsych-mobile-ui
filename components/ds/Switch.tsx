import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { sys } from './tokens';

export interface SwitchProps {
  /** Controlled value. Omit to use internal state. */
  value?: boolean;
  /** Default value for uncontrolled usage */
  defaultValue?: boolean;
  /** Called when the user toggles the switch */
  onValueChange?: (value: boolean) => void;
  disabled?: boolean;
  accessibilityLabel?: string;
}

const { colorRoles: cr, dimensions: dim } = sys;

// ── Layout constants ──────────────────────────────────────────────────────────
const TRACK_W = 56;
const TRACK_H = 32;
const THUMB_SIZE = 24;
const TRACK_PADDING = dim.spacing.padding.sysPadding4;

// Thumb translateX: off=left edge, on=right edge
const THUMB_OFF = TRACK_PADDING; // 4
const THUMB_ON = TRACK_W - TRACK_PADDING - THUMB_SIZE; // 56 - 4 - 24 = 28

// ── Component ─────────────────────────────────────────────────────────────────

export function Switch({
  value: valueProp,
  defaultValue = false,
  onValueChange,
  disabled = false,
  accessibilityLabel,
}: SwitchProps) {
  // Controlled vs uncontrolled
  const isControlled = valueProp !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const toggled = isControlled ? valueProp! : internalValue;

  const [focused, setFocused] = useState(false);

  // ── Animation ──────────────────────────────────────────────────────────────
  const thumbAnim = useRef(new Animated.Value(toggled ? THUMB_ON : THUMB_OFF)).current;
  const bgAnim = useRef(new Animated.Value(toggled ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(thumbAnim, {
        toValue: toggled ? THUMB_ON : THUMB_OFF,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(bgAnim, {
        toValue: toggled ? 1 : 0,
        duration: 150,
        useNativeDriver: false, // backgroundColor not supported by native driver
      }),
    ]).start();
  }, [toggled]);

  // Interpolate background color
  const trackBg = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      cr.surface.surfaceContainer.sysSurfaceContainerHighest,
      cr.accent.primary.sysPrimary,
    ],
  });

  // Thumb color: on=sysOnPrimary, off=sysSurface
  const thumbBg = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [cr.surface.surface.sysSurface, cr.accent.primary.sysOnPrimary],
  });

  // ── Handler ────────────────────────────────────────────────────────────────
  function handlePress() {
    if (disabled) return;
    const next = !toggled;
    if (!isControlled) setInternalValue(next);
    onValueChange?.(next);
  }

  return (
    <Pressable
      onPress={handlePress}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      disabled={disabled}
      accessibilityRole="switch"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ checked: toggled, disabled }}
      style={styles.pressable}
    >
      {/* ── Focus ring (outside track by 1px) ─────────────────────────────── */}
      {focused && (
        <View
          style={[
            styles.focusRing,
            {
              borderColor: cr.addOn.primaryFixed.sysOnPrimaryFixedVariant,
              borderWidth: dim.borderWidth.sysStrokeMedium,
            },
          ]}
          pointerEvents="none"
        />
      )}

      {/* ── Track ─────────────────────────────────────────────────────────── */}
      <Animated.View
        style={[
          styles.track,
          { backgroundColor: trackBg },
          disabled && styles.trackDisabled,
        ]}
      >
        {/* ── Thumb ───────────────────────────────────────────────────────── */}
        <Animated.View
          style={[
            styles.thumb,
            {
              backgroundColor: thumbBg,
              transform: [{ translateX: thumbAnim }],
            },
            disabled && styles.thumbDisabled,
          ]}
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    // Sized to the track; focus ring is absolutely overlaid
    width: TRACK_W,
    height: TRACK_H,
    alignSelf: 'flex-start',
  },
  track: {
    width: TRACK_W,
    height: TRACK_H,
    borderRadius: 9999,
    // Thumb is absolutely positioned inside the track
    position: 'relative',
  },
  trackDisabled: {
    opacity: 0.48,
  },
  thumb: {
    position: 'absolute',
    top: TRACK_PADDING,
    left: 0, // translateX drives actual X position
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: 9999,
    // lv2 shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  thumbDisabled: {
    opacity: 0.64,
  },
  // Focus ring: 1px outside the track on all sides
  focusRing: {
    position: 'absolute',
    top: -2,    // 1px gap + sysStrokeMedium (1.5px) ≈ 2px
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 9999,
  },
});
