import React from 'react';

import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { sys } from '../../tokens';

export type PaginationSize = 'sm' | 'lg';

// Shared token shape so sub-components accept either size
type SizeTokens = {
  itemSize: number;
  iconSize: number;
  fontSize: number;
  lineHeight: number;
  activeWeight: '500';
  inactiveWeight: '400';
  gap: number;
  hasPill: boolean;
  pillPaddingH: number;
  pillPaddingV: number;
  pillGap: number;
};

export interface PaginationProps {
  size?: PaginationSize;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  /** How many page numbers to show on each side of the current page */
  siblingCount?: number;
  /** On mobile/compact layouts — renders only prev + next arrows (no page numbers) */
  compact?: boolean;
  style?: StyleProp<ViewStyle>;
}

const { colorRoles: cr, dimensions: dim, typeScale: ts } = sys;

// ── Size tokens ───────────────────────────────────────────────────────────────

const SIZE_TOKENS = {
  sm: {
    itemSize: 32,
    iconSize: 20,
    fontSize: ts.labelMedium.sysFontSize,
    lineHeight: ts.labelMedium.sysLineHeight,
    activeWeight: '500' as const,
    inactiveWeight: '400' as const,
    gap: dim.spacing.padding.sysPadding8,
    // Pill container: sm has NO outer pill
    hasPill: false,
    pillPaddingH: 0,
    pillPaddingV: 0,
    pillGap: dim.spacing.padding.sysPadding8,
  },
  lg: {
    itemSize: 40,
    iconSize: 24,
    fontSize: ts.labelLarge.sysFontSize,
    lineHeight: ts.labelLarge.sysLineHeight,
    activeWeight: '500' as const,
    inactiveWeight: '400' as const,
    gap: dim.spacing.padding.sysPadding16,
    // Pill container: lg wraps in pill border
    hasPill: true,
    pillPaddingH: dim.spacing.padding.sysPadding12,
    pillPaddingV: dim.spacing.padding.sysPadding8,
    pillGap: dim.spacing.padding.sysPadding16,
  },
};

// ── Pagination range logic ────────────────────────────────────────────────────

function buildPageRange(total: number, current: number, siblings: number): (number | '...')[] {
  // Always show: 1, last, current, siblings
  const range: (number | '...')[] = [];

  if (total <= 1) return [1];

  const left = Math.max(2, current - siblings);
  const right = Math.min(total - 1, current + siblings);

  // First page
  range.push(1);

  // Left ellipsis
  if (left > 2) range.push('...');

  // Middle range
  for (let i = left; i <= right; i++) range.push(i);

  // Right ellipsis
  if (right < total - 1) range.push('...');

  // Last page
  if (total > 1) range.push(total);

  return range;
}

// ── Active ring wrapper ───────────────────────────────────────────────────────
// Mirrors the 4px padding + sysPrimary08 background pattern from Input.

const RING_SIZE = 4;

// ── Page item ────────────────────────────────────────────────────────────────

interface PageItemProps {
  s: SizeTokens;
  page: number;
  isActive: boolean;
  onPress: () => void;
}

