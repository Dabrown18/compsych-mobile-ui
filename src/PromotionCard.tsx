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
export type PromotionCardSize = 'md' | 'lg';

export interface PromotionCardProps {
  size?: PromotionCardSize;
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

// lg tokens: neutral uses filled, others use tonal
function getLgTokens(usage: PromotionCardUsage): VariantTokens {
  if (usage === 'neutral') return TOKENS.filled.neutral;
  return TOKENS.tonal[usage];
}

const MD_HEIGHT = 197;
const LG_HEIGHT = 363;
const MD_BUTTON = 32;
const LG_BUTTON = 48;
const MD_RING_R = 14;
const LG_RING_R = 21;
const MD_RING_C = 2 * Math.PI * MD_RING_R;
const LG_RING_C = 2 * Math.PI * LG_RING_R;
const LG_DOTS_BOTTOM = 53;
const LG_DOTS_LEFT = 32;
const LG_DOT_SIZE = 6;
const LG_DOT_GAP = 4;
const LG_DOT_COUNT = 5;

export function PromotionCard({
  size = 'md',
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
  const isLg = size === 'lg';
  const t = isLg ? getLgTokens(usage) : TOKENS[variant][usage];
  const isImage = usage === 'image';
  const p = Math.max(0, Math.min(1, progress));

  const buttonSize = isLg ? LG_BUTTON : MD_BUTTON;
  const ringR = isLg ? LG_RING_R : MD_RING_R;
  const ringC = isLg ? LG_RING_C : MD_RING_C;
  const ringArcLength = ringC * p;

  const containerStyle = [
    styles.card,
    isLg ? styles.cardLg : styles.cardMd,
    { backgroundColor: t.cardBg, opacity: disabled ? 0.48 : 1 },
    style,
  ];

  const inner = (
    <>
      {isImage && image && (
        <>
          <Image
            source={image}
            style={[
              StyleSheet.absoluteFillObject,
              { borderRadius: isLg ? dim.borderRadius.sysRadiusXl : dim.borderRadius.sysRadiusLg },
            ]}
            resizeMode="cover"
            accessible={false}
          />
          <View
            style={[
              StyleSheet.absoluteFillObject,
              {
                borderRadius: isLg ? dim.borderRadius.sysRadiusXl : dim.borderRadius.sysRadiusLg,
                backgroundColor: 'rgba(0,0,0,0.35)',
              },
            ]}
            pointerEvents="none"
          />
        </>
      )}

      {/* Chip */}
      {chipLabel && (
        <View style={[isLg ? styles.chipLg : styles.chipMd, { backgroundColor: t.chipBg }]}>
          {chipIcon && (
            <View style={isLg ? styles.chipIconWrapLg : styles.chipIconWrapMd}>{chipIcon}</View>
          )}
          <BodyText variant="labelMedium" color={t.chipTextColor}>
            {chipLabel}
          </BodyText>
        </View>
      )}

      {/* Content (title + description) */}
      <View style={isLg ? styles.contentLg : styles.contentMd}>
        {title && (
          isLg
            ? <HeaderText variant="titleLarge" color={t.titleColor}>{title}</HeaderText>
            : <HeaderText variant="titleSmall" color={t.titleColor}>{title}</HeaderText>
        )}
        {description && (
          <View style={{ opacity: t.descOpacity }}>
            <BodyText variant={isLg ? 'medium' : 'small'} color={t.descColor}>
              {description}
            </BodyText>
          </View>
        )}
      </View>

      {/* Arrow button (absolute, bottom-right) */}
      <View
        style={[
          styles.buttonWrap,
          {
            bottom: isLg
              ? dim.spacing.padding.sysPadding32
              : dim.spacing.padding.sysPadding16,
            right: isLg
              ? dim.spacing.padding.sysPadding32
              : dim.spacing.padding.sysPadding16,
            width: buttonSize,
            height: buttonSize,
          },
        ]}
      >
        <View style={[styles.button, { width: buttonSize, height: buttonSize, backgroundColor: t.buttonBg }]}>
          <Ionicons
            name="arrow-forward"
            size={isLg ? 24 : 16}
            color={t.buttonIconColor}
            accessible={false}
          />
        </View>
        {showRingTimer && (
          <Svg
            width={buttonSize}
            height={buttonSize}
            style={StyleSheet.absoluteFillObject}
          >
            <SvgCircle
              cx={buttonSize / 2}
              cy={buttonSize / 2}
              r={ringR}
              stroke={t.progressColor}
              strokeWidth={2}
              fill="transparent"
              strokeDasharray={`${ringArcLength} ${ringC - ringArcLength}`}
              strokeLinecap="round"
              rotation={-90}
              origin={`${buttonSize / 2}, ${buttonSize / 2}`}
            />
          </Svg>
        )}
      </View>

      {/* Pagination dots (lg only) */}
      {isLg && (
        <View style={styles.dotsRow}>
          {Array.from({ length: LG_DOT_COUNT }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                {
                  backgroundColor: i === 0 ? t.progressColor : 'transparent',
                  borderColor: t.progressColor,
                  borderWidth: i === 0 ? 0 : 1.5,
                  opacity: i === 0 ? 1 : 0.4,
                },
              ]}
            />
          ))}
        </View>
      )}

