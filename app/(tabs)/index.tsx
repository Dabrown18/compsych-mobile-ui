import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Alert } from '@/components/ds/Alert';
import { Divider } from '@/components/ds/Divider';
import { Tooltip } from '@/components/ds/Tooltip';
import { Avatar } from '@/components/ds/Avatar';
import { Badge } from '@/components/ds/Badge';
import { Breadcrumb } from '@/components/ds/Breadcrumb';
import { ProgressBar, ProgressTracker } from '@/components/ds/ProgressTracker';
import { Button } from '@/components/ds/Button';
import { Card } from '@/components/ds/Card';
import { Checkbox } from '@/components/ds/Checkbox';
import { Chip } from '@/components/ds/Chip';
import { Input } from '@/components/ds/Input';
import { Pagination } from '@/components/ds/Pagination';
import { RadioButton } from '@/components/ds/RadioButton';
import { EmptyState } from '@/components/ds/EmptyState';
import { Slider } from '@/components/ds/Slider';
import { Switch } from '@/components/ds/Switch';
import { sys } from '@/components/ds/tokens';

const { colorRoles: cr, dimensions: dim, typeScale: ts } = sys;

// ─── Section heading ─────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={sectionStyles.root}>
      <Text style={sectionStyles.title}>{title}</Text>
      <View style={sectionStyles.divider} />
      {children}
    </View>
  );
}

