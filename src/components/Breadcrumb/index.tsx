import React, { useMemo } from 'react';

import {
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../../theme';

export type BreadcrumbSize = 'sm' | 'lg';

export interface BreadcrumbItem {
  /** Display text. Omit when `isHome` is true. */
  label?: string;
  /** Renders the home icon instead of text */
  isHome?: boolean;
  /** Renders "…" — tap to expand hidden crumbs */
  isOverflow?: boolean;
  /** Reduces opacity; non-interactive */
  disabled?: boolean;
  /**
   * Press handler. Omit (or leave undefined) for the current/last item —
   * it will automatically render as non-interactive with `sysOnSurface` text.
   */
  onPress?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  size?: BreadcrumbSize;
  style?: StyleProp<ViewStyle>;
}

export function Breadcrumb({ items, size = 'lg', style }: BreadcrumbProps) {
  const { colorRoles: cr, dimensions: dim, typeScale: ts } = useTheme();

  const sizeTokens = useMemo(
    () => ({
      sm: {
        fontSize: ts.labelSmall.sysFontSize,
        lineHeight: ts.labelSmall.sysLineHeight,
        letterSpacing: ts.labelSmall.sysTracking,
        paddingH: dim.spacing.padding.sysPadding8,
        paddingV: dim.spacing.padding.sysPadding2,
        iconSize: 16,
        dividerWidth: 8,
      },
      lg: {
        fontSize: ts.labelMedium.sysFontSize,
        lineHeight: ts.labelMedium.sysLineHeight,
        letterSpacing: ts.labelMedium.sysTracking,
        paddingH: dim.spacing.padding.sysPadding8,
        paddingV: dim.spacing.padding.sysPadding4,
        iconSize: 16,
        dividerWidth: 8,
      },
    }),
    [dim, ts],
  );

  const s = sizeTokens[size];

  return (
    // ScrollView lets a long breadcrumb scroll horizontally without clipping
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
      style={style}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        // Last item is always "current" regardless of whether onPress is set
        const isCurrent = isLast;
        const isInteractive = !isCurrent && !item.disabled;

        const textColor = isCurrent
          ? cr.surface.surface.sysOnSurface
          : cr.surface.surface.sysOnSurfaceVariant;

        const content = (
          <View
            style={[
              styles.content,
              {
                paddingHorizontal: s.paddingH,
                paddingVertical: item.isHome
                  ? dim.spacing.padding.sysPadding2
                  : s.paddingV,
                gap: item.isHome ? 0 : dim.spacing.padding.sysPadding4,
              },
              item.disabled && styles.disabled,
            ]}
          >
            {item.isHome ? (
              <Ionicons
                name="home"
                size={s.iconSize}
                color={cr.surface.surface.sysOnSurfaceVariant}
              />
            ) : (
              <Text
                style={{
                  color: textColor,
                  fontSize: s.fontSize,
                  lineHeight: s.lineHeight,
                  letterSpacing: s.letterSpacing,
                  includeFontPadding: false,
                  fontWeight: isCurrent ? '500' : '400',
                }}
                numberOfLines={1}
              >
                {item.isOverflow ? '…' : item.label}
              </Text>
            )}
          </View>
        );

        return (
          <View key={index} style={styles.item}>
            {/* Item — pressable if navigable, plain View if current/disabled */}
            {isInteractive ? (
              <Pressable
                onPress={item.onPress}
                accessibilityRole="link"
                accessibilityLabel={item.isHome ? 'Home' : item.label}
                style={({ pressed }) => [
                  styles.pressable,
                  pressed && {
                    backgroundColor: cr.transparent.neutral.sysBlack10,
                    borderRadius: 4,
                  },
                ]}
              >
                {content}
              </Pressable>
            ) : (
              <View
                accessibilityRole={isCurrent ? 'text' : undefined}
                accessibilityState={isCurrent ? { selected: true } : undefined}
              >
                {content}
              </View>
            )}

            {/* Divider — shown after every item except the last */}
            {!isLast && (
              <View
                accessible={false}
                style={[styles.divider, { width: s.dividerWidth }]}
              >
                <Text
                  style={{
                    color: cr.surface.surface.sysOnSurfaceVariant,
                    fontSize: s.fontSize,
                    lineHeight: s.lineHeight,
                    includeFontPadding: false,
                    textAlign: 'center',
                  }}
                >
                  /
                </Text>
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0,
  },
  pressable: {
    borderRadius: 4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.64,
  },
  divider: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
