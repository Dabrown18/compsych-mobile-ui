import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { sys } from './tokens';

export type AlertVariant =
  | 'default'
  | 'elevated'
  | 'informative'
  | 'warning'
  | 'positive'
  | 'danger';

export type AlertSize = 'sm' | 'lg';

export interface AlertProps {
  variant?: AlertVariant;
  size?: AlertSize;
  /** Bold title — lg size only */
  title?: string;
  /** Body / description text */
  description: string;
  /** Custom leading icon — overrides the default per-variant icon */
  icon?: React.ReactNode;
  /** Hide the leading icon entirely */
  hideIcon?: boolean;
  /** Label for the optional action button */
  actionLabel?: string;
  onAction?: () => void;
  /** Show dismiss (×) button */
  dismissible?: boolean;
  onDismiss?: () => void;
}

const { colorRoles: cr, dimensions: dim, typeScale: ts } = sys;

// ── Variant color map ────────────────────────────────────────────────────────

type VariantColors = {
  bg: string;
  text: string;
  iconColor: string;
  elevated: boolean;
  actionBorder: boolean;
};

function getVariantColors(variant: AlertVariant): VariantColors {
  switch (variant) {
    case 'default':
      return {
        bg: cr.surface.surfaceContainer.sysSurfaceContainerLow,
        text: cr.surface.surface.sysOnSurface,
        iconColor: cr.surface.surface.sysOnSurfaceVariant,
        elevated: false,
        actionBorder: false,
      };
    case 'elevated':
      return {
        bg: cr.surface.surfaceContainer.sysSurfaceContainerLowest,
        text: cr.surface.surface.sysOnSurface,
        iconColor: cr.surface.surface.sysOnSurfaceVariant,
        elevated: true,
        actionBorder: true,
      };
    case 'informative':
      return {
        bg: cr.custom.info.sysInfoContainer,
        text: cr.custom.info.sysOnInfoContainer,
        iconColor: cr.custom.info.sysOnInfoContainer,
        elevated: false,
        actionBorder: false,
      };
    case 'warning':
      return {
        bg: cr.custom.warning.sysWarningContainer,
        text: cr.custom.warning.sysOnWarningContainer,
        iconColor: cr.custom.warning.sysOnWarningContainer,
        elevated: false,
        actionBorder: false,
      };
    case 'positive':
      return {
        bg: cr.custom.success.sysSuccessContainer,
        text: cr.custom.success.sysOnSuccessContainer,
        iconColor: cr.custom.success.sysOnSuccessContainer,
        elevated: false,
        actionBorder: false,
      };
    case 'danger':
      return {
        bg: cr.error.sysErrorContainer,
        text: cr.error.sysOnErrorContainer,
        iconColor: cr.error.sysOnErrorContainer,
        elevated: false,
        actionBorder: false,
      };
  }
}

// ── Default icon per variant ─────────────────────────────────────────────────

function defaultIconName(
  variant: AlertVariant,
): React.ComponentProps<typeof Ionicons>['name'] {
  switch (variant) {
    case 'default':
    case 'elevated':
      return 'information-circle-outline';
    case 'informative':
      return 'information-circle';
    case 'warning':
      return 'warning';
    case 'positive':
      return 'checkmark-circle';
    case 'danger':
      return 'alert-circle';
  }
}

// ── Component ────────────────────────────────────────────────────────────────

