import React, { useMemo } from 'react';

import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { useTheme } from '../../theme';

// ─────────────────────────────────────────────────────────────────────────────
// ProgressBar — standalone horizontal fill bar (0–100)
// ─────────────────────────────────────────────────────────────────────────────

export interface ProgressBarProps {
  /** 0–100 */
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  const { colorRoles: cr } = useTheme();
  const clamped = Math.min(100, Math.max(0, progress));

  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: clamped }}
      style={[
        styles.track,
        {
          backgroundColor:
            cr.surface.surfaceContainer.sysSurfaceContainerHighest,
        },
      ]}
    >
      {clamped > 0 && (
        <View
          style={[
            styles.fill,
            {
              width: `${clamped}%`,
              backgroundColor: cr.custom.success.sysSuccess,
            },
          ]}
        />
      )}
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ProgressTracker — multi-step bar tracker
// ─────────────────────────────────────────────────────────────────────────────

export type StepState = 'completed' | 'active' | 'pending';

export interface TrackerStep {
  label?: string;
  /**
   * `completed` → full green bar
   * `active`    → full green bar (current step — same fill as completed)
   * `pending`   → gray track only
   */
  state: StepState;
}

export type ProgressTrackerSize = 'sm' | 'lg';

export interface ProgressTrackerProps {
  steps: TrackerStep[];
  size?: ProgressTrackerSize;
  /** Render step labels above each bar. Default false. */
  showLabels?: boolean;
  style?: StyleProp<ViewStyle>;
}

function stepProgress(state: StepState): number {
  return state === 'pending' ? 0 : 100;
}

export function ProgressTracker({
  steps,
  size = 'lg',
  showLabels = false,
  style,
}: ProgressTrackerProps) {
  const { colorRoles: cr, dimensions: dim, typeScale: ts } = useTheme();

  const sizeTokens = useMemo(
    () => ({
      sm: {
        fontSize: ts.labelSmall.sysFontSize,
        lineHeight: ts.labelSmall.sysLineHeight,
        letterSpacing: ts.labelSmall.sysTracking,
        labelBarGap: dim.spacing.padding.sysPadding8,
        stepGap: dim.spacing.padding.sysPadding4,
      },
      lg: {
        fontSize: ts.labelMedium.sysFontSize,
        lineHeight: ts.labelMedium.sysLineHeight,
        letterSpacing: ts.labelMedium.sysTracking,
        labelBarGap: dim.spacing.padding.sysPadding16,
        stepGap: dim.spacing.padding.sysPadding8,
      },
    }),
    [ts, dim],
  );

  const s = sizeTokens[size];

  return (
    <View style={[styles.row, { gap: s.stepGap }, style]}>
      {steps.map((step, i) => {
        const isActive = step.state !== 'pending';
        const labelColor = isActive
          ? cr.surface.surface.sysOnSurface
          : cr.surface.surface.sysOnSurfaceVariant;

        return (
          <View key={i} style={styles.step}>
            {showLabels && (
              <Text
                style={{
                  color: labelColor,
                  fontSize: s.fontSize,
                  lineHeight: s.lineHeight,
                  letterSpacing: s.letterSpacing,
                  includeFontPadding: false,
                  marginBottom: s.labelBarGap,
                }}
                numberOfLines={1}
              >
                {step.label}
              </Text>
            )}
            <ProgressBar progress={stepProgress(step.state)} />
          </View>
        );
      })}
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared styles
// ─────────────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  // ProgressBar
  track: {
    height: 4,
    width: '100%',
    borderRadius: 9999,
    overflow: 'hidden',
  },
  fill: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    borderRadius: 9999,
  },
  // ProgressTracker
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  step: {
    flex: 1,
    minWidth: 0,
  },
});
