import React from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { sys } from './tokens';
import { HeaderText } from './HeaderText';
import { Button } from './Button';

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
}

const { colorRoles: cr, dimensions: dim } = sys;

export function ActionSheet({
  visible,
  onClose,
  title,
  children,
  primaryAction,
  secondaryAction,
}: ActionSheetProps) {
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
      <View style={styles.sheetWrapper} pointerEvents="box-none">
        <View style={styles.sheet}>

          {/* Toolbar */}
          <View style={styles.toolbar}>
            {/* Grabber */}
            <View style={styles.grabberRow}>
              <View style={styles.grabber} />
            </View>

            {/* Title row */}
            <View style={styles.titleRow}>
              {/* Invisible spacer to balance the close button */}
              <View style={styles.closeButton} />

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
                  styles.closeButton,
                  { backgroundColor: cr.surface.surfaceContainer.sysSurfaceContainer },
                  pressed && styles.closePresseed,
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
              contentContainerStyle={styles.contentInner}
              showsVerticalScrollIndicator={false}
            >
              {children}
            </ScrollView>
          )}

          {/* Actions */}
          {(primaryAction || secondaryAction) && (
            <View style={styles.actions}>
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

const { colorRoles: cr2, dimensions: dim2 } = sys;

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheetWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: dim2.spacing.padding.sysPadding6,
    paddingBottom: dim2.spacing.padding.sysPadding6,
  },
  sheet: {
    backgroundColor: cr2.surface.surfaceContainer.sysSurfaceContainerLowest,
    borderRadius: dim2.borderRadius.sysRadiusXxl,
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
    paddingHorizontal: dim2.spacing.padding.sysPadding16,
    paddingVertical: dim2.spacing.padding.sysPadding8,
    width: '100%',
  },
  titleText: {
    flex: 1,
    textAlign: 'center',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: dim2.borderRadius.sysRadiusFull,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closePresseed: {
    opacity: 0.7,
  },
  content: {
    maxHeight: 400,
  },
  contentInner: {
    padding: dim2.spacing.padding.sysPadding16,
  },
  actions: {
    padding: dim2.spacing.padding.sysPadding24,
    gap: dim2.spacing.padding.sysPadding12,
  },
});
