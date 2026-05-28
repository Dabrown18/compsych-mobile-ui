import React, { useMemo } from 'react';

import {
  Image,
  type ImageSourcePropType,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { ICON_MAP, type IconName } from '../../icons';
import { useTheme } from '../../theme';
import { BodyText } from '../BodyText';

export type ServiceCardVariant =
  | 'outlined'
  | 'tonal'
  | 'filled'
  | 'doubled'
  | 'image';
export type ServiceCardSize = 'sm' | 'md' | 'lg';

export interface ServiceCardProps {
  variant?: ServiceCardVariant;
  size?: ServiceCardSize;
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: IconName;
  image?: ImageSourcePropType;
  buttonIcon?: React.ReactNode;
  interactive?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  children?: React.ReactNode;
  accessibilityLabel?: string;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
}

const ELEVATION = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 8,
  elevation: 2,
};

// ── Component ─────────────────────────────────────────────────────────────────

export function ServiceCard({
  variant = 'outlined',
  size = 'lg',
  title,
  description,
  icon,
  image,
  buttonIcon,
  interactive = false,
  disabled = false,
  onPress,
  children,
  accessibilityLabel,
  fullWidth = false,
  style,
}: ServiceCardProps) {
  const { colorRoles: cr, dimensions: dim } = useTheme();

  const variantTokens = useMemo(
    () => ({
      outlined: {
        bg: cr.surface.surfaceContainer.sysSurfaceContainerLowest,
        borderColor: cr.outline.sysOutline,
        borderWidth: dim.borderWidth.sysStrokeThin,
        elevated: true,
        titleColor: cr.surface.surface.sysOnSurface,
        descColor: cr.surface.surface.sysOnSurfaceVariant,
        chevronColor: cr.outline.sysOutlineFixed,
        innerBg: undefined,
        iconBadgeBg: undefined,
        iconBadgeColor: undefined,
      },
      tonal: {
        bg: cr.addOn.primaryFixed.sysPrimaryFixedDim,
        borderColor: 'transparent',
        borderWidth: 0,
        elevated: false,
        titleColor: cr.addOn.primaryFixed.sysOnPrimaryFixed,
        descColor: cr.addOn.primaryFixed.sysOnPrimaryFixed,
        chevronColor: cr.addOn.primaryFixed.sysOnPrimaryFixed,
        innerBg: undefined,
        iconBadgeBg: undefined,
        iconBadgeColor: undefined,
      },
      filled: {
        bg: cr.accent.primary.sysPrimaryContainer,
        borderColor: 'transparent',
        borderWidth: 0,
        elevated: false,
        titleColor: cr.accent.primary.sysOnPrimary,
        descColor: cr.transparent.neutral.sysWhite80,
        chevronColor: cr.accent.primary.sysOnPrimary,
        innerBg: undefined,
        iconBadgeBg: undefined,
        iconBadgeColor: undefined,
      },
      doubled: {
        bg: cr.surface.surfaceContainer.sysSurfaceContainerLowest,
        borderColor: cr.outline.sysOutline,
        borderWidth: dim.borderWidth.sysStrokeThin,
        elevated: false,
        titleColor: cr.surface.surface.sysOnSurface,
        descColor: cr.surface.surface.sysOnSurfaceVariant,
        chevronColor: cr.outline.sysOutlineFixed,
        innerBg: cr.transparent.primary.sysPrimary08,
        iconBadgeBg: cr.accent.primary.sysPrimary,
        iconBadgeColor: cr.accent.primary.sysOnPrimary,
      },
      image: {
        bg: 'transparent',
        borderColor: 'transparent',
        borderWidth: 0,
        elevated: false,
        titleColor: cr.surface.inverse.sysInverseOnSurface,
        descColor: cr.transparent.neutral.sysWhite80,
        chevronColor: cr.surface.inverse.sysInverseOnSurface,
        innerBg: undefined,
        iconBadgeBg: undefined,
        iconBadgeColor: undefined,
      },
    }),
    [cr, dim],
  );

  const sizeTokens = useMemo(
    () => ({
      sm: {
        layout: 'row' as const,
        paddingH: dim.spacing.padding.sysPadding16,
        paddingV: dim.spacing.padding.sysPadding12,
        gap: dim.spacing.padding.sysPadding12,
        borderRadius: dim.borderRadius.sysRadiusMd,
        iconSize: 24,
        iconSizeName: 'small' as const,
        titleVariant: 'medium' as const,
        descVariant: 'small' as const,
        showChevron: true,
      },
      md: {
        layout: 'column' as const,
        paddingH: dim.spacing.padding.sysPadding16,
        paddingV: dim.spacing.padding.sysPadding16,
        gap: dim.spacing.padding.sysPadding24,
        borderRadius: dim.borderRadius.sysRadiusLg,
        iconSize: 32,
        iconSizeName: 'medium' as const,
        titleVariant: 'medium' as const,
        descVariant: 'small' as const,
        showChevron: false,
      },
      lg: {
        layout: 'column' as const,
        paddingH: dim.spacing.padding.sysPadding16,
        paddingV: dim.spacing.padding.sysPadding16,
        gap: dim.spacing.padding.sysPadding32,
        borderRadius: dim.borderRadius.sysRadiusLg,
        iconSize: 32,
        iconSizeName: 'large' as const,
        titleVariant: 'large' as const,
        descVariant: 'small' as const,
        showChevron: false,
      },
    }),
    [dim],
  );

  const v = variantTokens[variant];
  const s = sizeTokens[size];
  const isRow = s.layout === 'row';

  const IconComponent = icon ? ICON_MAP[icon] : null;
  const iconColor = v.iconBadgeColor ?? v.titleColor;
  const renderedIcon = IconComponent ? (
    <IconComponent size={s.iconSizeName} color={iconColor} />
  ) : null;

  const outerStyle = [
    {
      backgroundColor: v.bg,
      borderColor: v.borderColor,
      borderWidth: v.borderWidth,
      borderRadius:
        variant === 'doubled' ? dim.borderRadius.sysRadiusXl : s.borderRadius,
      paddingHorizontal:
        variant === 'doubled' ? dim.spacing.padding.sysPadding8 : s.paddingH,
      paddingVertical:
        variant === 'doubled' ? dim.spacing.padding.sysPadding8 : s.paddingV,
      opacity: disabled ? 0.48 : 1,
    },
    v.elevated && ELEVATION,
    fullWidth && { alignSelf: 'stretch' as const },
    isRow ? styles.rowRoot : styles.colRoot,
    !isRow && { gap: s.gap },
    style,
  ];

  // ── Text block ──────────────────────────────────────────────────────────────
  const textBlock =
    title || description ? (
      <View style={isRow ? styles.rowTextBlock : undefined}>
        {title && (
          <BodyText variant={s.titleVariant} color={v.titleColor}>
            {title}
          </BodyText>
        )}
        {!isRow && description && (
          <BodyText variant={s.descVariant} color={v.descColor}>
            {description}
          </BodyText>
        )}
      </View>
    ) : null;

  // ── Inner content by variant ────────────────────────────────────────────────
  let inner: React.ReactNode;

  if (variant === 'doubled') {
    inner = (
      <View
        style={[
          styles.colRoot,
          {
            backgroundColor: v.innerBg,
            borderRadius: s.borderRadius,
            paddingHorizontal: s.paddingH,
            paddingVertical: s.paddingV,
            gap: dim.spacing.padding.sysPadding24,
          },
        ]}
      >
        {renderedIcon && (
          <View
            style={[
              styles.doubledIconBadge,
              {
                backgroundColor: v.iconBadgeBg,
                borderRadius: dim.borderRadius.sysRadiusFull,
              },
            ]}
          >
            {renderedIcon}
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
              style={[
                { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
                { borderRadius: s.borderRadius },
              ]}
              resizeMode="cover"
              accessible={false}
            />
            <View
              style={[
                { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
                {
                  borderRadius: s.borderRadius,
                  backgroundColor: 'rgba(0,0,0,0.30)',
                },
              ]}
              pointerEvents="none"
            />
          </>
        )}
        {renderedIcon && (
          <View style={{ width: s.iconSize, height: s.iconSize }}>
            {renderedIcon}
          </View>
        )}
        <View style={styles.contentRow}>
          {(title || description) && (
            <View style={styles.contentText}>
              {title && (
                <BodyText variant={s.titleVariant} color={v.titleColor}>
                  {title}
                </BodyText>
              )}
              {description && (
                <BodyText variant={s.descVariant} color={v.descColor}>
                  {description}
                </BodyText>
              )}
            </View>
          )}
          {buttonIcon}
        </View>
        {children}
      </>
    );
  } else if (isRow) {
    // sm — horizontal row
    inner = (
      <>
        {renderedIcon && (
          <View style={{ width: s.iconSize, height: s.iconSize }}>
            {renderedIcon}
          </View>
        )}
        {textBlock}
        {s.showChevron && (
          <Ionicons
            name="chevron-forward"
            size={20}
            color={v.chevronColor}
            accessible={false}
          />
        )}
        {children}
      </>
    );
  } else {
    // md / lg — vertical column
    inner = (
      <>
        {renderedIcon && (
          <View style={{ width: s.iconSize, height: s.iconSize }}>
            {renderedIcon}
          </View>
        )}
        <View style={styles.contentRow}>
          {(title || description) && (
            <View style={styles.contentText}>
              {title && (
                <BodyText variant={s.titleVariant} color={v.titleColor}>
                  {title}
                </BodyText>
              )}
              {description && (
                <BodyText variant={s.descVariant} color={v.descColor}>
                  {description}
                </BodyText>
              )}
            </View>
          )}
          {buttonIcon}
        </View>
        {children}
      </>
    );
  }

  // ── Wrapper ─────────────────────────────────────────────────────────────────
  if (interactive || onPress) {
    return (
      <Pressable
        onPress={disabled ? undefined : onPress}
        accessibilityRole="button"
        accessibilityLabel={
          accessibilityLabel ?? (typeof title === 'string' ? title : undefined)
        }
        accessibilityState={{ disabled }}
        style={({ pressed }) => [
          styles.overflow,
          ...outerStyle,
          pressed && !disabled && styles.pressed,
        ]}
      >
        {inner}
      </Pressable>
    );
  }

  return <View style={[styles.overflow, ...outerStyle]}>{inner}</View>;
}

const styles = StyleSheet.create({
  overflow: {
    overflow: 'hidden',
  },
  colRoot: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  rowRoot: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowTextBlock: {
    flex: 1,
    minWidth: 0,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignSelf: 'stretch',
    gap: 16,
  },
  contentText: {
    flex: 1,
    minWidth: 0,
  },
  doubledIconBadge: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.84,
  },
});
