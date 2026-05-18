import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { sys } from '../tokens';

const { colorRoles: cr, dimensions: dim, typeScale: ts } = sys;

// ─────────────────────────────────────────────────────────────────────────────
// ProgressBar — standalone horizontal bar
// ─────────────────────────────────────────────────────────────────────────────

export interface ProgressBarProps {
  /** 0–100 */
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, progress));

  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: clamped }}
      style={styles.track}
    >
      {clamped > 0 && (
        <View
          style={[
            styles.fill,
            // Use percentage width — relies on the parent having a defined
            // width (which it always does as flex-stretch in the tracker).
            { width: `${clamped}%` },
          ]}
        />
      )}
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ProgressTracker — multi-step labelled tracker
// ─────────────────────────────────────────────────────────────────────────────

export type StepState = 'completed' | 'active' | 'pending';

export interface TrackerStep {
  label: string;
  /**
   * `completed` → full green bar
   * `active`    → partial green bar (25 % fill — the "in-progress" indicator)
   * `pending`   → empty track
   */
  state: StepState;
}

export type ProgressTrackerSize = 'sm' | 'lg';

export interface ProgressTrackerProps {
  steps: TrackerStep[];
  size?: ProgressTrackerSize;
  /** Show step labels — default true */
  showLabels?: boolean;
  style?: StyleProp<ViewStyle>;
}

const SIZE_TOKENS = {
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
};

function stepProgress(state: StepState): number {
  switch (state) {
    case 'completed': return 100;
    case 'active':    return 25;
    case 'pending':   return 0;
  }
}

export function ProgressTracker({
  steps,
  size = 'lg',
  showLabels = true,
  style,
}: ProgressTrackerProps) {
  const s = SIZE_TOKENS[size];

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
    backgroundColor: cr.surface.surfaceContainer.sysSurfaceContainerHighest,
    overflow: 'hidden',
  },
  fill: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    borderRadius: 9999,
    backgroundColor: cr.custom.success.sysSuccess,
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
