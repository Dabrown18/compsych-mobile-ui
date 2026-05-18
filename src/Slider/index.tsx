import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  AccessibilityInfo,
  LayoutChangeEvent,
  PanResponder,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { sys } from '../tokens';

export interface SliderProps {
  /** Controlled value */
  value?: number;
  /** Default value for uncontrolled usage (default: min) */
  defaultValue?: number;
  min?: number;
  max?: number;
  /** Snapping interval (default: 1) */
  step?: number;
  /** Called continuously while dragging */
  onValueChange?: (value: number) => void;
  /** Called when the user releases the thumb */
  onSlidingComplete?: (value: number) => void;
  /** Label rendered above the track */
  label?: string;
  /** Show min/max value labels on either side of the track */
  showMinMax?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

const { colorRoles: cr, dimensions: dim, typeScale: ts } = sys;

// ── Layout constants ──────────────────────────────────────────────────────────
const TRACK_HEIGHT = 8;
const THUMB_SIZE = 24;
const THUMB_HALF = THUMB_SIZE / 2; // 12
const HIT_HEIGHT = 48; // symbol height from Figma — contains track + thumb
// Vertical offsets within the 48px container
const TRACK_TOP = (HIT_HEIGHT - TRACK_HEIGHT) / 2; // 20
const THUMB_TOP = (HIT_HEIGHT - THUMB_SIZE) / 2;   // 12

// ── Helpers ───────────────────────────────────────────────────────────────────

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}

// ── Component ─────────────────────────────────────────────────────────────────

