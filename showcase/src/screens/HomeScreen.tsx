import React from 'react';
import {
  Pressable,
  SectionList,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { BodyText, HeaderText, sys } from '@compsych/mobile-ui';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';

const { colorRoles: cr, dimensions: dim } = sys;

type Nav = NativeStackNavigationProp<RootStackParamList, 'Home'>;
interface Props { navigation: Nav; }

type ScreenName = keyof Omit<RootStackParamList, 'Home'>;

interface NavItem {
  name: string;
  screen: ScreenName;
  description: string;
  ready?: boolean;
}

const SECTIONS: { title: string; eyebrow: string; data: NavItem[] }[] = [
  {
    title: 'Molecules',
    eyebrow: 'ATOMS & MOLECULES',
    data: [
      { name: 'Alert',            screen: 'Alert',            description: '6 variants · 2 sizes',               ready: true },
      { name: 'Avatar',           screen: 'Avatar',           description: '4 sizes · image + initials' },
      { name: 'Badge',            screen: 'Badge',            description: '3 styles · 3 sizes',                 ready: true },
      { name: 'Breadcrumb',       screen: 'Breadcrumb',       description: '2 sizes · truncation' },
      { name: 'Button',           screen: 'Button',           description: '7 variants · 4 sizes · 5 states',    ready: true },
      { name: 'Card',             screen: 'Card',             description: '3 sizes · 5 variants',               ready: true },
      { name: 'Checkbox',         screen: 'Checkbox',         description: '3 states · 2 sizes',                 ready: true },
      { name: 'Chip',             screen: 'Chip',             description: 'Selection + input chip' },
      { name: 'Divider',          screen: 'Divider',          description: '3 variants · 3 weights' },
      { name: 'Empty State',      screen: 'EmptyState',       description: 'Full-screen + inline' },
      { name: 'Input',            screen: 'Input',            description: 'Text field · validation states' },
      { name: 'Pagination',       screen: 'Pagination',       description: 'Page controls · 2 sizes' },
      { name: 'Progress Tracker', screen: 'ProgressTracker',  description: 'Steps + bar' },
      { name: 'Radio Button',     screen: 'RadioButton',      description: '2 sizes' },
      { name: 'Segmented Control',screen: 'SegmentedControl', description: 'Pill tab switcher' },
      { name: 'Slider',           screen: 'Slider',           description: 'Range input' },
      { name: 'Snackbar',         screen: 'Snackbar',         description: '2 variants · slide animation',       ready: true },
      { name: 'Switch',           screen: 'Switch',           description: 'On / off toggle',                    ready: true },
      { name: 'Tooltip',          screen: 'Tooltip',          description: '2 variants · 4 directions' },
    ],
  },
  {
    title: 'Organisms',
    eyebrow: 'ORGANISMS',
    data: [
      { name: 'Action Sheet',     screen: 'ActionSheet',      description: 'Bottom sheet modal' },
      { name: 'List',             screen: 'List',             description: 'Simple + detailed rows' },
      { name: 'Plan Card',        screen: 'PlanCard',         description: 'Expandable plan item' },
      { name: 'Promotion Card',   screen: 'PromotionCard',    description: '2 styles · 6 usages · progress timer', ready: true },
    ],
  },
  {
    title: 'Typography',
    eyebrow: 'TYPOGRAPHY',
    data: [
      { name: 'Header Text',      screen: 'HeaderText',       description: 'Display · Headline · Title' },
      { name: 'Body Text',        screen: 'BodyText',         description: 'Body · Label' },
    ],
  },
];

export function HomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <SectionList
        sections={SECTIONS}
        keyExtractor={(item) => item.screen}
        contentContainerStyle={styles.list}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <BodyText variant="labelSmall" color={cr.surface.surface.sysOnSurfaceVariant} style={styles.sectionLabel}>
              {section.eyebrow}
            </BodyText>
          </View>
        )}
        renderItem={({ item, index, section }) => {
          const isLast = index === section.data.length - 1;
          return (
            <Pressable
              onPress={() => navigation.navigate(item.screen as any)}
              style={({ pressed }) => [
                styles.item,
                !isLast && styles.itemBorder,
                pressed && styles.itemPressed,
              ]}
            >
              <View style={styles.itemText}>
                <View style={styles.itemTitleRow}>
                  <BodyText variant="medium" color={cr.surface.surface.sysOnSurface}>
                    {item.name}
                  </BodyText>
                  {item.ready && (
                    <View style={styles.readyDot} />
                  )}
                </View>
                <BodyText variant="small" color={cr.surface.surface.sysOnSurfaceVariant}>
                  {item.description}
                </BodyText>
              </View>
              <Ionicons name="chevron-forward" size={16} color={cr.outline.sysOutlineFixed} />
            </Pressable>
          );
        }}
        renderSectionFooter={() => <View style={styles.sectionFooter} />}
        ListHeaderComponent={
          <View style={styles.heroHeader}>
            <View style={styles.heroBadge}>
              <BodyText variant="labelSmall" color={cr.accent.primary.sysOnPrimary} style={styles.heroBadgeText}>
                MOBILE DESIGN SYSTEM
              </BodyText>
            </View>
            <HeaderText variant="titleLarge" emphasized color={cr.surface.surface.sysOnSurface}>
              ComPsych Mobile UI
            </HeaderText>
            <BodyText variant="medium" color={cr.surface.surface.sysOnSurfaceVariant}>
              24 components · React Native · Expo
            </BodyText>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: cr.surface.surface.sysSurface,
  },
  list: {
    paddingBottom: dim.spacing.padding.sysPadding40,
  },
  heroHeader: {
    paddingHorizontal: dim.spacing.padding.sysPadding20,
    paddingTop: dim.spacing.padding.sysPadding24,
    paddingBottom: dim.spacing.padding.sysPadding20,
    gap: dim.spacing.padding.sysPadding6,
    borderBottomWidth: 1,
    borderBottomColor: cr.outline.sysOutline,
    marginBottom: dim.spacing.padding.sysPadding8,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: cr.accent.primary.sysPrimary,
    borderRadius: dim.borderRadius.sysRadiusFull,
    paddingHorizontal: dim.spacing.padding.sysPadding8,
    paddingVertical: dim.spacing.padding.sysPadding2,
    marginBottom: dim.spacing.padding.sysPadding4,
  },
  heroBadgeText: { letterSpacing: 0.8 },
  sectionHeader: {
    paddingHorizontal: dim.spacing.padding.sysPadding20,
    paddingTop: dim.spacing.padding.sysPadding16,
    paddingBottom: dim.spacing.padding.sysPadding8,
  },
  sectionLabel: { letterSpacing: 0.8 },
  sectionFooter: { height: dim.spacing.padding.sysPadding8 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: dim.spacing.padding.sysPadding20,
    paddingVertical: 14,
    backgroundColor: cr.surface.surfaceContainer.sysSurfaceContainerLowest,
  },
  itemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: cr.outline.sysOutline,
  },
  itemPressed: {
    backgroundColor: cr.surface.surfaceContainer.sysSurfaceContainerLow,
  },
  itemText: { flex: 1, gap: 2 },
  itemTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  readyDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: cr.custom.success.sysSuccess,
  },
});
