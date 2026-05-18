import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { sys } from '../../tokens';

export type TooltipVariant = 'filled' | 'elevated';
/**
 * The direction the arrow points — i.e. where the tooltip's target is
 * relative to the bubble.
 *
 * `bottom` → bubble sits above target, arrow points down
 * `top`    → bubble sits below target, arrow points up
 * `left`   → bubble sits right of target, arrow points left
 * `right`  → bubble sits left of target, arrow points right
 * `none`   → no arrow
 */
export type TooltipDirection = 'none' | 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  text: string;
  variant?: TooltipVariant;
  direction?: TooltipDirection;
  style?: StyleProp<ViewStyle>;
}

const { colorRoles: cr, dimensions: dim, typeScale: ts } = sys;

// ── Arrow dimensions ─────────────────────────────────────────────────────────
const ARROW_BASE = 16; // px — wide axis
const ARROW_HEIGHT = 6; // px — narrow axis

// ── Component ────────────────────────────────────────────────────────────────

export function Tooltip({
  text,
  variant = 'filled',
  direction = 'none',
  style,
}: TooltipProps) {
  const isFilled = variant === 'filled';

  const bg = isFilled
    ? cr.surface.inverse.sysInverseSurface
    : cr.surface.surfaceContainer.sysSurfaceContainerLowest;

  const textColor = isFilled
    ? cr.surface.inverse.sysInverseOnSurface
    : cr.surface.surface.sysOnSurface;

  // ── Arrow (CSS triangle using zero-size View + borders) ───────────────────
  // Half-base for side calculations
  const half = ARROW_BASE / 2;

  function renderArrow() {
    if (direction === 'none') return null;

    // Shared transparent sides
    const transparent = 'transparent';

    let arrowStyle: object;

    switch (direction) {
      case 'bottom':
        // Triangle pointing down — sits below bubble
        arrowStyle = {
          width: 0,
          height: 0,
          borderLeftWidth: half,
          borderRightWidth: half,
          borderTopWidth: ARROW_HEIGHT,
          borderLeftColor: transparent,
          borderRightColor: transparent,
          borderTopColor: bg,
        };
        break;
      case 'top':
        // Triangle pointing up — sits above bubble
        arrowStyle = {
          width: 0,
          height: 0,
          borderLeftWidth: half,
          borderRightWidth: half,
          borderBottomWidth: ARROW_HEIGHT,
          borderLeftColor: transparent,
          borderRightColor: transparent,
          borderBottomColor: bg,
        };
        break;
      case 'left':
        // Triangle pointing left — sits to the left of bubble
        arrowStyle = {
          width: 0,
          height: 0,
          borderTopWidth: half,
          borderBottomWidth: half,
          borderRightWidth: ARROW_HEIGHT,
          borderTopColor: transparent,
          borderBottomColor: transparent,
          borderRightColor: bg,
        };
        break;
      case 'right':
        // Triangle pointing right — sits to the right of bubble
        arrowStyle = {
          width: 0,
          height: 0,
          borderTopWidth: half,
          borderBottomWidth: half,
          borderLeftWidth: ARROW_HEIGHT,
          borderTopColor: transparent,
          borderBottomColor: transparent,
          borderLeftColor: bg,
        };
        break;
    }

    return <View accessible={false} style={arrowStyle!} />;
  }

  // ── Bubble ────────────────────────────────────────────────────────────────
  const bubble = (
    <View
      accessible
      accessibilityRole="text"
      accessibilityLabel={text}
      style={[
        styles.bubble,
        {
          backgroundColor: bg,
          paddingHorizontal: dim.spacing.padding.sysPadding12,
          paddingVertical: dim.spacing.padding.sysPadding8,
          borderRadius: dim.borderRadius.sysRadiusSm,
        },
        !isFilled && styles.elevated,
        !isFilled && {
          borderWidth: dim.borderWidth.sysStrokeThin,
          borderColor: cr.outline.sysOutline,
        },
      ]}
    >
      <Text
        style={{
          color: textColor,
          fontSize: ts.bodySmall.sysFontSize,
          lineHeight: ts.bodySmall.sysLineHeight,
          fontWeight: '400',
          textAlign: 'center',
          includeFontPadding: false,
        }}
      >
        {text}
      </Text>
    </View>
  );

  // ── Layout — arrow position determines stacking order ────────────────────
  if (direction === 'none') {
    return <View style={style}>{bubble}</View>;
  }

  if (direction === 'bottom') {
    return (
      <View style={[styles.colCenter, style]}>
        {bubble}
        {renderArrow()}
      </View>
    );
  }

  if (direction === 'top') {
    return (
      <View style={[styles.colCenter, style]}>
        {renderArrow()}
        {bubble}
      </View>
    );
  }

  if (direction === 'right') {
    return (
      <View style={[styles.rowCenter, style]}>
        {bubble}
        {renderArrow()}
      </View>
    );
  }

  // left
  return (
    <View style={[styles.rowCenter, style]}>
      {renderArrow()}
      {bubble}
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    alignSelf: 'flex-start',
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  colCenter: {
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
});
