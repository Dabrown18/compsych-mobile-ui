import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { sys } from './tokens';
import { BodyText } from './BodyText';
import { HeaderText } from './HeaderText';
import { ICON_MAP, type IconName } from './icons';

export type SelectionCardSize = 'sm' | 'md';

export interface SelectionCardProps {
  title: string;
  icon?: IconName;
  size?: SelectionCardSize;
  multiSelect?: boolean;
  selected?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

const { colorRoles: cr, dimensions: dim } = sys;

const SELECTED_RING = {
  shadowColor: cr.accent.primary.sysPrimary,
  shadowOffset: { width: 1, height: 2 },
  shadowOpacity: 1,
  shadowRadius: 0,
  elevation: 2,
};

export function SelectionCard({
  title,
  icon,
  size = 'md',
  multiSelect = false,
  selected = false,
  disabled = false,
  onPress,
  accessibilityLabel,
  style,
}: SelectionCardProps) {
  const IconComponent = icon ? ICON_MAP[icon] : null;

  const a11yState = {
    disabled,
    ...(multiSelect ? { checked: selected } : { selected }),
  };

  const checkboxNode = (
    <Ionicons
      name={selected ? 'checkbox' : 'square-outline'}
      size={20}
      color={selected ? cr.accent.primary.sysPrimary : cr.outline.sysOutline}
      accessible={false}
    />
  );

  if (size === 'sm') {
    const iconColor = selected
      ? cr.accent.primary.sysPrimary
      : cr.surface.surface.sysOnSurface;

    return (
      <Pressable
        onPress={disabled ? undefined : onPress}
        accessibilityRole={multiSelect ? 'checkbox' : 'radio'}
        accessibilityLabel={accessibilityLabel ?? title}
        accessibilityState={a11yState}
        style={({ pressed }) => [
          styles.smRoot,
          {
            borderColor: selected ? cr.accent.primary.sysPrimary : cr.outline.sysOutline,
            borderWidth: selected
              ? dim.borderWidth.sysStrokeMedium
              : dim.borderWidth.sysStrokeThin,
            opacity: disabled ? 0.38 : 1,
          },
          selected && SELECTED_RING,
          pressed && !disabled && styles.pressed,
          style,
        ]}
      >
        {IconComponent && (
          <View style={styles.smIconWrap}>
            <IconComponent size="small" color={iconColor} />
          </View>
        )}
        <BodyText variant="labelLarge" color={cr.surface.surface.sysOnSurface} emphasized={selected} style={styles.smTitle}>
          {title}
        </BodyText>
        {multiSelect && checkboxNode}
      </Pressable>
    );
  }

  // ── Medium ──────────────────────────────────────────────────────────────────
  const iconBgColor = selected
    ? cr.accent.primary.sysPrimary
    : cr.surface.surfaceContainer.sysSurfaceContainer;
  const iconColor = selected
    ? cr.accent.primary.sysOnPrimary
    : cr.surface.surface.sysOnSurface;
  const titleColor = selected
    ? cr.accent.primary.sysPrimary
    : cr.surface.surface.sysOnSurface;

  const iconCircle = IconComponent ? (
    <View style={[styles.mdIconCircle, { backgroundColor: iconBgColor }]}>
      <IconComponent size="small" color={iconColor} />
    </View>
  ) : null;

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      accessibilityRole={multiSelect ? 'checkbox' : 'radio'}
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityState={a11yState}
      style={({ pressed }) => [
        styles.mdRoot,
        {
          borderColor: selected ? cr.accent.primary.sysPrimary : cr.outline.sysOutline,
          borderWidth: selected
            ? dim.borderWidth.sysStrokeThick
            : dim.borderWidth.sysStrokeMedium,
          opacity: disabled ? 0.38 : 1,
        },
        selected && SELECTED_RING,
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      {multiSelect ? (
        <View style={styles.mdIconCheckboxRow}>
          {iconCircle}
          {checkboxNode}
        </View>
      ) : (
        iconCircle
      )}
      <HeaderText variant="titleSmall" color={titleColor} emphasized={selected}>
        {title}
      </HeaderText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  mdRoot: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: dim.spacing.padding.sysPadding24,
    gap: dim.spacing.padding.sysPadding24,
    borderRadius: dim.borderRadius.sysRadiusLg,
    backgroundColor: cr.surface.surfaceContainer.sysSurfaceContainerLowest,
    overflow: 'hidden',
  },
  mdIconCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: dim.spacing.padding.sysPadding12,
    borderRadius: dim.borderRadius.sysRadiusFull,
    overflow: 'hidden',
  },
  mdIconCheckboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
  },
  smRoot: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: dim.spacing.padding.sysPadding12,
    paddingHorizontal: dim.spacing.padding.sysPadding20,
    paddingVertical: dim.spacing.padding.sysPadding16,
    borderRadius: dim.borderRadius.sysRadiusMd,
    backgroundColor: cr.surface.surfaceContainer.sysSurfaceContainerLowest,
    overflow: 'hidden',
  },
  smIconWrap: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smTitle: {
    flex: 1,
  },
  pressed: {
    opacity: 0.84,
  },
});