      {/* Progress bar */}
      {showProgressBar && (
        <View
          style={[styles.progressTrack, { height: isLg ? 4 : 2 }]}
          pointerEvents="none"
        >
          <View
            style={[
              styles.progressFill,
              {
                width: `${p * 100}%` as any,
                height: isLg ? 4 : 2,
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
    overflow: 'hidden',
    alignSelf: 'stretch',
  },
  cardMd: {
    height: MD_HEIGHT,
    borderRadius: sys.dimensions.borderRadius.sysRadiusLg,
    paddingHorizontal: sys.dimensions.spacing.padding.sysPadding16,
    paddingVertical: sys.dimensions.spacing.padding.sysPadding16,
    justifyContent: 'space-between',
  },
  cardLg: {
    height: LG_HEIGHT,
    borderRadius: sys.dimensions.borderRadius.sysRadiusXl,
    padding: sys.dimensions.spacing.padding.sysPadding32,
    flexDirection: 'column',
    gap: sys.dimensions.spacing.padding.sysPadding24,
  },
  chipMd: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: sys.dimensions.borderRadius.sysRadiusFull,
    paddingHorizontal: sys.dimensions.spacing.padding.sysPadding12,
    paddingVertical: sys.dimensions.spacing.padding.sysPadding4,
    gap: sys.dimensions.spacing.padding.sysPadding4,
    height: 24,
  },
  chipLg: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: sys.dimensions.borderRadius.sysRadiusFull,
    paddingHorizontal: sys.dimensions.spacing.padding.sysPadding16,
    paddingVertical: sys.dimensions.spacing.padding.sysPadding4,
    gap: sys.dimensions.spacing.padding.sysPadding8,
    height: 32,
  },
  chipIconWrapMd: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipIconWrapLg: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentMd: {
    gap: sys.dimensions.spacing.padding.sysPadding4,
    maxWidth: '78%',
  },
  contentLg: {
    gap: sys.dimensions.spacing.padding.sysPadding8,
    flex: 1,
  },
  buttonWrap: {
    position: 'absolute',
  },
  button: {
    borderRadius: sys.dimensions.borderRadius.sysRadiusFull,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  dotsRow: {
    position: 'absolute',
    bottom: LG_DOTS_BOTTOM,
    left: LG_DOTS_LEFT,
    flexDirection: 'row',
    alignItems: 'center',
    gap: LG_DOT_GAP,
  },
  dot: {
    width: LG_DOT_SIZE,
    height: LG_DOT_SIZE,
    borderRadius: LG_DOT_SIZE / 2,
  },
  progressTrack: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
  progressFill: {},
  pressed: {
    opacity: 0.84,
  },
});
