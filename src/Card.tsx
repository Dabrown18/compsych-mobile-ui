import React from 'react';
import {
  Image,
  type ImageSourcePropType,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { sys } from './tokens';
import { BodyText } from './BodyText';

export type CardVariant = 'outlined' | 'tonal' | 'filled' | 'doubled' | 'image';
export type CardSize = 'sm' | 'md' | 'lg';

export interface CardProps {
  variant?: CardVariant;
  size?: CardSize;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  image?: ImageSourcePropType;
  interactive?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  children?: React.ReactNode;
  accessibilityLabel?: string;
  fullWidth?: boolean;
}

const { colorRoles: cr, dimensions: dim } = sys;

const VARIANT_TOKENS = {
  outlined: {
    outerBg: cr.surface.surfaceContainer.sysSurfaceContainerLowest,
    borderColor: cr.outline.sysOutline,
    borderWidth: dim.borderWidth.sysStrokeThin,
    outerRadius: dim.borderRadius.sysRadiusLg,
    elevated: true,
    titleColor: cr.surface.surface.sysOnSurface,
    descColor: cr.surface.surface.sysOnSurfaceVariant,
  },
  tonal: {
    outerBg: cr.addOn.primaryFixed.sysPrimaryFixedDim,
    borderColor: 'transparent',
    borderWidth: 0,
    outerRadius: dim.borderRadius.sysRadiusLg,
    elevated: false,
    titleColor: cr.addOn.primaryFixed.sysOnPrimaryFixed,
    descColor: cr.addOn.primaryFixed.sysOnPrimaryFixed,
  },
  filled: {
    outerBg: cr.accent.primary.sysPrimaryContainer,
    borderColor: 'transparent',
    borderWidth: 0,
    outerRadius: dim.borderRadius.sysRadiusLg,
    elevated: true,
    titleColor: cr.surface.surface.sysOnSurface,
    descColor: cr.surface.surface.sysOnSurfaceVariant,
  },
  doubled: {
    outerBg: cr.surface.surfaceContainer.sysSurfaceContainerLowest,
    borderColor: cr.outline.sysOutline,
    borderWidth: dim.borderWidth.sysStrokeThin,
    outerRadius: dim.borderRadius.sysRadiusXl,
    elevated: false,
    titleColor: cr.surface.surface.sysOnSurface,
    descColor: cr.surface.surface.sysOnSurfaceVariant,
  },
  image: {
    outerBg: 'transparent',
    borderColor: 'transparent',
    borderWidth: 0,
    outerRadius: dim.borderRadius.sysRadiusLg,
    elevated: false,
    titleColor: '#ffffff',
    descColor: cr.transparent.neutral.sysWhite80,
  },
};

const SIZE_PADDING: Record<CardSize, number> = {
  sm: dim.spacing.padding.sysPadding8,
  md: dim.spacing.padding.sysPadding12,
  lg: dim.spacing.padding.sysPadding16,
};

const ELEVATION = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 8,
  elevation: 2,
};

export function Card({
  variant = 'outlined',
  size = 'lg',
  title,
  description,
  icon,
  image,
  interactive = false,
  disabled = false,
  onPress,
  children,
  accessibilityLabel,
  fullWidth = false,
}: CardProps) {
  const v = VARIANT_TOKENS[variant];
  const padding = SIZE_PADDING[size];

  const outerStyle = [
    styles.root,
    {
      backgroundColor: v.outerBg,
      borderColor: v.borderColor,
      borderWidth: v.borderWidth,
      borderRadius: v.outerRadius,
      padding: variant === 'doubled' ? dim.spacing.padding.sysPadding8 : padding,
      opacity: disabled ? 0.48 : 1,
    },
    v.elevated && ELEVATION,
    fullWidth && { alignSelf: 'stretch' as const },
  ];

  const textBlock = (title || description) ? (
    <View style={styles.textBlock}>
      {title && (
        <BodyText variant="large" color={v.titleColor}>
          {title}
        </BodyText>
      )}
      {description && (
        <BodyText variant="small" color={v.descColor}>
          {description}
        </BodyText>
      )}
    </View>
  ) : null;

  let inner: React.ReactNode;

  if (variant === 'doubled') {
    inner = (
      <View
        style={[
          styles.doubledInner,
          {
            backgroundColor: cr.transparent.primary.sysPrimary08,
            borderRadius: dim.borderRadius.sysRadiusLg,
            padding,
          },
        ]}
      >
        {icon && (
          <View
            style={[
              styles.doubledIconBadge,
              {
                backgroundColor: cr.accent.primary.sysPrimary,
                borderRadius: dim.borderRadius.sysRadiusFull,
              },
            ]}
          >
            {icon}
          </View>
        )}
        {textBlock}
        {children}
      </View>
    );
  } else if (variant === 'image') {
    inner = (
      <>
        {image && (
          <>
            <Image
              source={image}
              style={[StyleSheet.absoluteFillObject, { borderRadius: v.outerRadius }]}
              resizeMode="cover"
              accessible={false}
            />
            <View
              style={[
                StyleSheet.absoluteFillObject,
                { borderRadius: v.outerRadius, backgroundColor: 'rgba(0,0,0,0.30)' },
              ]}
              pointerEvents="none"
            />
          </>
        )}
        {icon && <View style={styles.iconSlot}>{icon}</View>}
        {textBlock}
        {children}
      </>
    );
  } else {
    inner = (
      <>
        {icon && <View style={styles.iconSlot}>{icon}</View>}
        {textBlock}
        {children}
      </>
    );
  }

  if (interactive || onPress) {
    return (
      <Pressable
        onPress={disabled ? undefined : onPress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? title}
        accessibilityState={{ disabled }}
        style={({ pressed }) => [outerStyle, pressed && !disabled && styles.pressed]}
      >
        {inner}
      </Pressable>
    );
  }

  return <View style={outerStyle}>{inner}</View>;
}

const styles = StyleSheet.create({
  root: {
    overflow: 'hidden',
    gap: 32,
  },
  pressed: {
    opacity: 0.84,
  },
  iconSlot: {
    width: 32,
    height: 32,
  },
  textBlock: {
    gap: 0,
  },
  doubledInner: {
    gap: 24,
  },
  doubledIconBadge: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
