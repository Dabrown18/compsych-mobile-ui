import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BodyText, HeaderText, sys } from '@compsych/mobile-ui';

const { colorRoles: cr, dimensions: dim } = sys;

interface Props {
  name: string;
  description: string;
  children: React.ReactNode;
}

export function ScreenWrapper({ name, description, children }: Props) {
  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Component header */}
        <View style={styles.header}>
          <HeaderText variant="titleMedium" emphasized color={cr.surface.surface.sysOnSurface}>
            {name}
          </HeaderText>
          <BodyText variant="medium" color={cr.surface.surface.sysOnSurfaceVariant}>
            {description}
          </BodyText>
        </View>

        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: cr.surface.surface.sysSurface,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: dim.spacing.padding.sysPadding40,
  },
  header: {
    paddingHorizontal: dim.spacing.padding.sysPadding20,
    paddingTop: dim.spacing.padding.sysPadding20,
    paddingBottom: dim.spacing.padding.sysPadding16,
    gap: dim.spacing.padding.sysPadding4,
    borderBottomWidth: 1,
    borderBottomColor: cr.outline.sysOutline,
    marginBottom: dim.spacing.padding.sysPadding8,
  },
});
