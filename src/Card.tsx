import React from 'react';
import { Pressable, StyleSheet, View, type PressableProps, type ViewProps } from 'react-native';
import { sys } from './tokens';

export type CardVariant = 'outlined' | 'filled' | 'gradient';
export type CardSize = 'sm' | 'md' | 'lg' | 'xl';

export interface CardProps {
  variant?: CardVariant;
  size?: CardSize;
  interactive?: boolean;
  disabled?: boolean;
  current?: boolean;
  fullWidth?: boolean;
  onPress?: () => void;
  children?: React.ReactNode;
  accessibilityLabel?: string;
}

const { colorRoles: cr, dimensions: dim } = sys;

const VARIANT_TOKENS = {
  outlined: {
    bg: cr.surface.surfaceContainer.sysSurfaceContainerLowest,
    borderColor: cr.outline.sysOutline,
    borderWidth: dim.borderWidth.sysStrokeThin,
    elevated: false,
  },
  filled: {
    bg: cr.accent.primary.sysPrimaryContainer,
    borderColor: 'transparent',
    borderWidth: 0,
    elevated: true,
  },
  gradient: {
    // Approximates the gradient variant with a tinted surface; expo-linear-gradient not required.
    bg: cr.surface.surfaceContainer.sysSurfaceContainerLowest,
    borderColor: cr.outline.sysOutline,
    borderWidth: dim.borderWidth.sysStrokeThin,
    elevated: false,
  },
};

const SIZE_TOKENS = {
  sm: {
    padding: dim.spacing.padding.sysPadding24,
    borderRadius: dim.borderRadius.sysRadiusLg,
    gap: dim.spacing.padding.sysPadding12,
  },
  md: {
    padding: dim.spacing.padding.sysPadding32,
    borderRadius: dim.borderRadius.sysRadiusLg,
    gap: dim.spacing.padding.sysPadding16,
  },
  lg: {
    padding: dim.spacing.padding.sysPadding32,
    borderRadius: dim.borderRadius.sysRadiusLg,
    gap: dim.spacing.padding.sysPadding24,
  },
  xl: {
    padding: dim.spacing.padding.sysPadding48,
    borderRadius: dim.borderRadius.sysRadiusXl,
    gap: dim.spacing.padding.sysPadding24,
  },
};

export function Card({
  variant = 'outlined',
  size = 'md',
  interactive = false,
  disabled = false,
  current = false,
  fullWidth = false,
  onPress,
  children,
  accessibilityLabel,
}: CardProps) {
  const v = VARIANT_TOKENS[variant];
  const s = SIZE_TOKENS[size];

  const borderColor = current ? cr.accent.primary.sysPrimary : v.borderColor;
  const borderWidth = current ? dim.borderWidth.sysStrokeThick : v.borderWidth;

  const baseStyle = {
    backgroundColor: v.bg,
    borderColor,
    borderWidth,
    borderRadius: s.borderRadius,
    padding: s.padding,
    gap: s.gap,
    ...(fullWidth ? { alignSelf: 'stretch' as const } : {}),
    ...(v.elevated
      ? {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.06,
          shadowRadius: 4,
          elevation: 1,
        }
      : {}),
    opacity: disabled ? 0.48 : 1,
  };

  // Gradient variant: overlay a subtle primary tint over the content area
  const gradientOverlay =
    variant === 'gradient' ? (
      <View
        style={[
          StyleSheet.absoluteFillObject,
          {
            borderRadius: s.borderRadius,
            backgroundColor: cr.transparent.primary.sysPrimary08,
          },
        ]}
        pointerEvents="none"
      />
    ) : null;

  if (interactive || onPress) {
    return (
      <Pressable
        onPress={disabled ? undefined : onPress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ disabled, selected: current }}
        style={({ pressed }) => [
          styles.root,
          baseStyle,
          pressed && !disabled
            ? { opacity: 0.84 }
            : {},
        ]}
      >
        {gradientOverlay}
        {children}
      </Pressable>
    );
  }

  return (
    <View style={[styles.root, baseStyle]}>
      {gradientOverlay}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    overflow: 'hidden',
  },
});
