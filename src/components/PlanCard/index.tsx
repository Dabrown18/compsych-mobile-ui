import React from 'react';

import {
  LayoutAnimation,
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  UIManager,
  View,
  ViewStyle,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../../theme';
import { BodyText } from '../BodyText';

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

export function PlanCardDropdownItem({
  title,
  subtitle,
  checked = false,
  onToggle,
  onAudio,
  onOpen,
  showDivider = true,
}: DropdownItemProps) {
  const { colorRoles: cr, dimensions: dim } = useTheme();

  return (
    <View>
      <View
        style={[
          itemStyles.row,
          {
            paddingVertical: dim.spacing.padding.sysPadding16,
            gap: dim.spacing.padding.sysPadding12,
          },
        ]}
      >
        {/* Check indicator */}
        <Pressable
          onPress={onToggle}
          accessibilityRole="checkbox"
          accessibilityState={{ checked }}
          style={itemStyles.checkWrap}
        >
          {checked ? (
            <View
              style={[
                itemStyles.checkedCircle,
                {
                  borderRadius: dim.borderRadius.sysRadiusFull,
                  backgroundColor: cr.custom.success.sysSuccess,
                },
              ]}
            >
              <Ionicons name="checkmark" size={12} color="#fff" />
            </View>
          ) : (
            <View
              style={[
                itemStyles.uncheckedCircle,
                {
                  borderRadius: dim.borderRadius.sysRadiusFull,
                  borderColor: cr.outline.sysOutlineFixed,
                },
              ]}
            />
          )}
        </Pressable>

        {/* Text */}
        <View style={itemStyles.textCol}>
          <BodyText variant="small" color={cr.surface.surface.sysOnSurface}>
            {title}
          </BodyText>
          {subtitle && (
            <BodyText
              variant="small"
              color={cr.surface.surface.sysOnSurfaceVariant}
            >
              {subtitle}
            </BodyText>
          )}
        </View>

        {/* Action buttons */}
        <View
          style={[itemStyles.actions, { gap: dim.spacing.padding.sysPadding8 }]}
        >
          {onAudio && (
            <Pressable
              onPress={onAudio}
              accessibilityRole="button"
              accessibilityLabel="Listen"
              style={({ pressed }) => [
                itemStyles.actionBtn,
                {
                  borderRadius: dim.borderRadius.sysRadiusFull,
                  borderWidth: dim.borderWidth.sysStrokeThin,
                  borderColor: cr.outline.sysOutline,
                },
                pressed && itemStyles.pressed,
              ]}
            >
              <Ionicons
                name="headset-outline"
                size={16}
                color={cr.surface.surface.sysOnSurface}
              />
            </Pressable>
          )}
          {onOpen && (
            <Pressable
              onPress={onOpen}
              accessibilityRole="button"
              accessibilityLabel="Open"
              style={({ pressed }) => [
                itemStyles.actionBtn,
                {
                  borderRadius: dim.borderRadius.sysRadiusFull,
                  borderWidth: dim.borderWidth.sysStrokeThin,
                  borderColor: cr.outline.sysOutline,
                },
                pressed && itemStyles.pressed,
              ]}
            >
              <Ionicons
                name="arrow-up-circle-outline"
                size={16}
                color={cr.surface.surface.sysOnSurface}
              />
            </Pressable>
          )}
        </View>
      </View>

      {showDivider && (
        <View
          style={[
            itemStyles.divider,
            { backgroundColor: cr.outline.sysOutline },
          ]}
        />
      )}
    </View>
  );
}

const itemStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  uncheckedCircle: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
  },
  textCol: {
    flex: 1,
    gap: 2,
  },
  actions: {
    flexDirection: 'row',
  },
  actionBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
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
  style?: StyleProp<ViewStyle>;
}

export function PlanCard({
  title,
  icon,
  tag,
  items,
  expanded = false,
  onToggle,
  children,
  style,
}: PlanCardProps) {
  const { colorRoles: cr, dimensions: dim } = useTheme();

  function handleToggle() {
    if (Platform.OS !== 'web') {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
    onToggle?.();
  }

  const hasContent = expanded && (children || (items && items.length > 0));

  return (
    <View
      style={[
        cardStyles.card,
        {
          backgroundColor:
            cr.surface.surfaceContainer.sysSurfaceContainerLowest,
          borderRadius: dim.borderRadius.sysRadiusMd,
          borderWidth: dim.borderWidth.sysStrokeThin,
          borderColor: cr.outline.sysOutline,
          padding: dim.spacing.padding.sysPadding16,
        },
        style,
      ]}
    >
      {/* Header */}
      <View
        style={[cardStyles.header, { gap: dim.spacing.padding.sysPadding12 }]}
      >
        {/* Left: icon + title stacked */}
        <View
          style={[cardStyles.left, { gap: dim.spacing.padding.sysPadding8 }]}
        >
          <View
            style={[
              cardStyles.iconCircle,
              {
                borderRadius: dim.borderRadius.sysRadiusFull,
                backgroundColor: cr.accent.primary.sysPrimary,
              },
            ]}
          >
            {icon ?? (
              <Ionicons
                name="document-text-outline"
                size={16}
                color={cr.accent.primary.sysOnPrimary}
              />
            )}
          </View>
          <BodyText variant="medium" color={cr.surface.surface.sysOnSurface}>
            {title}
          </BodyText>
        </View>

        {/* Right: tag chip + toggle */}
        <View
          style={[cardStyles.right, { gap: dim.spacing.padding.sysPadding8 }]}
        >
          {tag && (
            <View
              style={[
                cardStyles.chip,
                {
                  backgroundColor: cr.custom.info.sysInfoContainer,
                  borderRadius: dim.borderRadius.sysRadiusFull,
                  paddingHorizontal: dim.spacing.padding.sysPadding8,
                  paddingVertical: dim.spacing.padding.sysPadding4,
                },
              ]}
            >
              <BodyText
                variant="small"
                color={cr.custom.info.sysOnInfoContainer}
              >
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
              {
                borderRadius: dim.borderRadius.sysRadiusFull,
                backgroundColor:
                  cr.surface.surfaceContainer.sysSurfaceContainer,
              },
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
        <View
          style={[
            cardStyles.content,
            { marginTop: dim.spacing.padding.sysPadding8 },
          ]}
        >
          <View
            style={[
              cardStyles.contentDivider,
              {
                backgroundColor: cr.outline.sysOutline,
                marginBottom: dim.spacing.padding.sysPadding4,
              },
            ]}
          />
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
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
  },
  iconCircle: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  chip: {},
  toggleBtn: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  content: {},
  contentDivider: {
    height: StyleSheet.hairlineWidth,
  },
});
