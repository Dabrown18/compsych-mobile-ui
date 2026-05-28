import React, { useMemo } from 'react';

import {
  Modal,
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../../theme';
import { Button } from '../Button';
import { HeaderText } from '../HeaderText';

export interface ActionSheetAction {
  label: string;
  onPress: () => void;
}

export interface ActionSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  primaryAction?: ActionSheetAction;
  secondaryAction?: ActionSheetAction;
  /**
   * `half`  — floats at the bottom with a 6 px inset gutter; all corners
   *           rounded; content limited to maxHeight. Default.
   * `full`  — fills the screen from 10 px below the top; only top corners
   *           rounded; content expands to fill; close button appears on both
   *           sides of the title for one-handed reachability.
   */
  variant?: 'half' | 'full';
  style?: StyleProp<ViewStyle>;
}

export function ActionSheet({
  visible,
  onClose,
  title,
  children,
  primaryAction,
  secondaryAction,
  variant = 'half',
  style,
}: ActionSheetProps) {
  const { colorRoles: cr, dimensions: dim } = useTheme();
  const isFull = variant === 'full';

  const dynamicStyles = useMemo(
    () => ({
      sheetWrapperHalf: {
        paddingHorizontal: dim.spacing.padding.sysPadding6,
        paddingBottom: dim.spacing.padding.sysPadding6,
      },
      sheetWrapperFull: {
        marginTop: 10,
      },
      sheetHalf: {
        backgroundColor: cr.surface.surfaceContainer.sysSurfaceContainerLowest,
        borderRadius: dim.borderRadius.sysRadiusXxl,
      },
      sheetFull: {
        backgroundColor: cr.surface.surfaceContainer.sysSurfaceContainerLowest,
        borderTopLeftRadius: dim.borderRadius.sysRadiusXxl,
        borderTopRightRadius: dim.borderRadius.sysRadiusXxl,
      },
      titleRow: {
        paddingHorizontal: dim.spacing.padding.sysPadding16,
        paddingVertical: dim.spacing.padding.sysPadding8,
      },
      closeButton: {
        borderRadius: dim.borderRadius.sysRadiusFull,
        backgroundColor: cr.surface.surfaceContainer.sysSurfaceContainer,
      },
      contentInner: {
        padding: dim.spacing.padding.sysPadding16,
      },
      actions: {
        padding: dim.spacing.padding.sysPadding24,
        gap: dim.spacing.padding.sysPadding12,
      },
    }),
    [cr, dim],
  );

  const closeButton = (
    <Pressable
      onPress={onClose}
      accessibilityRole="button"
      accessibilityLabel="Close"
      style={({ pressed }) => [
        styles.closeButtonSize,
        dynamicStyles.closeButton,
        pressed && styles.closePressed,
      ]}
    >
      <Ionicons
        name="close"
        size={20}
        color={cr.surface.surface.sysOnSurface}
      />
    </Pressable>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      {/* Backdrop */}
      <Pressable style={styles.backdrop} onPress={onClose} accessible={false} />

      {/* Sheet wrapper */}
      <View
        style={[
          styles.sheetWrapper,
          isFull
            ? dynamicStyles.sheetWrapperFull
            : dynamicStyles.sheetWrapperHalf,
          style,
        ]}
        pointerEvents="box-none"
      >
        <View
          style={[
            styles.sheet,
            isFull ? styles.sheetFull : styles.sheetHalf,
            isFull ? dynamicStyles.sheetFull : dynamicStyles.sheetHalf,
          ]}
        >
          {/* Toolbar */}
          <View style={styles.toolbar}>
            {/* Grabber */}
            <View style={styles.grabberRow}>
              <View style={styles.grabber} />
            </View>

            {/* Title row */}
            <View style={[styles.titleRow, dynamicStyles.titleRow]}>
              {/* Left slot: close button (full) or invisible spacer (half) */}
              {isFull ? closeButton : <View style={styles.closeButtonSize} />}

              <HeaderText
                variant="titleSmall"
                emphasized
                color={cr.surface.surface.sysOnSurface}
                style={styles.titleText}
              >
                {title ?? ''}
              </HeaderText>

              {/* Right close button — always shown */}
              {closeButton}
            </View>
          </View>

          {/* Content */}
          {children && (
            <ScrollView
              style={isFull ? styles.contentFull : styles.contentHalf}
              contentContainerStyle={dynamicStyles.contentInner}
              showsVerticalScrollIndicator={false}
            >
              {children}
            </ScrollView>
          )}

          {/* Actions */}
          {(primaryAction || secondaryAction) && (
            <View style={dynamicStyles.actions}>
              {primaryAction && (
                <Button
                  label={primaryAction.label}
                  variant="filled"
                  size="xl"
                  fullWidth
                  onPress={primaryAction.onPress}
                />
              )}
              {secondaryAction && (
                <Button
                  label={secondaryAction.label}
                  variant="outlined"
                  size="xl"
                  fullWidth
                  onPress={secondaryAction.onPress}
                />
              )}
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheetWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  // ── half ────────────────────────────────────────────────────────────────────
  sheet: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    overflow: 'hidden',
  },
  sheetHalf: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  contentHalf: {
    maxHeight: 400,
  },
  // ── full ────────────────────────────────────────────────────────────────────
  sheetFull: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.18,
    shadowRadius: 75,
    elevation: 16,
  },
  contentFull: {
    flex: 1,
  },
  // ── shared ──────────────────────────────────────────────────────────────────
  toolbar: {
    alignItems: 'center',
    width: '100%',
  },
  grabberRow: {
    width: '100%',
    height: 16,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 5,
  },
  grabber: {
    width: 36,
    height: 5,
    borderRadius: 100,
    backgroundColor: '#ccc',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  titleText: {
    flex: 1,
    textAlign: 'center',
  },
  closeButtonSize: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closePressed: {
    opacity: 0.7,
  },
});
