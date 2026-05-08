import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { sys } from './tokens';
import { BodyText } from './BodyText';

export interface SegmentedControlOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps {
  options: SegmentedControlOption[];
  value: string;
  onChange: (value: string) => void;
  fullWidth?: boolean;
}

const { colorRoles: cr, dimensions: dim } = sys;

export function SegmentedControl({
  options,
  value,
  onChange,
  fullWidth = false,
}: SegmentedControlProps) {
  return (
    <View style={[styles.container, fullWidth && styles.fullWidth]}>
      {options.map((option) => {
        const isActive = option.value === value;
        const isDisabled = option.disabled ?? false;

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
              },
              isActive && { backgroundColor: cr.accent.primary.sysPrimary },
              !isActive && pressed && !isDisabled && styles.pressed,
              isDisabled && styles.disabled,
            ]}
          >
            {option.icon && (
              <View style={styles.iconSlot}>{option.icon}</View>
            )}
            <BodyText
              variant="small"
              emphasized={isActive}
              color={
                isActive
                  ? cr.accent.primary.sysOnPrimary
                  : cr.surface.surface.sysOnSurfaceVariant
              }
              numberOfLines={1}
            >
              {option.label}
            </BodyText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: cr.surface.surfaceContainer.sysSurfaceContainerLowest,
    borderWidth: dim.borderWidth.sysStrokeThin,
    borderColor: cr.outline.sysOutline,
    borderRadius: dim.borderRadius.sysRadiusFull,
    padding: dim.spacing.padding.sysPadding4,
    gap: dim.spacing.padding.sysPadding4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSlot: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    backgroundColor: cr.transparent.neutral.sysBlack10,
  },
  disabled: {
    opacity: 0.48,
  },
});
