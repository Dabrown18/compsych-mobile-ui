import React from 'react';
import {
  Image,
  type ImageSourcePropType,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import Svg, { Circle as SvgCircle } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { sys } from './tokens';
import { BodyText } from './BodyText';
import { HeaderText } from './HeaderText';

export type PromotionCardVariant = 'filled' | 'tonal';
export type PromotionCardUsage =
  | 'neutral'
  | 'informative'
  | 'positive'
  | 'danger'
  | 'warning'
  | 'image';

export interface PromotionCardProps {
  variant?: PromotionCardVariant;
  usage?: PromotionCardUsage;
  title?: string;
  description?: string;
  chipLabel?: string;
  chipIcon?: React.ReactNode;
  image?: ImageSourcePropType;
  progress?: number;
  showProgressBar?: boolean;
  showRingTimer?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

const { colorRoles: cr, dimensions: dim } = sys;

type VariantTokens = {
  cardBg: string;
  chipBg: string;
  chipTextColor: string;
  titleColor: string;
  descColor: string;
  descOpacity: number;
  buttonBg: string;
  buttonIconColor: string;
  progressColor: string;
};

const TOKENS: Record<PromotionCardVariant, Record<PromotionCardUsage, VariantTokens>> = {
  filled: {
    neutral: {
      cardBg: cr.surface.surfaceContainer.sysSurfaceContainerLowest,
      chipBg: cr.surface.surfaceContainer.sysSurfaceContainerHighest,
      chipTextColor: cr.surface.surface.sysOnSurface,
      titleColor: '#0f0f0f',
      descColor: cr.surface.surface.sysOnSurfaceVariant,
      descOpacity: 1,
      buttonBg: cr.addOn.primaryFixed.sysPrimaryFixedDim,
      buttonIconColor: cr.addOn.primaryFixed.sysOnPrimaryFixed,
      progressColor: cr.accent.primary.sysPrimary,
    },
    informative: {
      cardBg: cr.custom.info.sysOnInfoContainer,
      chipBg: cr.custom.info.sysInfoContainer,
      chipTextColor: cr.custom.info.sysOnInfoContainer,
      titleColor: cr.custom.info.sysOnInfo,
      descColor: cr.transparent.neutral.sysWhite80,
      descOpacity: 1,
      buttonBg: cr.custom.info.sysOnInfo,
      buttonIconColor: cr.custom.info.sysOnInfoContainer,
      progressColor: cr.custom.info.sysOnInfo,
    },
    positive: {
      cardBg: cr.custom.success.sysOnSuccessContainer,
      chipBg: cr.custom.success.sysSuccessContainer,
      chipTextColor: cr.custom.success.sysOnSuccessContainer,
      titleColor: cr.custom.success.sysOnSuccess,
      descColor: cr.transparent.neutral.sysWhite80,
      descOpacity: 1,
      buttonBg: cr.custom.success.sysOnSuccess,
      buttonIconColor: cr.custom.success.sysOnSuccessContainer,
      progressColor: cr.custom.success.sysOnSuccess,
    },
    danger: {
      cardBg: cr.error.sysOnErrorContainer,
      chipBg: cr.error.sysErrorContainer,
      chipTextColor: cr.error.sysOnErrorContainer,
      titleColor: cr.error.sysOnError,
      descColor: cr.transparent.neutral.sysWhite80,
      descOpacity: 1,
      buttonBg: cr.error.sysOnError,
      buttonIconColor: cr.error.sysOnErrorContainer,
      progressColor: cr.error.sysOnError,
    },
    warning: {
      cardBg: cr.custom.warning.sysOnWarningContainer,
      chipBg: cr.custom.warning.sysWarningContainer,
      chipTextColor: cr.custom.warning.sysOnWarningContainer,
      titleColor: cr.custom.warning.sysOnWarning,
      descColor: cr.transparent.neutral.sysWhite80,
      descOpacity: 1,
      buttonBg: cr.custom.warning.sysOnWarning,
      buttonIconColor: cr.custom.warning.sysOnWarningContainer,
      progressColor: cr.custom.warning.sysOnWarning,
    },
    image: {
      cardBg: 'transparent',
      chipBg: 'rgba(255,255,255,0.2)',
      chipTextColor: cr.surface.inverse.sysInverseOnSurface,
      titleColor: cr.accent.primary.sysOnPrimary,
      descColor: cr.transparent.neutral.sysWhite80,
      descOpacity: 1,
      buttonBg: cr.surface.surfaceContainer.sysSurfaceContainerLowest,
      buttonIconColor: cr.surface.surface.sysOnSurface,
      progressColor: cr.accent.primary.sysOnPrimary,
    },
  },
  tonal: {
    neutral: {
      cardBg: cr.surface.surfaceContainer.sysSurfaceContainerLowest,
      chipBg: cr.surface.surfaceContainer.sysSurfaceContainerHighest,
      chipTextColor: cr.surface.surface.sysOnSurface,
      titleColor: '#0f0f0f',
      descColor: cr.surface.surface.sysOnSurfaceVariant,
      descOpacity: 1,
      buttonBg: cr.addOn.primaryFixed.sysPrimaryFixedDim,
      buttonIconColor: cr.addOn.primaryFixed.sysOnPrimaryFixed,
      progressColor: cr.accent.primary.sysPrimary,
    },
    informative: {
      cardBg: cr.custom.info.sysInfoContainer,
      chipBg: cr.custom.info.sysOnInfo,
      chipTextColor: cr.custom.info.sysOnInfoContainer,
      titleColor: cr.custom.info.sysOnInfoContainer,
      descColor: cr.custom.info.sysOnInfoContainer,
      descOpacity: 0.64,
      buttonBg: cr.custom.info.sysInfo,
      buttonIconColor: cr.custom.info.sysOnInfo,
      progressColor: cr.custom.info.sysInfo,
    },
    positive: {
      cardBg: cr.custom.success.sysSuccessContainer,
      chipBg: cr.custom.success.sysOnSuccess,
      chipTextColor: cr.custom.success.sysOnSuccessContainer,
      titleColor: cr.custom.success.sysOnSuccessContainer,
      descColor: cr.custom.success.sysOnSuccessContainer,
      descOpacity: 0.64,
      buttonBg: cr.custom.success.sysSuccess,
      buttonIconColor: cr.custom.success.sysOnSuccess,
      progressColor: cr.custom.success.sysSuccess,
    },
    danger: {
      cardBg: cr.error.sysErrorContainer,
      chipBg: cr.error.sysOnError,
      chipTextColor: cr.error.sysOnErrorContainer,
      titleColor: cr.error.sysOnErrorContainer,
      descColor: cr.error.sysOnErrorContainer,
      descOpacity: 0.64,
      buttonBg: cr.error.sysError,
      buttonIconColor: cr.error.sysOnError,
      progressColor: cr.error.sysError,
    },
    warning: {
      cardBg: cr.custom.warning.sysWarningContainer,
      chipBg: cr.custom.warning.sysOnWarning,
      chipTextColor: cr.custom.warning.sysOnWarningContainer,
      titleColor: cr.custom.warning.sysOnWarningContainer,
      descColor: cr.custom.warning.sysOnWarningContainer,
      descOpacity: 0.64,
      buttonBg: cr.custom.warning.sysWarning,
      buttonIconColor: cr.custom.warning.sysOnWarning,
      progressColor: cr.custom.warning.sysWarning,
    },
    image: {
      cardBg: 'transparent',
      chipBg: 'rgba(255,255,255,0.2)',
      chipTextColor: cr.surface.inverse.sysInverseOnSurface,
      titleColor: cr.accent.primary.sysOnPrimary,
      descColor: cr.transparent.neutral.sysWhite80,
      descOpacity: 1,
      buttonBg: cr.surface.surfaceContainer.sysSurfaceContainerLowest,
      buttonIconColor: cr.surface.surface.sysOnSurface,
      progressColor: cr.accent.primary.sysOnPrimary,
    },
  },
};

const CARD_HEIGHT = 197;
const BUTTON_SIZE = 32;
const RING_R = 14;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_R;

export function PromotionCard({
  variant = 'filled',
  usage = 'neutral',
  title,
  description,
  chipLabel,
  chipIcon,
  image,
  progress = 0.25,
  showProgressBar = true,
  showRingTimer = true,
  onPress,
  disabled = false,
  accessibilityLabel,
  style,
}: PromotionCardProps) {
  const t = TOKENS[variant][usage];
  const isImage = usage === 'image';

  const containerStyle = [
    styles.card,
    { backgroundColor: t.cardBg, opacity: disabled ? 0.48 : 1 },
    style,
  ];

  const ringArcLength = RING_CIRCUMFERENCE * Math.max(0, Math.min(1, progress));

  const inner = (
    <>
      {isImage && image && (
        <>
          <Image
            source={image}
            style={[StyleSheet.absoluteFillObject, { borderRadius: dim.borderRadius.sysRadiusLg }]}
            resizeMode="cover"
            accessible={false}
          />
          <View
            style={[
              StyleSheet.absoluteFillObject,
              { borderRadius: dim.borderRadius.sysRadiusLg, backgroundColor: 'rgba(0,0,0,0.35)' },
            ]}
            pointerEvents="none"
          />
        </>
      )}

      {/* Chip */}
      {chipLabel && (
        <View style={[styles.chip, { backgroundColor: t.chipBg }]}>
          {chipIcon && <View style={styles.chipIconWrap}>{chipIcon}</View>}
          <BodyText variant="labelMedium" color={t.chipTextColor}>
            {chipLabel}
          </BodyText>
        </View>
      )}

      {/* Content (title + description) */}
      <View style={styles.content}>
        {title && (
          <HeaderText variant="titleSmall" color={t.titleColor}>
            {title}
          </HeaderText>
        )}
        {description && (
          <View style={{ opacity: t.descOpacity }}>
            <BodyText variant="small" color={t.descColor}>
              {description}
            </BodyText>
          </View>
        )}
      </View>

      {/* Arrow button (absolute, bottom-right) */}
      <View style={styles.buttonWrap}>
        <View style={[styles.button, { backgroundColor: t.buttonBg }]}>
          <Ionicons
            name="arrow-forward"
            size={16}
            color={t.buttonIconColor}
            accessible={false}
          />
        </View>
        {showRingTimer && (
          <Svg
            width={BUTTON_SIZE}
            height={BUTTON_SIZE}
            style={StyleSheet.absoluteFillObject}
          >
            <SvgCircle
              cx={BUTTON_SIZE / 2}
              cy={BUTTON_SIZE / 2}
              r={RING_R}
              stroke={t.progressColor}
              strokeWidth={2}
              fill="transparent"
              strokeDasharray={`${ringArcLength} ${RING_CIRCUMFERENCE - ringArcLength}`}
              strokeLinecap="round"
              rotation={-90}
              origin={`${BUTTON_SIZE / 2}, ${BUTTON_SIZE / 2}`}
            />
          </Svg>
        )}
      </View>

      {/* Progress bar */}
      {showProgressBar && (
        <View style={styles.progressTrack} pointerEvents="none">
          <View
            style={[
              styles.progressFill,
              {
                width: `${Math.max(0, Math.min(1, progress)) * 100}%`,
                backgroundColor: t.progressColor,
              },
            ]}
          />
        </View>
      )}
    </>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={disabled ? undefined : onPress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? title}
        accessibilityState={{ disabled }}
        style={({ pressed }: { pressed: boolean }) => [
          ...containerStyle,
          pressed && !disabled && styles.pressed,
        ]}
      >
        {inner}
      </Pressable>
    );
  }

  return <View style={containerStyle}>{inner}</View>;
}

const styles = StyleSheet.create({
  card: {
    height: CARD_HEIGHT,
    borderRadius: sys.dimensions.borderRadius.sysRadiusLg,
    paddingHorizontal: sys.dimensions.spacing.padding.sysPadding16,
    paddingVertical: sys.dimensions.spacing.padding.sysPadding16,
    overflow: 'hidden',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: sys.dimensions.borderRadius.sysRadiusFull,
    paddingHorizontal: sys.dimensions.spacing.padding.sysPadding12,
    paddingVertical: sys.dimensions.spacing.padding.sysPadding4,
    gap: sys.dimensions.spacing.padding.sysPadding4,
    height: 24,
  },
  chipIconWrap: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    gap: sys.dimensions.spacing.padding.sysPadding4,
    maxWidth: '78%',
  },
  buttonWrap: {
    position: 'absolute',
    bottom: sys.dimensions.spacing.padding.sysPadding16,
    right: sys.dimensions.spacing.padding.sysPadding16,
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: sys.dimensions.borderRadius.sysRadiusFull,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  progressTrack: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
  progressFill: {
    height: 2,
  },
  pressed: {
    opacity: 0.84,
  },
});
