import React, { useMemo } from 'react';

import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { type IconName, SIZE_MAP, resolveIcon } from '../../icons';
import { useTheme } from '../../theme';
import { BodyText } from '../BodyText';
import { HeaderText } from '../HeaderText';

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
  const { colorRoles: cr, dimensions: dim } = useTheme();

  const selectedRing = useMemo(
    () => ({
      shadowColor: cr.accent.primary.sysPrimary,
      shadowOffset: { width: 1, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 0,
      elevation: 2,
    }),
    [cr],
  );

  const LucideIcon = icon ? resolveIcon(icon) : null;
  const { size: iconPx, strokeWidth: iconSW } = SIZE_MAP['small'];

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
            gap: dim.spacing.padding.sysPadding12,
            paddingHorizontal: dim.spacing.padding.sysPadding20,
            paddingVertical: dim.spacing.padding.sysPadding16,
            borderRadius: dim.borderRadius.sysRadiusMd,
            backgroundColor:
              cr.surface.surfaceContainer.sysSurfaceContainerLowest,
            borderColor: selected
              ? cr.accent.primary.sysPrimary
              : cr.outline.sysOutline,
            borderWidth: selected
              ? dim.borderWidth.sysStrokeMedium
              : dim.borderWidth.sysStrokeThin,
            opacity: disabled ? 0.38 : 1,
          },
          selected && selectedRing,
          pressed && !disabled && styles.pressed,
          style,
        ]}
      >
        {LucideIcon && (
          <View style={styles.smIconWrap}>
            <LucideIcon size={iconPx} color={iconColor} strokeWidth={iconSW} />
          </View>
        )}
        <BodyText
          variant="labelLarge"
          color={cr.surface.surface.sysOnSurface}
          emphasized={selected}
          style={styles.smTitle}
        >
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

  const iconCircle = LucideIcon ? (
    <View
      style={[
        styles.mdIconCircle,
        {
          padding: dim.spacing.padding.sysPadding12,
          borderRadius: dim.borderRadius.sysRadiusFull,
          backgroundColor: iconBgColor,
        },
      ]}
    >
      <LucideIcon size={iconPx} color={iconColor} strokeWidth={iconSW} />
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
          padding: dim.spacing.padding.sysPadding24,
          gap: dim.spacing.padding.sysPadding24,
          borderRadius: dim.borderRadius.sysRadiusLg,
          backgroundColor:
            cr.surface.surfaceContainer.sysSurfaceContainerLowest,
          borderColor: selected
            ? cr.accent.primary.sysPrimary
            : cr.outline.sysOutline,
          borderWidth: selected
            ? dim.borderWidth.sysStrokeThick
            : dim.borderWidth.sysStrokeMedium,
          opacity: disabled ? 0.38 : 1,
        },
        selected && selectedRing,
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
    overflow: 'hidden',
  },
  mdIconCircle: {
    alignItems: 'center',
    justifyContent: 'center',
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
