import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { sys } from '../tokens';

export type EmptyStateStyle = 'icon' | 'illustration';
export type EmptyStateViewport = 'desktop' | 'mobile';

export interface EmptyStateProps {
  /** Visual style of the graphic area */
  style?: EmptyStateStyle;
  /** desktop = larger type + 60px icon circle; mobile = smaller type + 48px circle */
  viewport?: EmptyStateViewport;
  /** Heading text (default: "No results") */
  title?: string;
  /** Body copy below the title */
  description?: string;
  /** Hide the description even when `description` is provided */
  showDescription?: boolean;
  /** Custom icon rendered inside the icon circle (icon style only) */
  icon?: React.ReactNode;
  /** Label for the optional action button */
  actionLabel?: string;
  onAction?: () => void;
  /** Whether the action button is shown (default: true when actionLabel is set) */
  showAction?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

const { colorRoles: cr, dimensions: dim, typeScale: ts } = sys;

// ── Size tokens by viewport ───────────────────────────────────────────────────

const VIEWPORT = {
  desktop: {
    iconCircle: 60,
    iconSize: 32,
    titleFontSize: ts.titleMedium.sysFontSize,
    titleLineHeight: ts.titleMedium.sysLineHeight,
    descFontSize: ts.bodyMedium.sysFontSize,
    descLineHeight: ts.bodyMedium.sysLineHeight,
    contentGap: dim.spacing.padding.sysPadding24,
    btnHeight: 40,
    btnPaddingL: dim.spacing.padding.sysPadding16,
    btnPaddingR: dim.spacing.padding.sysPadding24,
    btnGap: dim.spacing.padding.sysPadding8,
    btnFontSize: ts.labelMedium.sysFontSize,
    btnLineHeight: ts.labelMedium.sysLineHeight,
    btnTracking: ts.labelMedium.sysTracking,
  },
  mobile: {
    iconCircle: 48,
    iconSize: 24,
    titleFontSize: ts.labelLarge.sysFontSize,
    titleLineHeight: ts.labelLarge.sysLineHeight,
    descFontSize: ts.bodySmall.sysFontSize,
    descLineHeight: ts.bodySmall.sysLineHeight,
    contentGap: dim.spacing.padding.sysPadding16,
    btnHeight: 32,
    btnPaddingL: dim.spacing.padding.sysPadding12,
    btnPaddingR: dim.spacing.padding.sysPadding16,
    btnGap: dim.spacing.padding.sysPadding4,
    btnFontSize: ts.labelSmall.sysFontSize,
    btnLineHeight: ts.labelSmall.sysLineHeight,
    btnTracking: ts.labelSmall.sysTracking,
  },
} as const;

// ── Illustration ──────────────────────────────────────────────────────────────
// A pure-View recreation of the Figma "collage of cards" illustration.
// Built at 280×157 px (scaled from the Figma 398×224 desktop version).

const ILLUS_W = 280;
const ILLUS_H = 157;
const SCALE = ILLUS_W / 398; // ≈ 0.703

const CARD_W = Math.round(160 * SCALE); // 112
const CARD_H = Math.round(98 * SCALE);  // 69

function scaledPos(left: number, top: number) {
  return {
    left: Math.round(left * SCALE),
    top: Math.round(top * SCALE),
  };
}

function EmptyIllustration() {
  // Purely decorative — hidden from accessibility tree
  // Central active card
  const central = scaledPos(119, 63);
  // Surrounding faded cards
  const positions = [
    scaledPos(-53, 63),
    scaledPos(291, 63),
    scaledPos(33, 173),
    scaledPos(205, 173),
    scaledPos(33, -47),
    scaledPos(205, -47),
  ];

  return (
    <View
      accessible={false}
      importantForAccessibility="no-hide-descendants"
      style={[styles.illusContainer, { width: ILLUS_W, height: ILLUS_H }]}
    >
      {/* Faded background cards */}
      {positions.map((pos, i) => (
        <View
          key={i}
          style={[
            styles.card,
            {
              left: pos.left,
              top: pos.top,
              width: CARD_W,
              height: CARD_H,
              borderColor: cr.outline.sysOutlineVariant,
              backgroundColor: cr.surface.surfaceContainer.sysSurfaceContainerLowest,
            },
            styles.cardFaded,
          ]}
        />
      ))}

      {/* Central focused card */}
      <View
        style={[
          styles.card,
          styles.cardActive,
          {
            left: central.left,
            top: central.top,
            width: CARD_W,
            height: CARD_H,
            borderColor: cr.accent.primary.sysPrimary,
            backgroundColor: cr.surface.surfaceContainer.sysSurfaceContainerLowest,
          },
        ]}
      >
        {/* Skeleton content lines */}
        <View
          style={[
            styles.skeletonLine,
            {
              top: Math.round(15 * SCALE),
              left: Math.round(15 * SCALE),
              width: Math.round(32 * SCALE),
            },
          ]}
        />
        <View
          style={[
            styles.skeletonLine,
            {
              top: Math.round(51 * SCALE),
              left: Math.round(15 * SCALE),
              width: Math.round(96 * SCALE),
            },
          ]}
        />
        <View
          style={[
            styles.skeletonLine,
            {
              top: Math.round(63 * SCALE),
              left: Math.round(15 * SCALE),
              width: Math.round(122 * SCALE),
            },
          ]}
        />
      </View>
    </View>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export function EmptyState({
  style = 'icon',
  viewport = 'mobile',
  title = 'No results',
  description = 'Description if needed',
  showDescription = true,
  icon,
  actionLabel,
  onAction,
  showAction,
  containerStyle,
}: EmptyStateProps) {
  const vp = VIEWPORT[viewport];
  const hasAction = showAction !== undefined ? showAction : !!actionLabel;

  return (
    <View style={[styles.root, containerStyle]}>
      {/* ── Graphic ───────────────────────────────────────────────────────── */}
      {style === 'illustration' ? (
        <EmptyIllustration />
      ) : (
        <View
          style={[
            styles.iconCircle,
            {
              width: vp.iconCircle,
              height: vp.iconCircle,
              backgroundColor: cr.surface.surfaceContainer.sysSurfaceContainerLow,
            },
          ]}
        >
          {icon ?? (
            <Ionicons
              name="apps-outline"
              size={vp.iconSize}
              color={cr.surface.surface.sysOnSurfaceVariant}
            />
          )}
        </View>
      )}

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <View style={[styles.content, { gap: vp.contentGap }]}>
        {/* Text block */}
        <View style={styles.textBlock}>
          <Text
            style={{
              color: cr.surface.surface.sysOnSurface,
              fontSize: vp.titleFontSize,
              lineHeight: vp.titleLineHeight,
              fontWeight: '400',
              textAlign: 'center',
              includeFontPadding: false,
            }}
          >
            {title}
          </Text>

          {showDescription && description && (
            <Text
              style={{
                color: cr.surface.surface.sysOnSurfaceVariant,
                fontSize: vp.descFontSize,
                lineHeight: vp.descLineHeight,
                fontWeight: '400',
                textAlign: 'center',
                includeFontPadding: false,
              }}
            >
              {description}
            </Text>
          )}
        </View>

        {/* Action button */}
        {hasAction && actionLabel && (
          <Pressable
            onPress={onAction}
            accessibilityRole="button"
            accessibilityLabel={actionLabel}
            style={({ pressed }) => [
              styles.actionBtn,
              {
                height: vp.btnHeight,
                paddingLeft: vp.btnPaddingL,
                paddingRight: vp.btnPaddingR,
                gap: vp.btnGap,
                borderColor: cr.outline.sysOutline,
              },
              pressed && { opacity: 0.76 },
            ]}
          >
            <Ionicons
              name="add"
              size={16}
              color={cr.surface.surface.sysOnSurface}
            />
            <Text
              style={{
                color: cr.surface.surface.sysOnSurface,
                fontSize: vp.btnFontSize,
                lineHeight: vp.btnLineHeight,
                letterSpacing: vp.btnTracking,
                fontWeight: '400',
                includeFontPadding: false,
              }}
            >
              {actionLabel}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: dim.spacing.padding.sysPadding24,
    borderRadius: dim.borderRadius.sysRadiusLg,
    alignItems: 'center',
    gap: dim.spacing.padding.sysPadding24,
    alignSelf: 'center',
  },

  // ── Icon circle ───────────────────────────────────────────────────────────
  iconCircle: {
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  // ── Content block ─────────────────────────────────────────────────────────
  content: {
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  textBlock: {
    alignSelf: 'stretch',
    gap: dim.spacing.padding.sysPadding4,
    alignItems: 'center',
  },

  // ── Action button ─────────────────────────────────────────────────────────
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: dim.borderWidth.sysStrokeThin,
    borderRadius: 9999,
    overflow: 'hidden',
  },

  // ── Illustration ──────────────────────────────────────────────────────────
  illusContainer: {
    overflow: 'hidden',
    position: 'relative',
  },
  card: {
    position: 'absolute',
    borderWidth: dim.borderWidth.sysStrokeThin,
    borderRadius: dim.borderRadius.sysRadiusMd,
    overflow: 'hidden',
  },
  cardFaded: {
    opacity: 0.48,
  },
  cardActive: {
    // Active ring: sysPrimary08 spread shadow
    shadowColor: cr.accent.primary.sysPrimary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 0,
    elevation: 0,
  },
  skeletonLine: {
    position: 'absolute',
    height: Math.round(6 * SCALE),
    borderRadius: 9999,
    backgroundColor: cr.surface.surfaceContainer.sysSurfaceContainer,
  },
});