function PageItem({ s, page, isActive, onPress }: PageItemProps) {
  const borderWidth = isActive ? dim.borderWidth.sysStrokeMedium : 0;
  const borderColor = isActive ? cr.accent.primary.sysPrimary : 'transparent';
  const textColor = isActive ? cr.custom.info.sysOnInfoContainer : cr.surface.surface.sysOnSurface;
  const fontWeight = isActive ? s.activeWeight : s.inactiveWeight;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Page ${page}`}
      accessibilityState={{ selected: isActive }}
    >
      {({ pressed }) => (
        // Ring wrapper — always RING_SIZE padding for layout stability;
        // background only when active (or focused — handled via pressed state here)
        <View
          style={{
            padding: RING_SIZE,
            borderRadius: s.itemSize / 2 + RING_SIZE,
            backgroundColor: isActive ? cr.transparent.primary.sysPrimary08 : 'transparent',
          }}
        >
          <View
            style={{
              width: s.itemSize,
              height: s.itemSize,
              borderRadius: s.itemSize / 2,
              borderWidth,
              borderColor,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                pressed && !isActive ? cr.transparent.neutral.sysBlack10 : 'transparent',
            }}
          >
            <Text
              style={{
                fontSize: s.fontSize,
                lineHeight: s.lineHeight,
                fontWeight,
                color: textColor,
                includeFontPadding: false,
              }}
            >
              {page}
            </Text>
          </View>
        </View>
      )}
    </Pressable>
  );
}

// ── Ellipsis item ─────────────────────────────────────────────────────────────

function EllipsisItem({ s }: { s: SizeTokens }) {
  return (
    <View
      accessible
      accessibilityLabel="More pages"
      style={{
        width: s.itemSize + RING_SIZE * 2,
        height: s.itemSize + RING_SIZE * 2,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          fontSize: s.fontSize,
          lineHeight: s.lineHeight,
          fontWeight: s.inactiveWeight,
          color: cr.surface.surface.sysOnSurfaceVariant,
          includeFontPadding: false,
        }}
      >
        …
      </Text>
    </View>
  );
}

// ── Prev / Next button ────────────────────────────────────────────────────────

interface NavButtonProps {
  s: SizeTokens;
  direction: 'prev' | 'next';
  disabled: boolean;
  onPress: () => void;
}

function NavButton({ s, direction, disabled, onPress }: NavButtonProps) {
  const iconName = direction === 'prev' ? 'chevron-back' : 'chevron-forward';

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      accessibilityRole="button"
      accessibilityLabel={direction === 'prev' ? 'Previous page' : 'Next page'}
      accessibilityState={{ disabled }}
      style={{ opacity: disabled ? 0.38 : 1 }}
    >
      {({ pressed }) => (
        <View
          style={{
            width: s.itemSize,
            height: s.itemSize,
            borderRadius: s.itemSize / 2,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor:
              pressed && !disabled ? cr.transparent.neutral.sysBlack10 : 'transparent',
          }}
        >
          <Ionicons name={iconName} size={s.iconSize} color={cr.surface.surface.sysOnSurface} />
        </View>
      )}
    </Pressable>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function Pagination({
  size = 'lg',
  totalPages,
  currentPage,
  onPageChange,
  siblingCount = 1,
  compact = false,
  style,
}: PaginationProps) {
  const s = SIZE_TOKENS[size];
  const pages = buildPageRange(totalPages, currentPage, siblingCount);

  const prevDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= totalPages;

  // ── Compact (prev + next only) ────────────────────────────────────────────
  const content = compact ? (
    <View style={[styles.inner, { gap: dim.spacing.padding.sysPadding4 }]}>
      <NavButton
        s={s}
        direction="prev"
        disabled={prevDisabled}
        onPress={() => onPageChange(currentPage - 1)}
      />
      <NavButton
        s={s}
        direction="next"
        disabled={nextDisabled}
        onPress={() => onPageChange(currentPage + 1)}
      />
    </View>
  ) : (
    // ── Full paginator ────────────────────────────────────────────────────
    <View style={[styles.inner, { gap: s.gap }]}>
      <NavButton
        s={s}
        direction="prev"
        disabled={prevDisabled}
        onPress={() => onPageChange(currentPage - 1)}
      />

      <View style={[styles.pages, { gap: s.hasPill ? 0 : s.gap }]}>
        {pages.map((p, i) =>
          p === '...' ? (
            <EllipsisItem key={`ellipsis-${i}`} s={s} />
          ) : (
            <PageItem
              key={p}
              s={s}
              page={p}
              isActive={p === currentPage}
              onPress={() => onPageChange(p)}
            />
          ),
        )}
      </View>

      <NavButton
        s={s}
        direction="next"
        disabled={nextDisabled}
        onPress={() => onPageChange(currentPage + 1)}
      />
    </View>
  );

  // ── Pill wrapper (lg only) ────────────────────────────────────────────────
  if (s.hasPill) {
    return (
      <View
        style={[
          styles.pill,
          {
            paddingHorizontal: s.pillPaddingH,
            paddingVertical: s.pillPaddingV,
            backgroundColor: cr.surface.surfaceContainer.sysSurfaceContainerLowest,
            borderColor: cr.outline.sysOutline,
            borderWidth: dim.borderWidth.sysStrokeThin,
          },
          style,
        ]}
      >
        {content}
      </View>
    );
  }

  // sm — wrap content in a View so style can be applied
  return <View style={style}>{content}</View>;
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: 'flex-start',
    borderRadius: 9999,
    overflow: 'hidden',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pages: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
