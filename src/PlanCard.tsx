import React, { useRef } from 'react';
import {
  Animated,
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  UIManager,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { sys } from './tokens';
import { BodyText } from './BodyText';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

// ─── Dropdown Item ───────────────────────────────────────────────────────────

export interface PlanCardItemData {
  id: string;
  title: string;
  subtitle?: string;
  checked?: boolean;
  onToggle?: () => void;
  onAudio?: () => void;
  onOpen?: () => void;
}

interface DropdownItemProps extends PlanCardItemData {
  showDivider?: boolean;
}

const { colorRoles: cr, dimensions: dim } = sys;

export function PlanCardDropdownItem({
  title,
  subtitle,
  checked = false,
  onToggle,
  onAudio,
  onOpen,
  showDivider = true,
}: DropdownItemProps) {
  return (
    <View>
      <View style={itemStyles.row}>
        {/* Check indicator */}
        <Pressable
          onPress={onToggle}
          accessibilityRole="checkbox"
          accessibilityState={{ checked }}
          style={itemStyles.checkWrap}
        >
          {checked ? (
            <View style={itemStyles.checkedCircle}>
              <Ionicons name="checkmark" size={12} color="#fff" />
            </View>
          ) : (
            <View style={itemStyles.uncheckedCircle} />
          )}
        </Pressable>

        {/* Text */}
        <View style={itemStyles.textCol}>
          <BodyText variant="small" color={cr.surface.surface.sysOnSurface}>
            {title}
          </BodyText>
          {subtitle && (
            <BodyText variant="small" color={cr.surface.surface.sysOnSurfaceVariant}>
              {subtitle}
            </BodyText>
          )}
        </View>

        {/* Action buttons */}
        <View style={itemStyles.actions}>
          {onAudio && (
            <Pressable
              onPress={onAudio}
              accessibilityRole="button"
              accessibilityLabel="Listen"
              style={({ pressed }) => [itemStyles.actionBtn, pressed && itemStyles.pressed]}
            >
              <Ionicons name="headset-outline" size={16} color={cr.surface.surface.sysOnSurface} />
            </Pressable>
          )}
          {onOpen && (
            <Pressable
              onPress={onOpen}
              accessibilityRole="button"
              accessibilityLabel="Open"
              style={({ pressed }) => [itemStyles.actionBtn, pressed && itemStyles.pressed]}
            >
              <Ionicons name="arrow-up-circle-outline" size={16} color={cr.surface.surface.sysOnSurface} />
            </Pressable>
          )}
        </View>
      </View>

      {showDivider && <View style={itemStyles.divider} />}
    </View>
  );
}

const itemStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: dim.spacing.padding.sysPadding16,
    gap: dim.spacing.padding.sysPadding12,
  },
  checkWrap: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedCircle: {
    width: 20,
    height: 20,
    borderRadius: dim.borderRadius.sysRadiusFull,
    backgroundColor: cr.custom.success.sysSuccess,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uncheckedCircle: {
    width: 20,
    height: 20,
    borderRadius: dim.borderRadius.sysRadiusFull,
    borderWidth: 1.5,
    borderColor: cr.outline.sysOutlineFixed,
  },
  textCol: {
    flex: 1,
    gap: 2,
  },
  actions: {
    flexDirection: 'row',
    gap: dim.spacing.padding.sysPadding8,
  },
  actionBtn: {
    width: 32,
    height: 32,
    borderRadius: dim.borderRadius.sysRadiusFull,
    borderWidth: dim.borderWidth.sysStrokeThin,
    borderColor: cr.outline.sysOutline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: cr.outline.sysOutline,
  },
});

// ─── Plan Card ────────────────────────────────────────────────────────────────

export interface PlanCardProps {
  title: string;
  icon?: React.ReactNode;
  tag?: string;
  items?: PlanCardItemData[];
  expanded?: boolean;
  onToggle?: () => void;
  children?: React.ReactNode;
}

export function PlanCard({
  title,
  icon,
  tag,
  items,
  expanded = false,
  onToggle,
  children,
}: PlanCardProps) {
  function handleToggle() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onToggle?.();
  }

  const hasContent = expanded && (children || (items && items.length > 0));

  return (
    <View style={cardStyles.card}>
      {/* Header */}
      <View style={cardStyles.header}>
        {/* Left: icon + title stacked */}
        <View style={cardStyles.left}>
          <View style={cardStyles.iconCircle}>
            {icon ?? (
              <Ionicons name="document-text-outline" size={16} color={cr.accent.primary.sysOnPrimary} />
            )}
          </View>
          <BodyText
            variant="medium"
            color={cr.surface.surface.sysOnSurface}
          >
            {title}
          </BodyText>
        </View>

        {/* Right: tag chip + toggle */}
        <View style={cardStyles.right}>
          {tag && (
            <View style={cardStyles.chip}>
              <BodyText variant="small" color={cr.custom.info.sysOnInfoContainer}>
                {tag}
              </BodyText>
            </View>
          )}
          <Pressable
            onPress={handleToggle}
            accessibilityRole="button"
            accessibilityLabel={expanded ? 'Collapse' : 'Expand'}
            style={({ pressed }) => [
              cardStyles.toggleBtn,
              pressed && cardStyles.pressed,
            ]}
          >
            <Ionicons
              name={expanded ? 'remove' : 'add'}
              size={16}
              color={cr.surface.surface.sysOnSurfaceVariant}
            />
          </Pressable>
        </View>
      </View>

      {/* Expanded content */}
      {hasContent && (
        <View style={cardStyles.content}>
          <View style={cardStyles.contentDivider} />
          {children
            ? children
            : items!.map((item, index) => (
                <PlanCardDropdownItem
                  key={item.id}
                  {...item}
                  showDivider={index < items!.length - 1}
                />
              ))}
        </View>
      )}
    </View>
  );
}

const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: cr.surface.surfaceContainer.sysSurfaceContainerLowest,
    borderRadius: dim.borderRadius.sysRadiusMd,
    borderWidth: dim.borderWidth.sysStrokeThin,
    borderColor: cr.outline.sysOutline,
    padding: dim.spacing.padding.sysPadding16,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: dim.spacing.padding.sysPadding12,
  },
  left: {
    flex: 1,
    gap: dim.spacing.padding.sysPadding8,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: dim.borderRadius.sysRadiusFull,
    backgroundColor: cr.accent.primary.sysPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: dim.spacing.padding.sysPadding8,
    alignSelf: 'flex-start',
  },
  chip: {
    backgroundColor: cr.custom.info.sysInfoContainer,
    borderRadius: dim.borderRadius.sysRadiusFull,
    paddingHorizontal: dim.spacing.padding.sysPadding8,
    paddingVertical: dim.spacing.padding.sysPadding4,
  },
  toggleBtn: {
    width: 20,
    height: 20,
    borderRadius: dim.borderRadius.sysRadiusFull,
    backgroundColor: cr.surface.surfaceContainer.sysSurfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  content: {
    marginTop: dim.spacing.padding.sysPadding8,
  },
  contentDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: cr.outline.sysOutline,
    marginBottom: dim.spacing.padding.sysPadding4,
  },
});
