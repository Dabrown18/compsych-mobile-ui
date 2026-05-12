import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  TextInput,
  View,
} from 'react-native';
import { BodyText, sys } from '@compsych/mobile-ui';

const { colorRoles: cr, dimensions: dim } = sys;

// ─── Chip selector ────────────────────────────────────────────────────────────

interface ChipsProps<T extends string> {
  label: string;
  options: T[];
  value: T;
  onChange: (v: T) => void;
}

export function PropChips<T extends string>({ label, options, value, onChange }: ChipsProps<T>) {
  return (
    <View style={styles.row}>
      <BodyText variant="small" color={cr.surface.surface.sysOnSurfaceVariant} style={styles.propLabel}>
        {label}
      </BodyText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        {options.map((opt) => {
          const active = opt === value;
          return (
            <View
              key={opt}
              style={[styles.chip, active && styles.chipActive]}
              // @ts-ignore — onTouchEnd is fine for basic interaction
              onTouchEnd={() => onChange(opt)}
            >
              <BodyText
                variant="labelSmall"
                color={active ? cr.accent.primary.sysOnPrimary : cr.surface.surface.sysOnSurfaceVariant}
              >
                {opt}
              </BodyText>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

// ─── Toggle ──────────────────────────────────────────────────────────────────

interface ToggleProps {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}

export function PropToggle({ label, value, onChange }: ToggleProps) {
  return (
    <View style={[styles.row, styles.toggleRow]}>
      <BodyText variant="small" color={cr.surface.surface.sysOnSurfaceVariant}>
        {label}
      </BodyText>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{
          false: cr.outline.sysOutlineVariant,
          true: cr.accent.primary.sysPrimary,
        }}
        thumbColor="#fff"
      />
    </View>
  );
}

// ─── Text input ──────────────────────────────────────────────────────────────

interface TextPropProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export function PropText({ label, value, onChange, placeholder }: TextPropProps) {
  return (
    <View style={[styles.row, styles.toggleRow]}>
      <BodyText variant="small" color={cr.surface.surface.sysOnSurfaceVariant} style={styles.propLabel}>
        {label}
      </BodyText>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={cr.outline.sysOutlineFixed}
        style={styles.textInput}
      />
    </View>
  );
}

// ─── Section wrapper ─────────────────────────────────────────────────────────

interface PanelProps {
  children: React.ReactNode;
}

export function PropsPanel({ children }: PanelProps) {
  return (
    <View style={styles.panel}>
      <BodyText variant="labelSmall" color={cr.surface.surface.sysOnSurfaceVariant} style={styles.panelLabel}>
        PROPS
      </BodyText>
      <View style={styles.panelBody}>
        {children}
      </View>
    </View>
  );
}

// ─── Variant grid ─────────────────────────────────────────────────────────────

interface GridProps {
  title: string;
  children: React.ReactNode;
  columns?: number;
}

export function ShowcaseGrid({ title, children, columns = 2 }: GridProps) {
  return (
    <View style={styles.gridSection}>
      <BodyText variant="labelSmall" color={cr.surface.surface.sysOnSurfaceVariant} style={styles.panelLabel}>
        {title.toUpperCase()}
      </BodyText>
      <View style={[styles.grid, { gap: dim.spacing.padding.sysPadding12 }]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    marginHorizontal: dim.spacing.padding.sysPadding20,
    marginTop: dim.spacing.padding.sysPadding16,
    gap: dim.spacing.padding.sysPadding8,
  },
  panelLabel: {
    letterSpacing: 0.8,
  },
  panelBody: {
    backgroundColor: cr.surface.surfaceContainer.sysSurfaceContainerLowest,
    borderRadius: dim.borderRadius.sysRadiusLg,
    borderWidth: 1,
    borderColor: cr.outline.sysOutline,
    overflow: 'hidden',
  },
  row: {
    paddingHorizontal: dim.spacing.padding.sysPadding16,
    paddingVertical: dim.spacing.padding.sysPadding12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: cr.outline.sysOutline,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  propLabel: {
    marginBottom: dim.spacing.padding.sysPadding8,
  },
  chips: {
    flexDirection: 'row',
    gap: dim.spacing.padding.sysPadding6,
  },
  chip: {
    paddingHorizontal: dim.spacing.padding.sysPadding12,
    paddingVertical: dim.spacing.padding.sysPadding4,
    borderRadius: dim.borderRadius.sysRadiusFull,
    borderWidth: 1,
    borderColor: cr.outline.sysOutlineVariant,
    backgroundColor: 'transparent',
  },
  chipActive: {
    backgroundColor: cr.accent.primary.sysPrimary,
    borderColor: cr.accent.primary.sysPrimary,
  },
  textInput: {
    flex: 1,
    textAlign: 'right',
    color: cr.surface.surface.sysOnSurface,
    fontSize: 14,
    fontFamily: 'GoogleSans_400Regular',
  },
  gridSection: {
    marginHorizontal: dim.spacing.padding.sysPadding20,
    marginTop: dim.spacing.padding.sysPadding20,
    gap: dim.spacing.padding.sysPadding8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