export function Slider({
  value: valueProp,
  defaultValue,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  onSlidingComplete,
  label,
  showMinMax = true,
  disabled = false,
  accessibilityLabel,
  style,
}: SliderProps) {
  const isControlled = valueProp !== undefined;
  const [internalValue, setInternalValue] = useState<number>(
    defaultValue ?? min,
  );
  const displayValue = isControlled ? valueProp! : internalValue;

  const [focused, setFocused] = useState(false);
  const [pressed, setPressed] = useState(false);

  // ── Track width (measured on layout) ────────────────────────────────────────
  const trackWidthRef = useRef(0);
  const [trackWidth, setTrackWidth] = useState(0);

  const handleTrackLayout = useCallback((e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    trackWidthRef.current = w;
    setTrackWidth(w);
  }, []);

  // Keep a ref to the latest displayValue so PanResponder can read it
  const displayValueRef = useRef(displayValue);
  useEffect(() => {
    displayValueRef.current = displayValue;
  }, [displayValue]);

  // ── Value conversion ─────────────────────────────────────────────────────────

  function fractionToValue(frac: number): number {
    const raw = min + clamp(frac, 0, 1) * (max - min);
    const stepped = Math.round(raw / step) * step;
    return clamp(stepped, min, max);
  }

  function valueToFraction(v: number): number {
    return (v - min) / (max - min);
  }

  function commitValue(v: number, isFinal: boolean) {
    if (!isControlled) setInternalValue(v);
    onValueChange?.(v);
    if (isFinal) onSlidingComplete?.(v);
  }

  // ── PanResponder ─────────────────────────────────────────────────────────────
  const panStartFraction = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled && trackWidthRef.current > 0,
      onMoveShouldSetPanResponder: () => !disabled && trackWidthRef.current > 0,
      // Don't let parent ScrollView steal the gesture once we've started
      onPanResponderTerminationRequest: () => false,

      onPanResponderGrant: (evt) => {
        setPressed(true);
        // Jump thumb to the tapped position on the track
        const tapped = clamp(evt.nativeEvent.locationX, 0, trackWidthRef.current);
        panStartFraction.current = tapped / trackWidthRef.current;
        const v = fractionToValue(panStartFraction.current);
        commitValue(v, false);
      },

      onPanResponderMove: (_, gs) => {
        const newFrac = clamp(
          panStartFraction.current + gs.dx / trackWidthRef.current,
          0, 1,
        );
        const v = fractionToValue(newFrac);
        commitValue(v, false);
      },

      onPanResponderRelease: (_, gs) => {
        setPressed(false);
        const newFrac = clamp(
          panStartFraction.current + gs.dx / trackWidthRef.current,
          0, 1,
        );
        commitValue(fractionToValue(newFrac), true);
      },

      onPanResponderTerminate: () => setPressed(false),
    }),
  ).current;

  // ── Derived geometry ──────────────────────────────────────────────────────────
  const fraction = trackWidth > 0 ? valueToFraction(displayValue) : 0;
  const thumbCenterX = fraction * trackWidth;
  const thumbLeft = thumbCenterX - THUMB_HALF;
  const fillWidth = thumbCenterX;

  // ── Thumb shadow — lv3 when pressed/hovered, lv1 otherwise ──────────────────
  const thumbShadow = pressed
    ? {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.16,
        shadowRadius: 16,
        elevation: 3,
      }
    : {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 1,
      };

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <View
      style={[styles.root, style]}
      accessible
      accessibilityRole="adjustable"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityValue={{
        min,
        max,
        now: displayValue,
      }}
      onAccessibilityAction={(e) => {
        if (disabled) return;
        const delta = e.nativeEvent.actionName === 'increment' ? step : -step;
        commitValue(clamp(displayValue + delta, min, max), true);
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {/* ── Optional label ────────────────────────────────────────────────── */}
      {label && (
        <Text style={styles.label}>{label}</Text>
      )}

      {/* ── Slider row ────────────────────────────────────────────────────── */}
      <View
        style={[
          styles.row,
          disabled && styles.rowDisabled,
        ]}
      >
        {/* Min label */}
        {showMinMax && (
          <Text style={styles.rangeLabel}>{min}</Text>
        )}

        {/* ── Track container — the gesture zone ──────────────────────────── */}
        <View
          style={styles.trackContainer}
          onLayout={handleTrackLayout}
          {...panResponder.panHandlers}
        >
          {/* Track background (unfilled — full width) */}
          <View style={styles.trackBg} />

          {/* Track fill (filled — up to thumb center) */}
          <View
            style={[
              styles.trackFill,
              { width: fillWidth },
            ]}
          />

          {/* ── Thumb ─────────────────────────────────────────────────────── */}
          <View
            style={[
              styles.thumb,
              { left: thumbLeft },
              thumbShadow,
            ]}
          >
            {/* Focus ring — 1px outside thumb (26×26 centered over 24×24) */}
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
          </View>
        </View>

        {/* Max label */}
        {showMinMax && (
          <Text style={styles.rangeLabel}>{max}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    gap: dim.spacing.padding.sysPadding8,
    alignSelf: 'stretch',
  },

  // ── Label ─────────────────────────────────────────────────────────────────
  label: {
    color: cr.surface.surface.sysOnSurface,
    fontSize: ts.labelMedium.sysFontSize,
    lineHeight: ts.labelMedium.sysLineHeight,
    letterSpacing: ts.labelMedium.sysTracking,
    fontWeight: '400',
    includeFontPadding: false,
  },

  // ── Row ───────────────────────────────────────────────────────────────────
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: dim.spacing.padding.sysPadding8,
  },
  rowDisabled: {
    opacity: 0.48,
  },

  // ── Range labels ──────────────────────────────────────────────────────────
  rangeLabel: {
    color: cr.surface.surface.sysOnSurfaceVariant,
    fontSize: ts.bodySmall.sysFontSize,
    lineHeight: ts.bodySmall.sysLineHeight,
    fontWeight: '400',
    includeFontPadding: false,
    flexShrink: 0,
  },

  // ── Track container ───────────────────────────────────────────────────────
  trackContainer: {
    flex: 1,
    height: HIT_HEIGHT,
    // Overflow visible so the thumb (which extends ±12px from track centre)
    // and its focus ring are not clipped at the extremes.
    overflow: 'visible',
  },

  // ── Track background ──────────────────────────────────────────────────────
  trackBg: {
    position: 'absolute',
    top: TRACK_TOP,
    left: 0,
    right: 0,
    height: TRACK_HEIGHT,
    borderRadius: 9999,
    backgroundColor: cr.surface.surfaceContainer.sysSurfaceContainerHighest,
  },

  // ── Track fill ────────────────────────────────────────────────────────────
  trackFill: {
    position: 'absolute',
    top: TRACK_TOP,
    left: 0,
    height: TRACK_HEIGHT,
    borderRadius: 9999,
    backgroundColor: cr.accent.primary.sysPrimary,
  },

  // ── Thumb ─────────────────────────────────────────────────────────────────
  thumb: {
    position: 'absolute',
    top: THUMB_TOP,
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: 9999,
    backgroundColor: cr.surface.surface.sysSurface,
    // Focus ring is absolutely positioned inside the thumb
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── Focus ring: 1px outside the 24×24 thumb → 26×26 ─────────────────────
  focusRing: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 9999,
  },
});
