import React, { useCallback, useMemo, useRef, useState } from 'react';

import {
  Image,
  ImageSourcePropType,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputContentSizeChangeEventData,
  View,
  ViewStyle,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../../theme';

export interface ChatAttachment {
  uri: string;
  source?: ImageSourcePropType;
}

export interface ChatInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  onAttach?: () => void;
  placeholder?: string;
  attachments?: ChatAttachment[];
  onRemoveAttachment?: (index: number) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function ChatInput({
  value,
  onChangeText,
  onSend,
  onAttach,
  placeholder = 'Ask Sol Anything...',
  attachments,
  onRemoveAttachment,
  disabled = false,
  style,
}: ChatInputProps) {
  const { colorRoles: cr, dimensions: dim, iconography: ico } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const [inputHeight, setInputHeight] = useState(24);

  const handleContentSizeChange = useCallback(
    (e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
      const newHeight = Math.max(
        24,
        Math.min(120, e.nativeEvent.contentSize.height),
      );
      setInputHeight(newHeight);
    },
    [],
  );

  const hasText = value.trim().length > 0;
  const hasAttachments = !!attachments && attachments.length > 0;
  const canSend = (hasText || hasAttachments) && !disabled;

  const tokenStyles = useMemo(
    () => ({
      container: {
        borderRadius: dim.borderRadius.sysRadiusLg,
        borderWidth: isFocused
          ? dim.borderWidth.sysStrokeMedium
          : dim.borderWidth.sysStrokeThin,
        borderColor: isFocused
          ? cr.accent.primary.sysPrimary
          : cr.outline.sysOutlineVariant,
        backgroundColor: cr.surface.surfaceContainer.sysSurfaceContainerLowest,
        paddingVertical: dim.spacing.padding.sysPadding8,
        paddingHorizontal: dim.spacing.padding.sysPadding12,
        gap: dim.spacing.padding.sysPadding8,
      },
      attachBtn: {
        width: 32,
        height: 32,
        borderRadius: dim.borderRadius.sysRadiusFull,
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
        flexShrink: 0,
      },
      sendBtn: {
        width: 32,
        height: 32,
        borderRadius: dim.borderRadius.sysRadiusFull,
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
        flexShrink: 0,
        backgroundColor: canSend
          ? cr.custom.warning.sysWarning
          : cr.surface.surfaceContainer.sysSurfaceContainerHighest,
      },
      attachThumb: {
        width: 48,
        height: 48,
        borderRadius: dim.borderRadius.sysRadiusSm,
        overflow: 'hidden' as const,
      },
    }),
    [cr, dim, isFocused, canSend],
  );

  return (
    <View style={[styles.wrapper, disabled && styles.disabled, style]}>
      {/* Attachment strip */}
      {hasAttachments && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.attachStrip}
          contentContainerStyle={styles.attachStripContent}
        >
          {attachments!.map((att, i) => (
            <View key={i} style={styles.attachItem}>
              <Image
                source={att.source ?? { uri: att.uri }}
                style={tokenStyles.attachThumb}
                resizeMode="cover"
                accessibilityLabel={`Attachment ${i + 1}`}
              />
              {onRemoveAttachment && (
                <Pressable
                  onPress={() => onRemoveAttachment(i)}
                  style={styles.removeBtn}
                  accessibilityRole="button"
                  accessibilityLabel={`Remove attachment ${i + 1}`}
                >
                  <Ionicons
                    name="close-circle"
                    size={16}
                    color={cr.surface.surface.sysOnSurfaceVariant}
                  />
                </Pressable>
              )}
            </View>
          ))}
        </ScrollView>
      )}

      {/* Input row */}
      <View
        style={[
          tokenStyles.container,
          styles.inputRow,
          isFocused && {
            // focus ring via transparent primary halo
            shadowColor: cr.accent.primary.sysPrimary,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.08,
            shadowRadius: 4,
          },
        ]}
      >
        {/* Attach button */}
        {onAttach && (
          <Pressable
            onPress={onAttach}
            disabled={disabled}
            style={({ pressed }) => [
              tokenStyles.attachBtn,
              pressed && styles.pressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Add attachment"
          >
            <Ionicons
              name="add"
              size={ico.sysSizeSm}
              color={
                disabled
                  ? cr.surface.surface.sysOnSurfaceVariant
                  : cr.surface.surface.sysOnSurface
              }
            />
          </Pressable>
        )}

        {/* Text field */}
        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={cr.surface.surface.sysOnSurfaceVariant}
          editable={!disabled}
          multiline
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onContentSizeChange={handleContentSizeChange}
          scrollEnabled={inputHeight >= 120}
          style={[
            styles.textInput,
            {
              color: cr.surface.surface.sysOnSurface,
              fontSize: 16,
              lineHeight: 24,
              height: inputHeight,
            },
          ]}
          accessibilityLabel={placeholder}
          returnKeyType="default"
        />

        {/* Send button */}
        <Pressable
          onPress={canSend ? onSend : undefined}
          disabled={!canSend}
          style={({ pressed }) => [
            tokenStyles.sendBtn,
            pressed && canSend && styles.pressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Send"
          accessibilityState={{ disabled: !canSend }}
        >
          <Ionicons
            name="arrow-up"
            size={ico.sysSizeSm}
            color={
              canSend
                ? cr.custom.warning.sysOnWarning
                : cr.surface.surface.sysOnSurfaceVariant
            }
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 4,
  },
  disabled: {
    opacity: 0.48,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    includeFontPadding: false,
    padding: 0,
    margin: 0,
  },
  attachStrip: {
    flexShrink: 0,
  },
  attachStripContent: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 4,
  },
  attachItem: {
    position: 'relative',
  },
  removeBtn: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  pressed: {
    opacity: 0.7,
  },
});
