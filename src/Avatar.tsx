import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { sys } from './tokens';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
export type AvatarVariant = 'text' | 'image' | 'icon';

export interface AvatarProps {
  variant?: AvatarVariant;
  size?: AvatarSize;
  /** Text variant — up to 2 initials, e.g. "CP" */
  initials?: string;
  /** Image variant — any React Native image source */
  source?: ImageSourcePropType;
  /** Icon variant — custom node; omit to use the default person icon */
  icon?: React.ReactNode;
  /** Renders a coloured ring around the avatar */
  activityRing?: boolean;
  /** Renders a shield-check badge at the bottom-right corner */
  presenceBadge?: boolean;
  /** Accessible label announced by screen readers */
  accessibilityLabel?: string;
}

const { colorRoles: cr, dimensions: dim, typeScale: ts } = sys;

const SIZE_TOKENS = {
  xs: {
    diameter: 24,
    fontSize: ts.labelSmall.sysFontSize,
    lineHeight: ts.labelSmall.sysLineHeight,
    fontWeight: '400' as const,
    iconSize: 12,
    ringBorder: dim.borderWidth.sysStrokeMedium,
    ringInset: -1,
    badgeSize: 0, // xs has no presence badge
    badgeIconSize: 0,
    badgeOffset: 0,
  },
  sm: {
    diameter: 32,
    fontSize: ts.labelMedium.sysFontSize,
    lineHeight: ts.labelMedium.sysLineHeight,
    fontWeight: '400' as const,
    iconSize: 16,
    ringBorder: dim.borderWidth.sysStrokeMedium,
    ringInset: -2,
    badgeSize: 16,
    badgeIconSize: 12,
    badgeOffset: -4,
  },
  md: {
    diameter: 40,
    fontSize: ts.labelLarge.sysFontSize,
    lineHeight: ts.labelLarge.sysLineHeight,
    fontWeight: '500' as const,
    iconSize: 20,
    ringBorder: dim.borderWidth.sysStrokeThick,
    ringInset: -2,
    badgeSize: 20,
    badgeIconSize: 16,
    badgeOffset: -4,
  },
  lg: {
    diameter: 48,
    fontSize: ts.labelLarge.sysFontSize,
    lineHeight: ts.labelLarge.sysLineHeight,
    fontWeight: '500' as const,
    iconSize: 24,
    ringBorder: dim.borderWidth.sysStrokeThick,
    ringInset: -2,
    badgeSize: 20,
    badgeIconSize: 16,
    badgeOffset: -4,
  },
  xl: {
    diameter: 64,
    fontSize: ts.labelLarge.sysFontSize,
    lineHeight: ts.labelLarge.sysLineHeight,
    fontWeight: '500' as const,
    iconSize: 32,
    ringBorder: dim.borderWidth.sysStrokeThick,
    ringInset: -2,
    badgeSize: 24,
    badgeIconSize: 20,
    badgeOffset: -4,
  },
  '2xl': {
    diameter: 88,
    fontSize: ts.titleMedium.sysFontSize,
    lineHeight: ts.titleMedium.sysLineHeight,
    fontWeight: '400' as const,
    iconSize: 44,
    ringBorder: dim.borderWidth.sysStrokeBold,
    ringInset: -2,
    badgeSize: 32,
    badgeIconSize: 24,
    badgeOffset: 0,
  },
  '3xl': {
    diameter: 120,
    fontSize: ts.titleLarge.sysFontSize,
    lineHeight: ts.titleLarge.sysLineHeight,
    fontWeight: '500' as const,
    iconSize: 60,
    ringBorder: dim.borderWidth.sysStrokeBold,
    ringInset: -2,
    badgeSize: 32,
    badgeIconSize: 24,
    badgeOffset: 0,
  },
};

export function Avatar({
  variant = 'text',
  size = 'md',
  initials = 'CP',
  source,
  icon,
  activityRing = false,
  presenceBadge = false,
  accessibilityLabel,
}: AvatarProps) {
  const s = SIZE_TOKENS[size];
  const r = s.diameter / 2;

  const defaultLabel =
    variant === 'text' ? `Avatar: ${initials}` : 'Avatar';

  return (
    // Outer wrapper — same footprint as avatar, does NOT clip so ring/badge
    // can overflow its bounds freely.
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel ?? defaultLabel}
      style={{ width: s.diameter, height: s.diameter }}
    >

      {/* ── Avatar circle ─────────────────────────────────────────────── */}
      <View
        style={[
          styles.circle,
          {
            width: s.diameter,
            height: s.diameter,
            borderRadius: r,
            backgroundColor:
              variant !== 'image'
                ? cr.custom.info.sysInfoContainer
                : undefined,
          },
        ]}
      >
        {variant === 'text' && (
          <Text
            style={{
              color: cr.custom.info.sysOnInfoContainer,
              fontSize: s.fontSize,
              lineHeight: s.lineHeight,
              fontWeight: s.fontWeight,
              includeFontPadding: false,
              textAlign: 'center',
            }}
            numberOfLines={1}
          >
            {initials}
          </Text>
        )}

        {variant === 'image' && source && (
          <Image
            source={source}
            style={{ width: s.diameter, height: s.diameter }}
            resizeMode="cover"
          />
        )}

        {variant === 'icon' && (
          icon ?? (
            <Ionicons
              name="person"
              size={s.iconSize}
              color={cr.custom.info.sysOnInfoContainer}
            />
          )
        )}
      </View>

      {/* ── Activity ring ─────────────────────────────────────────────── */}
      {activityRing && (
        <View
          accessible={false}
          style={{
            position: 'absolute',
            top: s.ringInset,
            left: s.ringInset,
            right: s.ringInset,
            bottom: s.ringInset,
            borderRadius: r + Math.abs(s.ringInset),
            borderWidth: s.ringBorder,
            borderColor: cr.accent.primary.sysPrimary,
          }}
          pointerEvents="none"
        />
      )}

      {/* ── Presence badge ────────────────────────────────────────────── */}
      {presenceBadge && s.badgeSize > 0 && (
        <View
          accessible={false}
          style={[
            styles.badge,
            {
              width: s.badgeSize,
              height: s.badgeSize,
              borderRadius: s.badgeSize / 2,
              bottom: s.badgeOffset,
              right: s.badgeOffset,
              backgroundColor:
                cr.surface.surfaceContainer.sysSurfaceContainerLowest,
            },
          ]}
        >
          <Ionicons
            name="shield-checkmark"
            size={s.badgeIconSize}
            color={cr.custom.info.sysOnInfoContainer}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden', // clips images to the circle
  },
  badge: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
