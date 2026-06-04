import React from 'react';

import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { type IconName, SIZE_MAP, resolveIcon } from '../../icons';
import { useTheme } from '../../theme';
import { BodyText } from '../BodyText';

export type StatusChipVariant = 'warning' | 'error';
export type StatusChipAlign = 'left' | 'center' | 'right';

export interface StatusChipProps {
  label: string;
  variant?: StatusChipVariant;
  /** Icon name — defaults to ClockFadingIcon (warning) or ClockAlertIcon (error) */
  icon?: IconName;
  align?: StatusChipAlign;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
}

const DEFAULT_ICONS: Record<StatusChipVariant, IconName> = {
  warning: 'ClockFadingIcon',
  error: 'ClockAlertIcon',
};

const JUSTIFY: Record<StatusChipAlign, 'flex-start' | 'center' | 'flex-end'> = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

export function StatusChip({
  label,
  variant = 'warning',
  icon,
  align = 'center',
  fullWidth = false,
  style,
}: StatusChipProps) {
  const { colorRoles: cr } = useTheme();

  const colors =
    variant === 'warning'
      ? {
          bg: cr.custom.warning.sysWarningContainer,
          text: cr.custom.warning.sysOnWarningContainer,
        }
      : {
          bg: cr.error.sysErrorContainer,
          text: cr.error.sysOnErrorContainer,
        };

  const iconName = icon ?? DEFAULT_ICONS[variant];
  const IconComponent = resolveIcon(iconName);
  const { size: iconPx, strokeWidth: iconSW } = SIZE_MAP['small'];

  return (
    <View
      style={[
        styles.chip,
        {
          backgroundColor: colors.bg,
          justifyContent: JUSTIFY[align],
          alignSelf: fullWidth ? ('stretch' as const) : ('flex-start' as const),
        },
        style,
      ]}
    >
      {IconComponent && (
        <IconComponent size={iconPx} strokeWidth={iconSW} color={colors.text} />
      )}
      <BodyText variant="labelMedium" color={colors.text} numberOfLines={1}>
        {label}
      </BodyText>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 9999,
    paddingHorizontal: 16,
    paddingVertical: 4,
    gap: 8,
    height: 32,
  },
});
