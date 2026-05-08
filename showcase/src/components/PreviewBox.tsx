import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BodyText, sys } from '@compsych/mobile-ui';

const { colorRoles: cr, dimensions: dim } = sys;

interface Props {
  children: React.ReactNode;
  label?: string;
}

export function PreviewBox({ children, label = 'Preview' }: Props) {
  return (
    <View style={styles.section}>
      <BodyText variant="labelSmall" color={cr.surface.surface.sysOnSurfaceVariant} style={styles.label}>
        {label.toUpperCase()}
      </BodyText>
      <View style={styles.box}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginHorizontal: dim.spacing.padding.sysPadding20,
    marginTop: dim.spacing.padding.sysPadding16,
    gap: dim.spacing.padding.sysPadding8,
  },
  label: {
    letterSpacing: 0.8,
  },
  box: {
    backgroundColor: cr.surface.surfaceContainer.sysSurfaceContainerLow,
    borderRadius: dim.borderRadius.sysRadiusLg,
    borderWidth: 1,
    borderColor: cr.outline.sysOutline,
    padding: dim.spacing.padding.sysPadding24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
});
