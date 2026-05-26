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
  style?: StyleProp<ViewStyle>;
}

export function ActionSheet({
  visible,
  onClose,
  title,
  children,
  primaryAction,
  secondaryAction,
  style,
}: ActionSheetProps) {
  const { colorRoles: cr, dimensions: dim } = useTheme();

  const dynamicStyles = useMemo(
    () => ({
      sheetWrapper: {
        paddingHorizontal: dim.spacing.padding.sysPadding6,
        paddingBottom: dim.spacing.padding.sysPadding6,
      },
      sheet: {
        backgroundColor: cr.surface.surfaceContainer.sysSurfaceContainerLowest,
        borderRadius: dim.borderRadius.sysRadiusXxl,
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

      {/* Sheet */}
      <View
        style={[styles.sheetWrapper, dynamicStyles.sheetWrapper, style]}
        pointerEvents="box-none"
      >
        <View style={[styles.sheet, dynamicStyles.sheet]}>
          {/* Toolbar */}
          <View style={styles.toolbar}>
            {/* Grabber */}
            <View style={styles.grabberRow}>
              <View style={styles.grabber} />
            </View>

            {/* Title row */}
            <View style={[styles.titleRow, dynamicStyles.titleRow]}>
              {/* Invisible spacer to balance the close button */}
              <View style={styles.closeButtonSize} />

              <HeaderText
                variant="titleSmall"
                emphasized
                color={cr.surface.surface.sysOnSurface}
                style={styles.titleText}
              >
                {title ?? ''}
              </HeaderText>

              {/* Close button */}
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
            </View>
          </View>

          {/* Content */}
          {children && (
            <ScrollView
              style={styles.content}
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
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheetWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  toolbar: {
    alignItems: 'center',
    width: '100%',
  },
  grabberRow: {
    height: 16,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 0,
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
  content: {
    maxHeight: 400,
  },
});
