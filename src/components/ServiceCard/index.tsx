import React, { useMemo } from 'react';

import {
  I18nManager,
  Image,
  type ImageSourcePropType,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { type IconName, SIZE_MAP, resolveIcon } from '../../icons';
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
  /** Gradient colors for the "doubled" variant inner card (e.g. ['#a855f7', '#6366f1']). Falls back to the solid token color when omitted. */
  gradient?: readonly [string, string, ...string[]];
  /** Start point of the gradient in 0–1 coordinate space. Defaults to { x: 0, y: 0 } (top). */
  gradientStart?: { x: number; y: number };
  /** End point of the gradient in 0–1 coordinate space. Defaults to { x: 0, y: 1 } (bottom). */
  gradientEnd?: { x: number; y: number };
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
  gradient,
  gradientStart,
  gradientEnd,
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
        showChevron: false,
      },
    }),
    [dim],
  );

  const v = variantTokens[variant];
  const s = sizeTokens[size];
  const isRow = s.layout === 'row';

  const LucideIcon = icon ? resolveIcon(icon) : null;
  const ChevronRight = resolveIcon('ChevronRight');
  const iconColor = v.iconBadgeColor ?? v.titleColor;
  const { size: iconPx, strokeWidth: iconSW } = SIZE_MAP[s.iconSizeName];
  const renderedIcon = LucideIcon ? (
    <LucideIcon size={iconPx} color={iconColor} strokeWidth={iconSW} />
  ) : null;

  const outerStyle = [
    {
      backgroundColor: v.bg,
      borderColor: v.borderColor,
      borderWidth: v.borderWidth,
      borderRadius:
        variant === 'doubled' ? dim.borderRadius.sysRadiusXl : s.borderRadius,

      opacity: disabled ? 0.48 : 1,
    },
    v.elevated && ELEVATION,
    variant !== 'doubled' && {
      paddingHorizontal: s.paddingH,
      paddingVertical: s.paddingV,
    },
    fullWidth && { alignSelf: 'stretch' as const },
    isRow ? styles.rowRoot : styles.colRoot,
    !isRow && variant !== 'image' && { gap: s.gap },
    variant === 'image' && { justifyContent: 'space-between' },
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
          <BodyText variant="small" color={v.descColor}>
            {description}
          </BodyText>
        )}
      </View>
    ) : null;

  // ── Inner content by variant ────────────────────────────────────────────────
  let inner: React.ReactNode;

  if (variant === 'doubled') {
    const doubledInnerStyle: StyleProp<ViewStyle> = [
      styles.colRoot,
      {
        alignSelf: 'stretch',
        borderRadius: dim.borderRadius.sysRadiusXl,
        borderColor: cr.accent.primary.sysOnPrimary,
        borderWidth: dim.spacing.padding.sysPadding8,
        paddingHorizontal: dim.spacing.padding.sysPadding8,
        paddingVertical: dim.spacing.padding.sysPadding16,
        gap: dim.spacing.padding.sysPadding12,
      },
    ];

    const doubledInnerContent = (
      <>
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
      </>
    );

    inner = (
      <View
        style={[doubledInnerStyle, !gradient && { backgroundColor: v.innerBg }]}
      >
        {gradient && (
          <LinearGradient
            colors={gradient}
            start={gradientStart ?? { x: 0, y: 0 }}
            end={gradientEnd ?? { x: 0, y: 1 }}
            style={[
              StyleSheet.absoluteFillObject,
              { borderRadius: dim.borderRadius.sysRadiusLg },
            ]}
          />
        )}
        {doubledInnerContent}
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
            <LinearGradient
              colors={[
                'rgba(0,0,0,0.4)',
                'rgba(0,0,0,0.05)',
                'rgba(0,0,0,0.5)',
              ]}
              locations={[0.012, 0.268, 1]}
              style={[
                { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
                { borderRadius: s.borderRadius },
              ]}
              pointerEvents="none"
            />
          </>
        )}
        <View style={{ width: s.iconSize, height: s.iconSize }}>
          {renderedIcon}
        </View>
        <View style={styles.imageBottom}>
          <View style={{ flex: 1 }}>{textBlock}</View>
          {onPress && ChevronRight && (
            <View style={styles.imageArrowButton}>
              <ChevronRight
                size={16}
                color={cr.surface.surface.sysOnSurface}
                strokeWidth={1.5}
              />
            </View>
          )}
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
        {s.showChevron && ChevronRight && (
          <ChevronRight size={20} color={v.chevronColor} strokeWidth={1.5} />
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
        {textBlock}
        {children}
        {buttonIcon && (
          <View
            style={{
              position: 'absolute',
              bottom: s.paddingV,
              ...(I18nManager.isRTL
                ? { left: s.paddingH }
                : { right: s.paddingH }),
            }}
            pointerEvents="none"
          >
            {buttonIcon}
          </View>
        )}
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
  imageBottom: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
    gap: 16,
  },
  imageArrowButton: {
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  rowTextBlock: {
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
