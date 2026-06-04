import React, { useMemo } from 'react';

import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../../theme';
import { BodyText } from '../BodyText';

export type ChatBubbleVariant = 'incoming' | 'outgoing';

export interface ChatBubbleProps {
  variant: ChatBubbleVariant;
  message: string;
  timestamp?: string;
  onThumbsUp?: () => void;
  onThumbsDown?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function ChatBubble({
  variant,
  message,
  timestamp,
  onThumbsUp,
  onThumbsDown,
  style,
}: ChatBubbleProps) {
  const { colorRoles: cr, dimensions: dim, iconography: ico } = useTheme();

  const isOutgoing = variant === 'outgoing';

  const tokenStyles = useMemo(
    () => ({
      bubble: {
        paddingVertical: dim.spacing.padding.sysPadding12,
        paddingHorizontal: dim.spacing.padding.sysPadding16,
      },
      bubbleIncoming: {
        backgroundColor: cr.surface.surfaceContainer.sysSurfaceContainer,
        borderTopLeftRadius: dim.borderRadius.sysRadiusLg,
        borderTopRightRadius: dim.borderRadius.sysRadiusLg,
        borderBottomLeftRadius: dim.borderRadius.sysRadiusXs,
        borderBottomRightRadius: dim.borderRadius.sysRadiusXs,
      },
      bubbleOutgoing: {
        backgroundColor: cr.accent.primary.sysPrimary,
        borderTopLeftRadius: dim.borderRadius.sysRadiusXl,
        borderTopRightRadius: dim.borderRadius.sysRadiusXl,
        borderBottomLeftRadius: dim.borderRadius.sysRadiusXl,
        borderBottomRightRadius: dim.borderRadius.sysRadiusXs,
      },
      metaRow: {
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
        gap: dim.spacing.padding.sysPadding8,
        marginTop: dim.spacing.padding.sysPadding4,
      },
      reactionBtn: {
        padding: dim.spacing.padding.sysPadding2,
      },
    }),
    [cr, dim],
  );

  const textColor = isOutgoing
    ? cr.accent.primary.sysOnPrimary
    : cr.surface.surface.sysOnSurface;
  const timestampColor = isOutgoing
    ? 'rgba(255,255,255,0.64)'
    : cr.surface.surface.sysOnSurfaceVariant;
  const iconColor = cr.surface.surface.sysOnSurfaceVariant;
  const iconSize = ico.sysSizeXs;

  return (
    <View
      style={[
        styles.row,
        isOutgoing ? styles.rowOutgoing : styles.rowIncoming,
        style,
      ]}
    >
      <View style={styles.bubbleWrapper}>
        {/* Bubble */}
        <View
          style={[
            tokenStyles.bubble,
            isOutgoing
              ? tokenStyles.bubbleOutgoing
              : tokenStyles.bubbleIncoming,
          ]}
        >
          <BodyText variant="medium" color={textColor}>
            {message}
          </BodyText>
        </View>

        {/* Meta row: timestamp + reactions */}
        <View
          style={[
            tokenStyles.metaRow,
            isOutgoing ? styles.metaOutgoing : styles.metaIncoming,
          ]}
        >
          {timestamp && (
            <BodyText variant="labelSmall" color={timestampColor}>
              {timestamp}
            </BodyText>
          )}

          {/* Reaction buttons — incoming only */}
          {!isOutgoing && (onThumbsUp || onThumbsDown) && (
            <>
              {onThumbsUp && (
                <Pressable
                  onPress={onThumbsUp}
                  style={({ pressed }) => [
                    tokenStyles.reactionBtn,
                    pressed && styles.pressed,
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel="Thumbs up"
                >
                  <Ionicons
                    name="thumbs-up-outline"
                    size={iconSize}
                    color={iconColor}
                  />
                </Pressable>
              )}
              {onThumbsDown && (
                <Pressable
                  onPress={onThumbsDown}
                  style={({ pressed }) => [
                    tokenStyles.reactionBtn,
                    pressed && styles.pressed,
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel="Thumbs down"
                >
                  <Ionicons
                    name="thumbs-down-outline"
                    size={iconSize}
                    color={iconColor}
                  />
                </Pressable>
              )}
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    width: '100%',
  },
  rowIncoming: {
    justifyContent: 'flex-start',
    paddingRight: 64,
  },
  rowOutgoing: {
    justifyContent: 'flex-end',
    paddingLeft: 32,
  },
  metaIncoming: {
    justifyContent: 'flex-start',
  },
  metaOutgoing: {
    justifyContent: 'flex-end',
  },
  bubbleWrapper: {},
  pressed: {
    opacity: 0.6,
  },
});
