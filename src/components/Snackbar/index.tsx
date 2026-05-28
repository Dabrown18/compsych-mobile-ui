import React, { useEffect, useMemo, useRef } from 'react';

import {
  Animated,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../../theme';
import { BodyText } from '../BodyText';

export type SnackbarVariant = 'filled' | 'outlined';

export interface SnackbarProps {
  visible: boolean;
  message: string;
  variant?: SnackbarVariant;
  actionLabel?: string;
  onAction?: () => void;
  onClose?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function Snackbar({
  visible,
  message,
  variant = 'filled',
  actionLabel,
  onAction,
  onClose,
  style,
}: SnackbarProps) {
  const { colorRoles: cr, dimensions: dim } = useTheme();

  const translateY = useRef(new Animated.Value(100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          damping: 20,
          stiffness: 300,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 100,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const isFilled = variant === 'filled';

  const tokenStyles = useMemo(
    () => ({
      wrapper: {
        position: 'absolute' as const,
        bottom: dim.spacing.padding.sysPadding24,
        left: dim.spacing.padding.sysPadding16,
        right: dim.spacing.padding.sysPadding16,
        alignItems: 'center' as const,
      },
      container: {
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
        paddingVertical: dim.spacing.padding.sysPadding12,
        paddingHorizontal: dim.spacing.padding.sysPadding16,
        borderRadius: dim.borderRadius.sysRadiusMd,
        gap: dim.spacing.padding.sysPadding16,
        width: '100%' as const,
        // Elevation/lv3: Figma radius=16 (primary), radius=6 (secondary). RN iOS
        // supports one shadow; use the dominant layer. Android uses elevation.
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.16,
        shadowRadius: 16,
        elevation: 6,
      },
      containerFilled: {
        backgroundColor: cr.accent.primary.sysPrimaryContainer,
      },
      containerOutlined: {
        backgroundColor: cr.surface.surfaceContainer.sysSurfaceContainerLowest,
        borderWidth: dim.borderWidth.sysStrokeThin,
        borderColor: cr.outline.sysOutlineVariant,
      },
      actionSlot: {
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
        gap: dim.spacing.padding.sysPadding12,
      },
      actionButton: {
        paddingVertical: dim.spacing.padding.sysPadding4,
      },
      closeButton: {
        width: 24,
        height: 24,
        borderRadius: dim.borderRadius.sysRadiusFull,
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
      },
    }),
    [cr, dim],
  );

  const containerVariantStyle = isFilled
    ? tokenStyles.containerFilled
    : tokenStyles.containerOutlined;
  const labelColor = isFilled
    ? cr.accent.primary.sysOnPrimary
    : cr.surface.surface.sysOnSurface;
  const actionColor = isFilled
    ? cr.accent.primary.sysOnPrimary
    : cr.accent.primary.sysPrimary;
  const closeBg = isFilled
    ? cr.transparent.neutral.sysWhite10
    : cr.surface.surfaceContainer.sysSurfaceContainer;
  const closeIconColor = isFilled
    ? cr.accent.primary.sysOnPrimary
    : cr.surface.surface.sysOnSurfaceVariant;

  return (
    <Animated.View
      style={[
        tokenStyles.wrapper,
        { opacity, transform: [{ translateY }] },
        style,
      ]}
      pointerEvents={visible ? 'box-none' : 'none'}
    >
      <View style={[tokenStyles.container, containerVariantStyle]}>
        <BodyText
          variant="medium"
          color={labelColor}
          style={styles.label}
          numberOfLines={2}
        >
          {message}
        </BodyText>

        <View style={tokenStyles.actionSlot}>
          {actionLabel && onAction && (
            <Pressable
              onPress={onAction}
              accessibilityRole="button"
              accessibilityLabel={actionLabel}
              style={({ pressed }) => [
                tokenStyles.actionButton,
                pressed && styles.pressed,
              ]}
            >
              <BodyText variant="labelMedium" color={actionColor}>
                {actionLabel}
              </BodyText>
            </Pressable>
          )}

          {onClose && (
            <Pressable
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="Dismiss"
              style={({ pressed }) => [
                tokenStyles.closeButton,
                { backgroundColor: closeBg },
                pressed && styles.pressed,
              ]}
            >
              <Ionicons name="close" size={16} color={closeIconColor} />
            </Pressable>
          )}
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  label: {
    flex: 1,
  },
  pressed: {
    opacity: 0.7,
  },
});
