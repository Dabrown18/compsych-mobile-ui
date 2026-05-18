import React from 'react';

import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { sys } from '../../tokens';

export type ChipSize = 'sm' | 'md' | 'lg' | 'xl';
export type ChipUsage = 'neutral' | 'informative' | 'positive' | 'danger' | 'warning';

export interface ChipProps {
  label: string;
  size?: ChipSize;
  usage?: ChipUsage;
  /** Optional icon rendered before the label */
  leadingIcon?: React.ReactNode;
  /** Renders a close button — fires onDismiss when tapped */
  dismissible?: boolean;
  onDismiss?: () => void;
  /** Renders a small count badge after the label */
  badge?: number | string;
  style?: StyleProp<ViewStyle>;
}

const { colorRoles: cr, dimensions: dim, typeScale: ts } = sys;

// ── Size tokens ───────────────────────────────────────────────────────────────

const SIZE_TOKENS = {
  sm: {
    height: 20,
    paddingH: dim.spacing.padding.sysPadding8,
    paddingV: dim.spacing.padding.sysPadding4,
    gap: dim.spacing.padding.sysPadding4,
    fontSize: ts.labelSmall.sysFontSize,
    lineHeight: ts.labelSmall.sysLineHeight,
    letterSpacing: ts.labelSmall.sysTracking,
    iconSize: 16,
    closeBtnSize: 16,
    closeIconSize: 12,
    badgeSize: 16,
    badgeFontSize: ts.labelSmall.sysFontSize,
    badgeLineHeight: ts.labelSmall.sysLineHeight,
  },
  md: {
    height: 24,
    paddingH: dim.spacing.padding.sysPadding12,
    paddingV: dim.spacing.padding.sysPadding4,
    gap: dim.spacing.padding.sysPadding4,
    fontSize: ts.labelMedium.sysFontSize,
    lineHeight: ts.labelMedium.sysLineHeight,
    letterSpacing: ts.labelMedium.sysTracking,
    iconSize: 16,
    closeBtnSize: 16,
    closeIconSize: 12,
    badgeSize: 16,
    badgeFontSize: ts.labelSmall.sysFontSize,
    badgeLineHeight: ts.labelSmall.sysLineHeight,
  },
  lg: {
    height: 32,
    paddingH: dim.spacing.padding.sysPadding16,
    paddingV: dim.spacing.padding.sysPadding4,
    gap: dim.spacing.padding.sysPadding8,
    fontSize: ts.labelMedium.sysFontSize,
    lineHeight: ts.labelMedium.sysLineHeight,
    letterSpacing: ts.labelMedium.sysTracking,
    iconSize: 20,
    closeBtnSize: 20,
    closeIconSize: 16,
    badgeSize: 20,
    badgeFontSize: ts.labelSmall.sysFontSize,
    badgeLineHeight: ts.labelSmall.sysLineHeight,
  },
  xl: {
    height: 40,
    paddingH: dim.spacing.padding.sysPadding16,
    paddingV: dim.spacing.padding.sysPadding8,
    gap: dim.spacing.padding.sysPadding8,
    fontSize: ts.bodyMedium.sysFontSize,
    lineHeight: ts.bodyMedium.sysLineHeight,
    letterSpacing: ts.bodyMedium.sysTracking,
    iconSize: 20,
    closeBtnSize: 24,
    closeIconSize: 16,
    badgeSize: 24,
    badgeFontSize: ts.labelMedium.sysFontSize,
    badgeLineHeight: ts.labelMedium.sysLineHeight,
  },
};

// ── Usage/color tokens ────────────────────────────────────────────────────────

type UsageColors = {
  bg: string;
  text: string;
  closeBg: string;
  badgeBg: string;
  badgeText: string;
  /** true → render elevation shadow */
  elevated: boolean;
};

