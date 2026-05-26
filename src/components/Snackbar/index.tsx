import React, { useEffect, useRef } from 'react';

import {
  Animated,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { sys } from '../../tokens';
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

const { colorRoles: cr, dimensions: dim } = sys;

export function Snackbar({
  visible,
  message,
  variant = 'filled',
  actionLabel,
  onAction,
  onClose,
  style,
}: SnackbarProps) {
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

  const containerStyle = isFilled
    ? styles.containerFilled
    : styles.containerOutlined;
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
      style={[styles.wrapper, { opacity, transform: [{ translateY }] }, style]}
      pointerEvents={visible ? 'box-none' : 'none'}
    >
      <View style={[styles.container, containerStyle]}>
        <BodyText
          variant="medium"
          color={labelColor}
          style={styles.label}
          numberOfLines={2}
        >
          {message}
        </BodyText>

        <View style={styles.actionSlot}>
          {actionLabel && onAction && (
            <Pressable
              onPress={onAction}
              accessibilityRole="button"
              accessibilityLabel={actionLabel}
              style={({ pressed }) => [
                styles.actionButton,
                pressed && styles.pressed,
              ]}
            >
              <BodyText variant="small" emphasized color={actionColor}>
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
                styles.closeButton,
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
  wrapper: {
    position: 'absolute',
    bottom: dim.spacing.padding.sysPadding24,
    left: dim.spacing.padding.sysPadding16,
    right: dim.spacing.padding.sysPadding16,
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: dim.spacing.padding.sysPadding12,
    paddingHorizontal: dim.spacing.padding.sysPadding16,
    borderRadius: dim.borderRadius.sysRadiusMd,
    gap: dim.spacing.padding.sysPadding16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  containerFilled: {
    backgroundColor: cr.accent.primary.sysPrimaryContainer,
  },
  containerOutlined: {
    backgroundColor: cr.surface.surfaceContainer.sysSurfaceContainerLowest,
    borderWidth: dim.borderWidth.sysStrokeThin,
    borderColor: cr.outline.sysOutline,
  },
  label: {
    flex: 1,
  },
  actionSlot: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: dim.spacing.padding.sysPadding12,
  },
  actionButton: {
    paddingVertical: dim.spacing.padding.sysPadding4,
  },
  closeButton: {
    width: 24,
    height: 24,
    borderRadius: dim.borderRadius.sysRadiusFull,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});
