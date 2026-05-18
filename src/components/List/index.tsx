import React from 'react';

import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { sys } from '../../tokens';
import { BodyText } from '../BodyText';

export type ListItemType = 'simple' | 'detailed';

export interface ListItemProps {
  type?: ListItemType;
  label: string;
  subLabel?: string;
  icon?: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  showDivider?: boolean;
}

export interface ListProps {
  items: Omit<ListItemProps, 'showDivider'>[];
  type?: ListItemType;
  style?: StyleProp<ViewStyle>;
}

const { colorRoles: cr, dimensions: dim } = sys;

// ── ListItem ──────────────────────────────────────────────────────────────────

export function ListItem({
  type = 'simple',
  label,
  subLabel,
  icon,
  onPress,
  disabled = false,
  showDivider = true,
}: ListItemProps) {
  const isDetailed = type === 'detailed';

  const content = (
    <View style={[styles.itemRow, { gap: dim.spacing.padding.sysPadding12 }]}>
      {isDetailed ? (
        // Detailed: icon inside circular badge
        <View
          style={[
            styles.iconBadge,
            { backgroundColor: cr.surface.surfaceContainer.sysSurfaceContainerLow },
          ]}
        >
          {icon}
        </View>
      ) : (
        // Simple: bare icon
        icon && <View style={styles.simpleIcon}>{icon}</View>
      )}

      <View style={styles.textBlock}>
        <BodyText variant="medium" emphasized={isDetailed} color={cr.surface.surface.sysOnSurface}>
          {label}
        </BodyText>
        {isDetailed && subLabel && (
          <BodyText variant="small" color={cr.surface.surface.sysOnSurfaceVariant}>
            {subLabel}
          </BodyText>
        )}
      </View>

      <Ionicons
        name="chevron-forward"
        size={20}
        color={cr.outline.sysOutlineFixed}
        accessible={false}
      />
    </View>
  );

  const divider = showDivider ? (
    <View
      style={[
        styles.divider,
        {
          // Indent past icon + gap: 24px (simple) or 48px+16px (detailed)
          marginLeft: isDetailed ? 64 : 36,
          borderBottomColor: cr.outline.sysOutline,
        },
      ]}
    />
  ) : null;

  if (onPress) {
    return (
      <View style={disabled && styles.disabled}>
        <Pressable
          onPress={disabled ? undefined : onPress}
          accessibilityRole="button"
          accessibilityLabel={label}
          accessibilityState={{ disabled }}
          style={({ pressed }) => [
            isDetailed
              ? { paddingTop: dim.spacing.padding.sysPadding12 }
              : {
                  paddingVertical: dim.spacing.padding.sysPadding16,
                },
            pressed && !disabled && styles.pressed,
          ]}
        >
          {content}
        </Pressable>
        {divider}
      </View>
    );
  }

  return (
    <View style={disabled && styles.disabled}>
      <View
        style={
          isDetailed
            ? { paddingTop: dim.spacing.padding.sysPadding12 }
            : { paddingVertical: dim.spacing.padding.sysPadding16 }
        }
      >
        {content}
      </View>
      {divider}
    </View>
  );
}

// ── List ──────────────────────────────────────────────────────────────────────

export function List({ items, type = 'simple', style }: ListProps) {
  return (
    <View style={style}>
      {items.map((item, index) => (
        <ListItem
          key={index}
          {...item}
          type={item.type ?? type}
          showDivider={index < items.length - 1}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  simpleIcon: {
    width: 24,
    height: 24,
  },
  iconBadge: {
    width: 48,
    height: 48,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBlock: {
    flex: 1,
    minWidth: 0,
  },
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  pressed: {
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  disabled: {
    opacity: 0.48,
  },
});