export function Alert({
  variant = 'default',
  size = 'lg',
  title,
  description,
  icon,
  hideIcon = false,
  actionLabel,
  onAction,
  dismissible = false,
  onDismiss,
}: AlertProps) {
  const c = getVariantColors(variant);
  const isLg = size === 'lg';

  const resolvedIcon =
    !hideIcon &&
    (icon ?? (
      <Ionicons
        name={defaultIconName(variant)}
        size={isLg ? 24 : 20}
        color={c.iconColor}
      />
    ));

  return (
    <View
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
      style={[
        styles.root,
        {
          backgroundColor: c.bg,
          borderRadius: isLg
            ? dim.borderRadius.sysRadiusLg
            : dim.borderRadius.sysRadiusMd,
        },
        c.elevated && styles.elevated,
      ]}
    >
      {/* ── Content row ─────────────────────────────────────────────────── */}
      <View
        style={[
          styles.content,
          {
            paddingHorizontal: isLg
              ? dim.spacing.padding.sysPadding24
              : dim.spacing.padding.sysPadding16,
            paddingVertical: isLg
              ? dim.spacing.padding.sysPadding16
              : dim.spacing.padding.sysPadding16,
            gap: isLg
              ? dim.spacing.padding.sysPadding16
              : dim.spacing.padding.sysPadding12,
            alignItems: isLg ? 'flex-start' : 'center',
          },
        ]}
      >
        {/* Leading icon */}
        {resolvedIcon && (
          <View
            style={{
              paddingTop: isLg ? dim.spacing.padding.sysPadding2 : 0,
              flexShrink: 0,
            }}
          >
            {resolvedIcon}
          </View>
        )}

        {/* Text + action */}
        <View style={styles.textAction}>
          {/* Text block */}
          <View style={[styles.textBlock, { gap: 4 }]}>
            {isLg && title && (
              <Text
                style={{
                  color: c.text,
                  fontSize: ts.titleSmall.sysFontSize,
                  lineHeight: ts.titleSmall.sysLineHeight,
                  fontWeight: '500',
                  includeFontPadding: false,
                }}
              >
                {title}
              </Text>
            )}
            <Text
              style={{
                color: c.text,
                fontSize: isLg
                  ? ts.bodyMedium.sysFontSize
                  : ts.bodySmall.sysFontSize,
                lineHeight: isLg
                  ? ts.bodyMedium.sysLineHeight
                  : ts.bodySmall.sysLineHeight,
                fontWeight: '400',
                includeFontPadding: false,
              }}
            >
              {description}
            </Text>
          </View>

          {/* Action button */}
          {actionLabel && (
            isLg ? (
              // lg: pill button with white bg + shadow (or border for elevated)
              <Pressable
                onPress={onAction}
                accessibilityRole="button"
                accessibilityLabel={actionLabel}
                style={({ pressed }) => [
                  styles.actionLg,
                  c.actionBorder && styles.actionLgBorder,
                  pressed && { opacity: 0.84 },
                ]}
              >
                <Text
                  style={{
                    color: cr.surface.surface.sysOnSurface,
                    fontSize: ts.labelMedium.sysFontSize,
                    lineHeight: ts.labelMedium.sysLineHeight,
                    fontWeight: '400',
                    includeFontPadding: false,
                  }}
                >
                  {actionLabel}
                </Text>
              </Pressable>
            ) : (
              // sm: text-only button
              <Pressable
                onPress={onAction}
                accessibilityRole="button"
                accessibilityLabel={actionLabel}
                style={styles.actionSm}
              >
                <Text
                  style={{
                    color: c.text,
                    fontSize: ts.labelMedium.sysFontSize,
                    lineHeight: ts.labelMedium.sysLineHeight,
                    fontWeight: '500',
                    includeFontPadding: false,
                  }}
                >
                  {actionLabel}
                </Text>
              </Pressable>
            )
          )}
        </View>

        {/* Dismiss button */}
        {dismissible && (
          <Pressable
            onPress={onDismiss}
            accessibilityRole="button"
            accessibilityLabel="Dismiss"
            style={({ pressed }) => [
              styles.closeBtn,
              isLg ? styles.closeBtnLg : styles.closeBtnSm,
              pressed && { opacity: 0.6 },
            ]}
          >
            <Ionicons
              name="close"
              size={16}
              color={c.iconColor}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    overflow: 'hidden',
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
    overflow: 'visible',
  },
  content: {
    flexDirection: 'row',
  },
  textAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: 0,
    gap: 16,
  },
  textBlock: {
    flex: 1,
    minWidth: 0,
  },
  // lg action button — elevated pill
  actionLg: {
    height: 40,
    paddingHorizontal: 24,
    borderRadius: 9999,
    backgroundColor: cr.surface.surfaceContainer.sysSurfaceContainerLowest,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  actionLgBorder: {
    borderWidth: 1,
    borderColor: cr.outline.sysOutline,
  },
  // sm action button — text only
  actionSm: {
    flexShrink: 0,
  },
  closeBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
  },
  closeBtnLg: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
  },
  closeBtnSm: {
    width: 32,
    height: 32,
    flexShrink: 0,
  },
});
