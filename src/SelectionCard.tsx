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

  const contentColor = selected
    ? cr.accent.primary.sysPrimary
    : cr.surface.surface.sysOnSurface;

  const borderColor = selected
    ? cr.accent.primary.sysPrimary
    : cr.outline.sysOutline;

  const checkColor = selected ? cr.accent.primary.sysPrimary : cr.outline.sysOutline;
  const borderWidth = selected ? 2 : 1;

  const checkboxNode = multiSelect ? (
    <Ionicons
      name={selected ? 'checkbox' : 'square-outline'}
      size={20}
      color={checkColor}
      accessible={false}
    />
  ) : null;

  const a11yState = {
    disabled,
    ...(multiSelect ? { checked: selected } : { selected }),
  };

  if (size === 'sm') {
    return (
      <Pressable
        onPress={disabled ? undefined : onPress}
        accessibilityRole={multiSelect ? 'checkbox' : 'radio'}
        accessibilityLabel={accessibilityLabel ?? title}
        accessibilityState={a11yState}
        style={({ pressed }) => [
          styles.smRoot,
          { borderColor, borderWidth, opacity: disabled ? 0.38 : 1 },
          pressed && !disabled && styles.pressed,
          style,
        ]}
      >
        {IconComponent && (
          <View style={styles.smIconWrap}>
            <IconComponent size="small" color={contentColor} />
          </View>
        )}
        <BodyText variant="medium" color={contentColor} style={styles.smTitle}>
          {title}
        </BodyText>
        {checkboxNode}
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      accessibilityRole={multiSelect ? 'checkbox' : 'radio'}
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityState={a11yState}
      style={({ pressed }) => [
        styles.mdRoot,
        { borderColor, borderWidth, opacity: disabled ? 0.38 : 1 },
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      {multiSelect && (
        <View style={styles.mdCheckboxWrap} pointerEvents="none">
          {checkboxNode}
        </View>
      )}
      {IconComponent && (
        <View style={styles.mdIconWrap}>
          <IconComponent size="medium" color={contentColor} />
        </View>
      )}
      <BodyText variant="medium" color={contentColor}>
        {title}
      </BodyText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  mdRoot: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: dim.spacing.padding.sysPadding16,
    paddingVertical: dim.spacing.padding.sysPadding16,
    gap: dim.spacing.padding.sysPadding8,
    borderRadius: dim.borderRadius.sysRadiusMd,
    backgroundColor: cr.surface.surfaceContainer.sysSurfaceContainerLowest,
    overflow: 'hidden',
  },
  mdIconWrap: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mdCheckboxWrap: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  smRoot: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: dim.spacing.padding.sysPadding8,
    paddingHorizontal: dim.spacing.padding.sysPadding12,
    paddingVertical: dim.spacing.padding.sysPadding8,
    borderRadius: dim.borderRadius.sysRadiusMd,
    backgroundColor: cr.surface.surfaceContainer.sysSurfaceContainerLowest,
    overflow: 'hidden',
  },
  smIconWrap: {
    width: 20,
    height: 20,
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
