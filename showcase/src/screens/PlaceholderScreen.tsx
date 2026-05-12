import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BodyText, HeaderText, sys } from '@compsych/mobile-ui';
import { SafeAreaView } from 'react-native-safe-area-context';

const { colorRoles: cr, dimensions: dim } = sys;

interface Props {
  route: { name: string };
}

export function PlaceholderScreen({ route }: Props) {
  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.center}>
        <View style={styles.iconWrap}>
          <Ionicons name="construct-outline" size={32} color={cr.accent.primary.sysPrimary} />
        </View>
        <HeaderText variant="titleSmall" emphasized color={cr.surface.surface.sysOnSurface}>
          {route.name}
        </HeaderText>
        <BodyText variant="medium" color={cr.surface.surface.sysOnSurfaceVariant} style={styles.sub}>
          Showcase page coming soon
        </BodyText>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: cr.surface.surface.sysSurface },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: dim.spacing.padding.sysPadding8 },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: dim.borderRadius.sysRadiusFull,
    backgroundColor: cr.transparent.primary.sysPrimary08,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: dim.spacing.padding.sysPadding8,
  },
  sub: { textAlign: 'center' },
});