const sectionStyles = StyleSheet.create({
  root: { gap: 12 },
  title: {
    fontSize: ts.labelSmall.sysFontSize,
    lineHeight: ts.labelSmall.sysLineHeight,
    fontWeight: '600',
    letterSpacing: ts.labelSmall.sysTracking,
    color: cr.surface.surface.sysOnSurfaceVariant,
    textTransform: 'uppercase',
  },
  divider: {
    height: dim.borderWidth.sysStrokeThin,
    backgroundColor: cr.outline.sysOutline,
  },
});

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function DesignSystemScreen() {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [checked3, setChecked3] = useState<boolean | 'indeterminate'>('indeterminate');

  const [radio1, setRadio1] = useState(false);
  const [radio2, setRadio2] = useState(true);
  const [radio3, setRadio3] = useState(false);

  const [inputValue, setInputValue] = useState('');
  const [inputFilled, setInputFilled] = useState('Filled value');

  const [pageLg, setPageLg] = useState(3);
  const [pageSm, setPageSm] = useState(1);

  const [sw1, setSw1] = useState(false);
  const [sw2, setSw2] = useState(true);

  const [sliderVal, setSliderVal] = useState(25);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: cr.surface.surface.sysSurface }}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <View style={styles.header}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>DS</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>ComPsych Design System</Text>
            <Text style={styles.headerSub}>@javierkonpo/design-system · compsych-gro</Text>
          </View>
        </View>

        {/* ── Buttons ────────────────────────────────────────────────────────── */}
        <Section title="Button">
          <View style={styles.row}>
            <Button variant="filled" label="Filled" />
            <Button variant="tonal" label="Tonal" />
            <Button variant="outlined" label="Outlined" />
          </View>
          <View style={styles.row}>
            <Button variant="elevated" label="Elevated" />
            <Button variant="text" label="Text" />
            <Button variant="danger" label="Danger" />
          </View>
          <View style={styles.row}>
            <Button variant="danger-outlined" label="Danger outlined" />
            <Button variant="filled" label="Disabled" disabled />
            <Button variant="filled" label="Loading" loading />
          </View>
          <View style={styles.row}>
            <Button variant="filled" size="sm" label="Small" />
            <Button variant="filled" size="md" label="Medium" />
            <Button variant="filled" size="lg" label="Large" />
            <Button variant="filled" size="xl" label="XL" />
          </View>
          <Button variant="filled" label="Full width" fullWidth />
        </Section>

        {/* ── Divider ────────────────────────────────────────────────────────── */}
        <Section title="Divider">
          {/* Horizontal — thin solid */}
          <Divider />

          {/* Horizontal — thick solid */}
          <Divider weight="thick" />

          {/* Horizontal — thin dashed */}
          <Divider dashed />

          {/* Horizontal — thick dashed */}
          <Divider weight="thick" dashed />

          {/* Vertical dividers side-by-side */}
          <View style={{ flexDirection: 'row', height: 48, gap: 16, alignItems: 'center' }}>
            <Divider variant="vertical" />
            <Divider variant="vertical" weight="thick" />
            <Divider variant="vertical" dashed />
            <Divider variant="vertical" weight="thick" dashed />
          </View>
        </Section>

        {/* ── Tooltip ────────────────────────────────────────────────────────── */}
        <Section title="Tooltip">
          {/* Filled — all directions */}
          <View style={[styles.row, { alignItems: 'center', flexWrap: 'wrap' }]}>
            <Tooltip text="No arrow" variant="filled" direction="none" />
            <Tooltip text="Bottom" variant="filled" direction="bottom" />
            <Tooltip text="Top" variant="filled" direction="top" />
            <Tooltip text="Left" variant="filled" direction="left" />
            <Tooltip text="Right" variant="filled" direction="right" />
          </View>

          {/* Elevated — all directions */}
          <View style={[styles.row, { alignItems: 'center', flexWrap: 'wrap' }]}>
            <Tooltip text="No arrow" variant="elevated" direction="none" />
            <Tooltip text="Bottom" variant="elevated" direction="bottom" />
            <Tooltip text="Top" variant="elevated" direction="top" />
            <Tooltip text="Left" variant="elevated" direction="left" />
            <Tooltip text="Right" variant="elevated" direction="right" />
          </View>

          {/* Longer label */}
          <View style={[styles.row, { alignItems: 'flex-end' }]}>
            <Tooltip text="Copy to clipboard" variant="filled" direction="bottom" />
            <Tooltip text="More options available" variant="elevated" direction="top" />
          </View>
        </Section>

        {/* ── Alert ──────────────────────────────────────────────────────────── */}
        <Section title="Alert">
          {/* Large — all variants */}
          <Alert
            variant="default"
            title="Default"
            description="This is a default alert with an optional action."
            actionLabel="Action"
          />
          <Alert
            variant="elevated"
            title="Elevated"
            description="Elevated alert sits on a white card with a subtle shadow."
            actionLabel="Action"
          />
          <Alert
            variant="informative"
            title="Informative"
            description="Here's something you should know about your account."
            actionLabel="Learn more"
          />
          <Alert
            variant="warning"
            title="Warning"
            description="Your session will expire in 5 minutes."
            actionLabel="Extend"
          />
          <Alert
            variant="positive"
            title="Success"
            description="Your changes have been saved successfully."
          />
          <Alert
            variant="danger"
            title="Error"
            description="We couldn't process your request. Please try again."
            actionLabel="Retry"
          />

          {/* Small — compact inline variants */}
          <Alert variant="default" size="sm" description="Default small alert." actionLabel="Action" />
          <Alert variant="informative" size="sm" description="Your report is ready to download." actionLabel="Download" />
          <Alert variant="warning" size="sm" description="Low storage space remaining." />
          <Alert variant="danger" size="sm" description="Authentication failed." actionLabel="Retry" />

          {/* Dismissible */}
          <Alert
            variant="informative"
            title="Dismissible"
            description="Tap × to dismiss this alert."
            dismissible
          />
        </Section>

        {/* ── Badges ─────────────────────────────────────────────────────────── */}
        <Section title="Badge">
          {/* All styles — lg */}
          <View style={[styles.row, { alignItems: 'center' }]}>
            <Badge badgeStyle="filled" size="lg" label={2} />
            <Badge badgeStyle="positive" size="lg" label={2} />
            <Badge badgeStyle="danger" size="lg" label={2} />
            <Badge badgeStyle="elevated" size="lg" label={2} />
            <Badge badgeStyle="tonal" size="lg" label={2} />
            <Badge badgeStyle="dot" size="lg" />
          </View>

          {/* Sizes — filled */}
          <View style={[styles.row, { alignItems: 'center' }]}>
            <Badge badgeStyle="filled" size="sm" label={2} />
            <Badge badgeStyle="filled" size="md" label={2} />
            <Badge badgeStyle="filled" size="lg" label={2} />
          </View>

          {/* Wide labels */}
          <View style={[styles.row, { alignItems: 'center' }]}>
            <Badge badgeStyle="filled" size="lg" label={9} />
            <Badge badgeStyle="filled" size="lg" label={99} />
            <Badge badgeStyle="danger" size="lg" label="99+" />
            <Badge badgeStyle="tonal" size="lg" label={12} />
          </View>

          {/* Dots — all sizes */}
          <View style={[styles.row, { alignItems: 'center' }]}>
            <Badge badgeStyle="dot" size="sm" />
            <Badge badgeStyle="dot" size="md" />
            <Badge badgeStyle="dot" size="lg" />
          </View>
        </Section>

        {/* ── Chips ──────────────────────────────────────────────────────────── */}
        <Section title="Chip">
          {/* Sizes — neutral */}
          <View style={styles.row}>
            <Chip size="sm" label="Small" />
            <Chip size="md" label="Medium" />
            <Chip size="lg" label="Large" />
            <Chip size="xl" label="XL" />
          </View>

          {/* Usage variants */}
          <View style={styles.row}>
            <Chip usage="neutral" label="Neutral" />
            <Chip usage="informative" label="Informative" />
            <Chip usage="positive" label="Positive" />
            <Chip usage="danger" label="Danger" />
            <Chip usage="warning" label="Warning" />
          </View>

          {/* With badge */}
          <View style={styles.row}>
            <Chip usage="neutral" label="Messages" badge={3} />
            <Chip usage="informative" label="Alerts" badge={12} />
            <Chip usage="positive" label="Done" badge={5} />
            <Chip usage="danger" label="Errors" badge={2} />
          </View>

          {/* Dismissible */}
          <View style={styles.row}>
            <Chip usage="neutral" size="lg" label="Dismissible" dismissible />
            <Chip usage="informative" size="lg" label="Dismissible" dismissible />
            <Chip usage="warning" size="lg" label="Dismissible" dismissible />
          </View>
        </Section>

        {/* ── Cards ──────────────────────────────────────────────────────────── */}
        <Section title="Card">
          <Card variant="outlined" fullWidth>
            <Text style={cardContentStyles.eyebrow}>Outlined · Default</Text>
            <Text style={cardContentStyles.title}>Employee Assistance Program</Text>
            <Text style={cardContentStyles.body}>
              Confidential counseling and resources available 24/7 for you and your household.
            </Text>
            <View style={{ marginTop: 4 }}>
              <Button variant="tonal" size="sm" label="Learn more" />
            </View>
          </Card>

          <Card variant="filled" fullWidth>
            <Text style={[cardContentStyles.eyebrow, { color: cr.accent.primary.sysOnPrimaryContainerVariant }]}>
              Filled · Brand container
            </Text>
            <Text style={[cardContentStyles.title, { color: cr.accent.primary.sysOnPrimaryContainer }]}>
              GRO Guidance
            </Text>
            <Text style={[cardContentStyles.body, { color: cr.accent.primary.sysOnPrimaryContainerVariant }]}>
              Track your progress and unlock new tools as you grow.
            </Text>
          </Card>

          <Card variant="gradient" fullWidth>
            <Text style={cardContentStyles.eyebrow}>Gradient · Tinted surface</Text>
            <Text style={cardContentStyles.title}>Wellness Check-In</Text>
            <Text style={cardContentStyles.body}>
              A quick 2-minute reflection to start your week with intention.
            </Text>
          </Card>

          <View style={styles.row}>
            <Card variant="outlined" size="sm" interactive onPress={() => {}}>
              <Text style={[cardContentStyles.title, { fontSize: 14 }]}>Interactive</Text>
              <Text style={cardContentStyles.body}>Tap me</Text>
            </Card>
            <Card variant="outlined" size="sm" current>
              <Text style={[cardContentStyles.title, { fontSize: 14 }]}>Current</Text>
              <Text style={cardContentStyles.body}>Selected state</Text>
            </Card>
            <Card variant="outlined" size="sm" interactive disabled>
              <Text style={[cardContentStyles.title, { fontSize: 14 }]}>Disabled</Text>
              <Text style={cardContentStyles.body}>Muted</Text>
            </Card>
          </View>
        </Section>

        {/* ── Checkboxes ─────────────────────────────────────────────────────── */}
        <Section title="Checkbox">
          <Checkbox
            checked={checked1}
            onChange={setChecked1}
            label="Unchecked (tap to toggle)"
            description="Controlled checkbox — default unchecked"
          />
          <Checkbox
            checked={checked2}
            onChange={setChecked2}
            label="Checked (tap to toggle)"
          />
          <Checkbox
            checked={checked3}
            onChange={(v) => setChecked3(v)}
            label="Indeterminate → true on tap"
          />
          <Checkbox
            checked={true}
            label="Disabled checked"
            disabled
          />
          <Checkbox
            checked={false}
            label="Invalid / error state"
            description="This field is required"
            invalid
          />
          <View style={styles.row}>
            <Checkbox checked={false} size="sm" label="Small" />
            <Checkbox checked={true} size="md" label="Medium" />
          </View>
        </Section>

        {/* ── Radio Button ───────────────────────────────────────────────────── */}
        <Section title="Radio Button">
          <RadioButton
            checked={radio1}
            onChange={setRadio1}
            label="Unselected (tap to toggle)"
            description="Controlled radio — default unselected"
          />
          <RadioButton
            checked={radio2}
            onChange={setRadio2}
            label="Selected (tap to toggle)"
          />
          <RadioButton
            checked={radio3}
            onChange={setRadio3}
            label="With description"
            description="Extra context beneath the label"
          />
          <RadioButton
            checked={true}
            label="Disabled selected"
            disabled
          />
          <RadioButton
            checked={false}
            label="Invalid / error state"
            description="This field is required"
            invalid
          />
          <View style={styles.row}>
            <RadioButton checked={false} size="sm" label="Small" />
            <RadioButton checked={true} size="md" label="Medium" />
          </View>
        </Section>

        {/* ── Input ──────────────────────────────────────────────────────── */}
        <Section title="Input">
          {/* Three sizes */}
          <Input size="sm" placeholder="Small" value={inputValue} onChangeText={setInputValue} />
          <Input size="md" placeholder="Medium" value={inputValue} onChangeText={setInputValue} />
          <Input size="lg" placeholder="Large" value={inputValue} onChangeText={setInputValue} />

          {/* With label + helper */}
          <Input
            size="md"
            label="Email address"
            placeholder="you@example.com"
            helperText="We'll never share your email"
            value={inputValue}
            onChangeText={setInputValue}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Filled value */}
          <Input
            size="md"
            label="Full name"
            value={inputFilled}
            onChangeText={setInputFilled}
          />

          {/* Error state */}
          <Input
            size="md"
            label="Password"
            placeholder="Enter password"
            invalid
            errorText="Must be at least 8 characters"
            value=""
            secureTextEntry
          />

          {/* Disabled */}
          <Input
            size="md"
            label="Disabled field"
            placeholder="Not editable"
            editable={false}
            value=""
          />
        </Section>

        {/* ── Avatar ─────────────────────────────────────────────────────── */}
        <Section title="Avatar">
          {/* All 7 sizes — text variant */}
          <View style={[styles.row, { alignItems: 'center' }]}>
            <Avatar size="xs" initials="CP" />
            <Avatar size="sm" initials="CP" />
            <Avatar size="md" initials="CP" />
            <Avatar size="lg" initials="CP" />
            <Avatar size="xl" initials="CP" />
            <Avatar size="2xl" initials="CP" />
            <Avatar size="3xl" initials="CP" />
          </View>

          {/* Icon variant */}
          <View style={[styles.row, { alignItems: 'center' }]}>
            <Avatar variant="icon" size="xs" />
            <Avatar variant="icon" size="sm" />
            <Avatar variant="icon" size="md" />
            <Avatar variant="icon" size="lg" />
            <Avatar variant="icon" size="xl" />
          </View>

          {/* Activity ring */}
          <View style={[styles.row, { alignItems: 'center', paddingHorizontal: 4 }]}>
            <Avatar size="sm" initials="CP" activityRing />
            <Avatar size="md" initials="CP" activityRing />
            <Avatar size="lg" initials="CP" activityRing />
            <Avatar size="xl" initials="CP" activityRing />
            <Avatar size="2xl" initials="CP" activityRing />
          </View>

          {/* Presence badge */}
          <View style={[styles.row, { alignItems: 'center', paddingHorizontal: 4 }]}>
            <Avatar size="sm" initials="CP" presenceBadge />
            <Avatar size="md" initials="CP" presenceBadge />
            <Avatar size="lg" initials="CP" presenceBadge />
            <Avatar size="xl" initials="CP" presenceBadge />
            <Avatar size="2xl" initials="CP" presenceBadge />
          </View>

          {/* Ring + badge combined */}
          <View style={[styles.row, { alignItems: 'center', paddingHorizontal: 4 }]}>
            <Avatar size="md" initials="DB" activityRing presenceBadge />
            <Avatar variant="icon" size="lg" activityRing presenceBadge />
            <Avatar size="xl" initials="JK" activityRing presenceBadge />
          </View>
        </Section>

        {/* ── Breadcrumb ─────────────────────────────────────────────────────── */}
        <Section title="Breadcrumb">
          {/* Large — home + overflow pattern */}
          <Breadcrumb
            size="lg"
            items={[
              { isHome: true, onPress: () => {} },
              { label: 'Benefits', onPress: () => {} },
              { label: 'EAP', onPress: () => {} },
              { isOverflow: true, onPress: () => {} },
              { label: 'Resources', onPress: () => {} },
              { label: 'Counseling' },
            ]}
          />

          {/* Large — simple 3-level */}
          <Breadcrumb
            size="lg"
            items={[
              { isHome: true, onPress: () => {} },
              { label: 'Settings', onPress: () => {} },
              { label: 'Notifications' },
            ]}
          />

          {/* Small — mobile */}
          <Breadcrumb
            size="sm"
            items={[
              { isHome: true, onPress: () => {} },
              { label: 'Benefits', onPress: () => {} },
              { label: 'EAP', onPress: () => {} },
              { isOverflow: true, onPress: () => {} },
              { label: 'Counseling' },
            ]}
          />

          {/* Disabled item */}
          <Breadcrumb
            size="lg"
            items={[
              { isHome: true, onPress: () => {} },
              { label: 'Programs', disabled: true },
              { label: 'GRO' },
            ]}
          />
        </Section>

        {/* ── Progress ───────────────────────────────────────────────────────── */}
        <Section title="Progress">
          {/* Standalone bar — 0 / 25 / 50 / 75 / 100 */}
          <ProgressBar progress={0} />
          <ProgressBar progress={25} />
          <ProgressBar progress={50} />
          <ProgressBar progress={75} />
          <ProgressBar progress={100} />

          {/* Step tracker — large */}
          <ProgressTracker
            size="lg"
            steps={[
              { label: 'Personal Info', state: 'completed' },
              { label: 'Coverage', state: 'active' },
              { label: 'Review', state: 'pending' },
              { label: 'Confirm', state: 'pending' },
              { label: 'Done', state: 'pending' },
            ]}
          />

          {/* Step tracker — small */}
          <ProgressTracker
            size="sm"
            steps={[
              { label: 'Step 1', state: 'completed' },
              { label: 'Step 2', state: 'completed' },
              { label: 'Step 3', state: 'active' },
              { label: 'Step 4', state: 'pending' },
              { label: 'Step 5', state: 'pending' },
            ]}
          />

          {/* No labels */}
          <ProgressTracker
            size="lg"
            showLabels={false}
            steps={[
              { label: '', state: 'completed' },
              { label: '', state: 'completed' },
              { label: '', state: 'active' },
              { label: '', state: 'pending' },
            ]}
          />
        </Section>

        {/* ── Pagination ─────────────────────────────────────────────────────── */}
        <Section title="Pagination">
          {/* Large — pill container, current page 3 of 10 */}
          <Pagination
            size="lg"
            totalPages={10}
            currentPage={pageLg}
            onPageChange={setPageLg}
          />

          {/* Large — edge cases: first and last page */}
          <Pagination
            size="lg"
            totalPages={10}
            currentPage={1}
            onPageChange={() => {}}
          />
          <Pagination
            size="lg"
            totalPages={10}
            currentPage={10}
            onPageChange={() => {}}
          />

          {/* Small — bare items, no pill */}
          <Pagination
            size="sm"
            totalPages={8}
            currentPage={pageSm}
            onPageChange={setPageSm}
          />

          {/* Compact — prev/next only (mobile) */}
          <Pagination
            size="lg"
            totalPages={10}
            currentPage={pageLg}
            onPageChange={setPageLg}
            compact
          />
        </Section>

        {/* ── Switch ──────────────────────────────────────────────────────── */}
        <Section title="Switch">
          {/* Toggled off → on (interactive) */}
          <View style={styles.row}>
            <Switch value={sw1} onValueChange={setSw1} accessibilityLabel="Switch 1" />
            <Switch value={sw2} onValueChange={setSw2} accessibilityLabel="Switch 2" />
          </View>
          {/* Disabled states */}
          <View style={styles.row}>
            <Switch value={false} disabled accessibilityLabel="Disabled off" />
            <Switch value={true} disabled accessibilityLabel="Disabled on" />
          </View>
        </Section>

        {/* ── Slider ──────────────────────────────────────────────────────── */}
        <Section title="Slider">
          {/* Labeled, with min/max, interactive */}
          <Slider
            label="Volume"
            value={sliderVal}
            onValueChange={setSliderVal}
            accessibilityLabel="Volume slider"
          />

          {/* No label, step 10 */}
          <Slider
            defaultValue={50}
            min={0}
            max={100}
            step={10}
            showMinMax
            accessibilityLabel="Step slider"
          />

          {/* Disabled */}
          <Slider
            label="Disabled"
            value={40}
            disabled
            accessibilityLabel="Disabled slider"
          />
        </Section>

        {/* ── Empty State ─────────────────────────────────────────────────── */}
        <Section title="Empty State">
          {/* Icon style — mobile viewport */}
          <EmptyState
            style="icon"
            viewport="mobile"
            title="No results"
            description="Try adjusting your search or filters."
            actionLabel="Add item"
          />

          {/* Icon style — no description, no action */}
          <EmptyState
            style="icon"
            viewport="mobile"
            title="Nothing here yet"
            showDescription={false}
          />

          {/* Illustration style */}
          <EmptyState
            style="illustration"
            viewport="mobile"
            title="No results"
            description="Try adjusting your search or filters."
            actionLabel="Add item"
          />
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