function getUsageColors(usage: ChipUsage): UsageColors {
  switch (usage) {
    case 'neutral':
      return {
        bg: cr.surface.surfaceContainer.sysSurfaceContainerLowest,
        text: cr.surface.surface.sysOnSurface,
        closeBg: cr.surface.surfaceContainer.sysSurfaceContainerLow,
        badgeBg: cr.surface.surfaceContainer.sysSurfaceContainer,
        badgeText: cr.surface.surface.sysOnSurface,
        elevated: true,
      };
    case 'informative':
      return {
        bg: cr.custom.info.sysInfo,
        text: cr.accent.primary.sysOnPrimary,
        closeBg: cr.transparent.neutral.sysWhite20,
        badgeBg: cr.transparent.neutral.sysWhite20,
        badgeText: cr.custom.info.sysOnInfo,
        elevated: false,
      };
    case 'positive':
      return {
        bg: cr.custom.success.sysSuccess,
        text: cr.custom.success.sysOnSuccess,
        closeBg: cr.transparent.neutral.sysWhite20,
        badgeBg: cr.transparent.neutral.sysWhite20,
        badgeText: cr.custom.success.sysOnSuccess,
        elevated: false,
      };
    case 'danger':
      return {
        bg: cr.error.sysError,
        text: cr.error.sysOnError,
        closeBg: cr.transparent.neutral.sysWhite20,
        badgeBg: cr.transparent.neutral.sysWhite20,
        badgeText: cr.error.sysOnError,
        elevated: false,
      };
    case 'warning':
      return {
        bg: cr.custom.warning.sysWarning,
        text: cr.custom.warning.sysOnWarning,
        closeBg: cr.transparent.neutral.sysWhite20,
        badgeBg: cr.transparent.neutral.sysWhite20,
        badgeText: cr.custom.warning.sysOnWarning,
        elevated: false,
      };
  }
}

// ── Component ─────────────────────────────────────────────────────────────────

export function Chip({
  label,
  size = 'md',
  usage = 'neutral',
  leadingIcon,
  dismissible = false,
  onDismiss,
  badge,
  style,
}: ChipProps) {
  const s = SIZE_TOKENS[size];
  const c = getUsageColors(usage);

  return (
    <View
      accessible
      accessibilityRole="none"
      accessibilityLabel={badge !== undefined ? `${label}, ${badge}` : label}
      style={[
        styles.root,
        {
          height: s.height,
          paddingHorizontal: s.paddingH,
          paddingVertical: s.paddingV,
          gap: s.gap,
          backgroundColor: c.bg,
        },
        c.elevated && styles.elevated,
        style,
      ]}
    >
      {/* Leading icon */}
      {leadingIcon && (
        <View
          style={{
            width: s.iconSize,
            height: s.iconSize,
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {leadingIcon}
        </View>
      )}

      {/* Label */}
      <Text
        style={{
          color: c.text,
          fontSize: s.fontSize,
          lineHeight: s.lineHeight,
          letterSpacing: s.letterSpacing,
          includeFontPadding: false,
        }}
        numberOfLines={1}
      >
        {label}
      </Text>

      {/* Badge */}
      {badge !== undefined && (
        <View
          style={{
            width: s.badgeSize,
            height: s.badgeSize,
            borderRadius: s.badgeSize / 2,
            backgroundColor: c.badgeBg,
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Text
            style={{
              color: c.badgeText,
              fontSize: s.badgeFontSize,
              lineHeight: s.badgeLineHeight,
              includeFontPadding: false,
              fontWeight: '500',
            }}
          >
            {badge}
          </Text>
        </View>
      )}

      {/* Dismiss button */}
      {dismissible && (
        <Pressable
          onPress={onDismiss}
          accessibilityRole="button"
          accessibilityLabel="Dismiss"
          hitSlop={4}
          style={({ pressed }) => ({
            width: s.closeBtnSize,
            height: s.closeBtnSize,
            borderRadius: s.closeBtnSize / 2,
            backgroundColor: pressed ? cr.transparent.neutral.sysBlack10 : c.closeBg,
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            overflow: 'hidden',
          })}
        >
          <Ionicons name="close" size={s.closeIconSize} color={c.text} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: 9999,
    overflow: 'hidden',
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    // overflow must be visible for shadow on iOS — override here
    overflow: 'visible',
  },
});
