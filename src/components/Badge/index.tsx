import React from 'react';

import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { sys } from '../../tokens';

export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgeStyle =
  | 'filled'
  | 'positive'
  | 'danger'
  | 'elevated'
  | 'tonal'
  | 'dot';

export interface BadgeProps {
  /** Number or short string to display — ignored for `dot` style */
  label?: number | string;
  size?: BadgeSize;
  badgeStyle?: BadgeStyle;
  style?: StyleProp<ViewStyle>;
}

const { colorRoles: cr, dimensions: dim, typeScale: ts } = sys;

// ── Size tokens ───────────────────────────────────────────────────────────────

const SIZE_TOKENS = {
  sm: {
    outerSize: 16,
    paddingH: dim.spacing.padding.sysPadding4,
    fontSize: ts.labelSmall.sysFontSize,
    lineHeight: ts.labelSmall.sysLineHeight,
    letterSpacing: ts.labelSmall.sysTracking,
    dotInner: 6,
  },
  md: {
    outerSize: 20,
    paddingH: dim.spacing.padding.sysPadding8,
    fontSize: ts.labelMedium.sysFontSize,
    lineHeight: ts.labelMedium.sysLineHeight,
    letterSpacing: ts.labelMedium.sysTracking,
    dotInner: 8,
  },
  lg: {
    outerSize: 24,
    paddingH: dim.spacing.padding.sysPadding8,
    fontSize: ts.labelMedium.sysFontSize,
    lineHeight: ts.labelMedium.sysLineHeight,
    letterSpacing: ts.labelMedium.sysTracking,
    dotInner: 12,
  },
};

// ── Style/color tokens ────────────────────────────────────────────────────────

type StyleColors = {
  bg: string;
  text: string;
  elevated: boolean;
};

function getStyleColors(style: BadgeStyle): StyleColors {
  switch (style) {
    case 'filled':
      return {
        bg: cr.accent.primary.sysPrimary,
        text: cr.accent.primary.sysOnPrimary,
        elevated: false,
      };
    case 'positive':
      return {
        bg: cr.custom.success.sysSuccess,
        text: cr.custom.success.sysOnSuccess,
        elevated: false,
      };
    case 'danger':
      return {
        bg: cr.error.sysError,
        text: cr.error.sysOnError,
        elevated: false,
      };
    case 'elevated':
      return {
        bg: cr.surface.surfaceContainer.sysSurfaceContainerLowest,
        text: cr.surface.surface.sysOnSurface,
        elevated: true,
      };
    case 'tonal':
      return {
        bg: cr.surface.surfaceContainer.sysSurfaceContainer,
        text: cr.surface.surface.sysOnSurface,
        elevated: false,
      };
    case 'dot':
      // Container is transparent; the dot itself is sysPrimary
      return {
        bg: 'transparent',
        text: 'transparent',
        elevated: false,
      };
  }
}

// ── Component ─────────────────────────────────────────────────────────────────

export function Badge({
  label,
  size = 'md',
  badgeStyle = 'filled',
  style,
}: BadgeProps) {
  const s = SIZE_TOKENS[size];
  const c = getStyleColors(badgeStyle);

  // Dot variant — render a solid filled circle inside a transparent wrapper
  if (badgeStyle === 'dot') {
    return (
      <View
        accessible={false}
        style={[
          {
            width: s.outerSize,
            height: s.outerSize,
            borderRadius: s.outerSize / 2,
            alignItems: 'center',
            justifyContent: 'center',
          },
          style,
        ]}
      >
        <View
          style={{
            width: s.dotInner,
            height: s.dotInner,
            borderRadius: s.dotInner / 2,
            backgroundColor: cr.accent.primary.sysPrimary,
          }}
        />
      </View>
    );
  }

  // Number/text badge — pill that is at minimum a circle, grows wider for
  // longer labels (e.g. "99+")
  const displayLabel = label !== undefined ? String(label) : '';

  return (
    <View
      accessible
      accessibilityLabel={displayLabel ? `${displayLabel} badge` : 'Badge'}
      style={[
        styles.root,
        {
          minWidth: s.outerSize,
          height: s.outerSize,
          borderRadius: s.outerSize / 2,
          paddingHorizontal: s.paddingH,
          backgroundColor: c.bg,
        },
        c.elevated && styles.elevated,
        style,
      ]}
    >
      <Text
        style={{
          color: c.text,
          fontSize: s.fontSize,
          lineHeight: s.lineHeight,
          letterSpacing: s.letterSpacing,
          fontWeight: '500',
          includeFontPadding: false,
          textAlign: 'center',
        }}
        numberOfLines={1}
      >
        {displayLabel}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    // overflow visible so elevated shadow renders outside the pill
    overflow: 'visible',
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
});
