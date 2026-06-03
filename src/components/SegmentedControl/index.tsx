import React from 'react';

import {
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';

import { type IconName, SIZE_MAP, resolveIcon } from '../../icons';
import { useTheme } from '../../theme';
import { BodyText } from '../BodyText';

export interface SegmentedControlOption {
  value: string;
  label: string;
  icon?: IconName;
  disabled?: boolean;
}

export interface SegmentedControlProps {
  options: SegmentedControlOption[];
  value: string;
  onChange: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}

export function SegmentedControl({
  options,
  value,
  onChange,
  style,
}: SegmentedControlProps) {
  const { colorRoles: cr, dimensions: dim } = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[
        styles.contentContainer,
        { gap: dim.spacing.padding.sysPadding4 },
      ]}
      style={[styles.scroll, style]}
    >
      {options.map((option) => {
        const isActive = option.value === value;
        const isDisabled = option.disabled ?? false;

        const iconColor = isActive
          ? cr.accent.primary.sysOnPrimary
          : cr.surface.surface.sysOnSurfaceVariant;
        const IconComponent = option.icon ? resolveIcon(option.icon) : null;
        const { size: iconPx, strokeWidth: iconSW } = SIZE_MAP['xsmall'];

        return (
          <Pressable
            key={option.value}
            onPress={isDisabled ? undefined : () => onChange(option.value)}
            accessibilityRole="tab"
            accessibilityLabel={option.label}
            accessibilityState={{ selected: isActive, disabled: isDisabled }}
            style={({ pressed }) => [
              styles.item,
              {
                paddingHorizontal: dim.spacing.padding.sysPadding12,
                paddingVertical: dim.spacing.padding.sysPadding6,
                gap: dim.spacing.padding.sysPadding4,
                borderRadius: dim.borderRadius.sysRadiusFull,
                backgroundColor: isActive
                  ? cr.accent.primary.sysPrimary
                  : cr.surface.surfaceContainer.sysSurfaceContainerHigh,
              },
              !isActive && pressed && !isDisabled && { opacity: 0.7 },
              isDisabled && styles.disabled,
            ]}
          >
            {IconComponent && (
              <IconComponent
                size={iconPx}
                strokeWidth={iconSW}
                color={iconColor}
              />
            )}
            <BodyText
              variant="small"
              emphasized={isActive}
              color={iconColor}
              numberOfLines={1}
            >
              {option.label}
            </BodyText>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    width: '100%',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.48,
  },
});