const cardContentStyles = StyleSheet.create({
  eyebrow: {
    fontSize: ts.labelSmall.sysFontSize,
    lineHeight: ts.labelSmall.sysLineHeight,
    fontWeight: '600',
    color: cr.surface.surface.sysOnSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: ts.labelSmall.sysTracking,
  },
  title: {
    fontSize: ts.titleSmall.sysFontSize,
    lineHeight: ts.titleSmall.sysLineHeight,
    fontWeight: '600',
    color: cr.surface.surface.sysOnSurface,
  },
  body: {
    fontSize: ts.bodySmall.sysFontSize,
    lineHeight: ts.bodySmall.sysLineHeight,
    color: cr.surface.surface.sysOnSurfaceVariant,
  },
});

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: {
    padding: dim.spacing.padding.sysPadding24,
    gap: dim.spacing.spacer.sysSpacerLg,
    paddingBottom: 48,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: dim.spacing.padding.sysPadding16,
  },
  badge: {
    width: 44,
    height: 44,
    borderRadius: dim.borderRadius.sysRadiusSm,
    backgroundColor: cr.accent.primary.sysPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: cr.accent.primary.sysOnPrimary,
    fontSize: ts.labelMedium.sysFontSize,
    fontWeight: '700',
    letterSpacing: 1,
  },
  headerTitle: {
    fontSize: ts.titleSmall.sysFontSize,
    lineHeight: ts.titleSmall.sysLineHeight,
    fontWeight: '700',
    color: cr.surface.surface.sysOnSurface,
  },
  headerSub: {
    fontSize: ts.labelSmall.sysFontSize,
    lineHeight: ts.labelSmall.sysLineHeight,
    color: cr.surface.surface.sysOnSurfaceVariant,
    marginTop: 2,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: dim.spacing.padding.sysPadding8,
    alignItems: 'flex-start',
  },
});
