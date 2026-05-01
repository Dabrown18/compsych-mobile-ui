# ComPsych Design System — React Native Components

This document covers every component in `components/ds/`. All components are built on top of the ComPsych four-tier token system. The only tokens ever referenced in UI code are `sys.*` tokens — accessed via the shared `tokens.ts` bridge.

```ts
import { sys } from '@/components/ds/tokens';
const { colorRoles: cr, dimensions: dim, typeScale: ts } = sys;
```

---

## Table of Contents

1. [Alert](#alert)
2. [Avatar](#avatar)
3. [Badge](#badge)
4. [Breadcrumb](#breadcrumb)
5. [Button](#button)
6. [Card](#card)
7. [Checkbox](#checkbox)
8. [Chip](#chip)
9. [Divider](#divider)
10. [EmptyState](#emptystate)
11. [Input](#input)
12. [Pagination](#pagination)
13. [ProgressBar](#progressbar)
14. [ProgressTracker](#progresstracker)
15. [RadioButton](#radiobutton)
16. [Slider](#slider)
17. [Switch](#switch)
18. [Tooltip](#tooltip)

---

## Alert

Inline feedback message with optional title, icon, action button, and dismiss control.

### Import

```tsx
import { Alert } from '@/components/ds/Alert';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'elevated' \| 'informative' \| 'warning' \| 'positive' \| 'danger'` | `'default'` | Controls background color and icon |
| `size` | `'sm' \| 'lg'` | `'lg'` | `lg` shows a bold title and uses larger padding; `sm` is compact and inline |
| `description` | `string` | — | **Required.** Body text |
| `title` | `string` | — | Bold heading — rendered only when `size="lg"` |
| `icon` | `React.ReactNode` | — | Overrides the default per-variant icon |
| `hideIcon` | `boolean` | `false` | Removes the leading icon entirely |
| `actionLabel` | `string` | — | Label for the optional action button |
| `onAction` | `() => void` | — | Called when the action button is pressed |
| `dismissible` | `boolean` | `false` | Shows a × dismiss button |
| `onDismiss` | `() => void` | — | Called when the dismiss button is pressed |

### Variants

| Variant | Background | Use when |
|---------|-----------|----------|
| `default` | `sysSurfaceContainerLow` | Neutral, non-urgent information |
| `elevated` | `sysSurfaceContainerLowest` + shadow | Floating / card context |
| `informative` | `sysInfoContainer` | Tips, help, guidance |
| `warning` | `sysWarningContainer` | Recoverable issues |
| `positive` | `sysSuccessContainer` | Success confirmation |
| `danger` | `sysErrorContainer` | Errors, destructive states |

### Size differences

| | `lg` | `sm` |
|---|---|---|
| Title | Yes (`titleSmall`) | No |
| Body font | `bodyMedium` | `bodySmall` |
| Icon size | 24px | 20px |
| Padding H | 24px | 16px |
| Border radius | `sysRadiusLg` | `sysRadiusMd` |
| Action button | Elevated pill | Text-only |
| Dismiss button | Absolute top-right | Inline end |

### Usage

```tsx
// Basic
<Alert description="Your session will expire in 5 minutes." variant="warning" />

// With title and action
<Alert
  variant="informative"
  size="lg"
  title="New feature available"
  description="Update the app to access the latest tools."
  actionLabel="Update now"
  onAction={handleUpdate}
/>

// Dismissible
<Alert
  variant="danger"
  description="Failed to save changes."
  dismissible
  onDismiss={() => setVisible(false)}
/>
```

---

## Avatar

Circular user representation — text initials, image, or icon.

### Import

```tsx
import { Avatar } from '@/components/ds/Avatar';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'text' \| 'image' \| 'icon'` | `'text'` | How the avatar content is rendered |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl'` | `'md'` | Circle diameter |
| `initials` | `string` | — | Up to 2 characters (text variant) |
| `source` | `ImageSourcePropType` | — | Image source (image variant) |
| `icon` | `React.ReactNode` | — | Custom icon node; defaults to `person` icon when omitted |
| `activityRing` | `boolean` | `false` | Renders a coloured ring around the circle |
| `presenceBadge` | `boolean` | `false` | Renders a shield-check badge at the bottom-right corner |

### Sizes

| Size | Diameter |
|------|---------|
| `xs` | 24px |
| `sm` | 32px |
| `md` | 40px |
| `lg` | 48px |
| `xl` | 56px |
| `2xl` | 80px |
| `3xl` | 96px |

### Usage

```tsx
<Avatar variant="text" initials="CP" size="md" />
<Avatar variant="image" source={{ uri: 'https://example.com/photo.jpg' }} size="lg" activityRing />
<Avatar variant="icon" size="sm" presenceBadge />
<Avatar variant="icon" icon={<Ionicons name="person" size={20} />} size="md" />
```

---

## Badge

Small status indicator rendered as a pill, dot, or count.

### Import

```tsx
import { Badge } from '@/components/ds/Badge';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `number \| string` | — | Text or count displayed inside the badge |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Controls diameter / font size |
| `badgeStyle` | `'filled' \| 'positive' \| 'danger' \| 'elevated' \| 'tonal' \| 'dot'` | `'filled'` | Color scheme and shape variant |

### Sizes

| Size | Diameter |
|------|---------|
| `sm` | 16px |
| `md` | 20px |
| `lg` | 24px |

### Styles

| Style | Background | Text | Notes |
|-------|-----------|------|-------|
| `filled` | `sysPrimary` | `sysOnPrimary` | Default — primary brand color |
| `positive` | `sysSuccess` | `sysOnSuccess` | Green confirmation |
| `danger` | `sysError` | `sysOnError` | Red alert |
| `elevated` | `sysSurfaceContainerLowest` | `sysOnSurface` | White with shadow |
| `tonal` | `sysPrimaryContainer` | `sysOnPrimaryContainer` | Muted primary |
| `dot` | transparent wrapper | — | Solid `sysPrimary` inner circle, no label |

### Usage

```tsx
<Badge label={5} />
<Badge label="New" badgeStyle="positive" size="lg" />
<Badge badgeStyle="dot" size="sm" />
<Badge label={99} badgeStyle="danger" />
```

---

## Breadcrumb

Horizontal scrollable navigation trail with `/` dividers.

### Import

```tsx
import { Breadcrumb } from '@/components/ds/Breadcrumb';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `BreadcrumbItem[]` | — | **Required.** Ordered list of crumb items |
| `size` | `'sm' \| 'lg'` | `'lg'` | Controls font size and vertical padding |

### BreadcrumbItem

| Field | Type | Description |
|-------|------|-------------|
| `label` | `string` | Display text |
| `isHome` | `boolean` | Renders a `home` icon instead of text |
| `isOverflow` | `boolean` | Renders `…` — use for collapsed middle crumbs |
| `disabled` | `boolean` | Reduces opacity; non-interactive |
| `onPress` | `() => void` | Press handler. Omit for the current (last) item — it renders non-interactively |

The **last item** in the array is always treated as the current page regardless of whether `onPress` is set. It renders in `sysOnSurface` at weight `500`; all other items render in `sysOnSurfaceVariant` at weight `400`.

### Usage

```tsx
<Breadcrumb
  items={[
    { isHome: true, onPress: () => navigate('/') },
    { label: 'Settings', onPress: () => navigate('/settings') },
    { label: 'Profile' },
  ]}
/>

// With overflow
<Breadcrumb
  size="sm"
  items={[
    { isHome: true, onPress: goHome },
    { isOverflow: true, onPress: expandCrumbs },
    { label: 'Current Page' },
  ]}
/>
```

---

## Button

Primary interaction element — supports 7 variants, 4 sizes, icons, loading state, and full-width layout.

### Import

```tsx
import { Button } from '@/components/ds/Button';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | **Required.** Button text |
| `variant` | `'filled' \| 'tonal' \| 'outlined' \| 'elevated' \| 'text' \| 'danger' \| 'danger-outlined'` | `'filled'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Height and padding |
| `disabled` | `boolean` | `false` | Disables interaction and reduces opacity |
| `loading` | `boolean` | `false` | Replaces label with an `ActivityIndicator` |
| `fullWidth` | `boolean` | `false` | Stretches to fill the parent container |
| `iconOnly` | `boolean` | `false` | Square layout — use with a single icon and a short/empty `label` |
| `leadingIcon` | `React.ReactNode` | — | Icon placed before the label |
| `trailingIcon` | `React.ReactNode` | — | Icon placed after the label |
| `onPress` | `() => void` | — | Press handler |
| *(+ all Pressable props)* | | | Except `children` and `style` |

### Variants

| Variant | Background | Text |
|---------|-----------|------|
| `filled` | `sysPrimary` | `sysOnPrimary` |
| `tonal` | `sysPrimaryFixedDim` | `sysOnPrimaryFixed` |
| `outlined` | transparent + `sysOutline` border | `sysPrimary` |
| `elevated` | `sysSurfaceContainerLowest` + shadow | `sysPrimary` |
| `text` | transparent | `sysPrimary` |
| `danger` | `sysError` | `sysOnError` |
| `danger-outlined` | transparent + `sysError` border | `sysError` |

### Sizes

| Size | Height | H Padding | Font |
|------|--------|-----------|------|
| `sm` | 32px | 16px | `labelSmall` |
| `md` | 40px | 24px | `labelMedium` |
| `lg` | 48px | 24px | `labelLarge` |
| `xl` | 56px | 32px | `labelLarge` |

### Usage

```tsx
<Button label="Save changes" onPress={handleSave} />
<Button label="Delete" variant="danger" leadingIcon={<Ionicons name="trash" size={16} />} />
<Button label="Loading..." loading />
<Button label="Learn more" variant="text" trailingIcon={<Ionicons name="chevron-forward" size={16} />} />
<Button label="Search" iconOnly variant="outlined" leadingIcon={<Ionicons name="search" size={20} />} />
```

---

## Card

Surface container for grouped content — supports 3 visual variants and 4 padding sizes.

### Import

```tsx
import { Card } from '@/components/ds/Card';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'outlined' \| 'filled' \| 'gradient'` | `'outlined'` | Visual treatment |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Inner padding and gap |
| `interactive` | `boolean` | `false` | Wraps in a `Pressable` with press feedback |
| `disabled` | `boolean` | `false` | Reduces opacity; non-interactive |
| `current` | `boolean` | `false` | Applies `sysPrimary` border — indicates the selected/active card |
| `fullWidth` | `boolean` | `false` | Stretches to fill the parent |
| `onPress` | `() => void` | — | Press handler (only active when `interactive` is true) |
| `children` | `React.ReactNode` | — | Card content |
| `accessibilityLabel` | `string` | — | Screen-reader label |

### Variants

| Variant | Background | Border |
|---------|-----------|--------|
| `outlined` | `sysSurfaceContainerLowest` | `sysOutline` 1px |
| `filled` | `sysPrimaryContainer` | none, elevated shadow |
| `gradient` | `sysSurfaceContainerLowest` | `sysOutline` 1px |

### Sizes

| Size | Padding | Border Radius |
|------|---------|---------------|
| `sm` | 24px | `sysRadiusLg` |
| `md` | 32px | `sysRadiusLg` |
| `lg` | 32px | `sysRadiusLg` |
| `xl` | 48px | `sysRadiusXl` |

### Usage

```tsx
<Card>
  <Text>Basic card content</Text>
</Card>

<Card variant="filled" size="sm" interactive onPress={handlePress} current>
  <Text>Selected card</Text>
</Card>

<Card variant="outlined" fullWidth>
  <Text>Full-width card</Text>
</Card>
```

---

## Checkbox

Binary or indeterminate selection control — supports controlled and uncontrolled usage.

### Import

```tsx
import { Checkbox } from '@/components/ds/Checkbox';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean \| 'indeterminate'` | — | Controlled checked state |
| `defaultChecked` | `boolean` | `false` | Initial state for uncontrolled usage |
| `onValueChange` | `(value: boolean \| 'indeterminate') => void` | — | Called when the value changes |
| `size` | `'sm' \| 'md'` | `'md'` | Controls the hit area and box size |
| `disabled` | `boolean` | `false` | Disables interaction |
| `accessibilityLabel` | `string` | — | Screen-reader label |

### States

| State | Visual |
|-------|--------|
| Unchecked | Empty box, `sysOutline` border |
| Checked | `sysPrimary` fill, white checkmark |
| Indeterminate | `sysPrimary` fill, white dash |
| Disabled | `opacity: 0.48` on the entire control |
| Focused | `sysPrimary08` halo (4px padding wrapper) |

### Usage

```tsx
// Uncontrolled
<Checkbox defaultChecked={false} onValueChange={console.log} />

// Controlled
const [checked, setChecked] = useState(false);
<Checkbox checked={checked} onValueChange={setChecked} />

// Indeterminate
<Checkbox checked="indeterminate" onValueChange={handleChange} size="sm" />
```

---

## Chip

Compact label pill for status, category, or filter display — not interactive by default.

### Import

```tsx
import { Chip } from '@/components/ds/Chip';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | **Required.** Chip text |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Controls height and font |
| `usage` | `'neutral' \| 'informative' \| 'positive' \| 'danger' \| 'warning'` | `'neutral'` | Semantic color |
| `leadingIcon` | `React.ReactNode` | — | Icon before the label |
| `dismissible` | `boolean` | `false` | Shows a × button at the trailing end |
| `onDismiss` | `() => void` | — | Called when the × button is pressed |
| `badge` | `number \| string` | — | Count or short text shown at the trailing end |

### Sizes

| Size | Height | H Padding | Font |
|------|--------|-----------|------|
| `sm` | 20px | 8px | `labelSmall` |
| `md` | 24px | 8px | `labelSmall` |
| `lg` | 28px | 12px | `labelMedium` |
| `xl` | 32px | 16px | `labelMedium` |

### Usage

| Usage | Background | Text |
|-------|-----------|------|
| `neutral` | `sysSurfaceContainerLowest` + shadow | `sysOnSurface` |
| `informative` | `sysInfoContainer` | `sysOnInfoContainer` |
| `positive` | `sysSuccessContainer` | `sysOnSuccessContainer` |
| `danger` | `sysErrorContainer` | `sysOnErrorContainer` |
| `warning` | `sysWarningContainer` | `sysOnWarningContainer` |

### Usage

```tsx
<Chip label="In progress" usage="informative" />
<Chip label="Completed" usage="positive" size="lg" />
<Chip label="Overdue" usage="danger" dismissible onDismiss={handleDismiss} />
<Chip label="Category" badge={3} leadingIcon={<Ionicons name="folder" size={14} />} />
```

---

## Divider

Decorative separator line — horizontal or vertical.

### Import

```tsx
import { Divider } from '@/components/ds/Divider';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientation |
| `weight` | `'thin' \| 'thick'` | `'thin'` | Line thickness (`sysStrokeThin` = 1px, `sysStrokeThick` = 2px) |
| `dashed` | `boolean` | `false` | Renders a dashed line pattern |

The divider is always `accessible={false}` — it is a decorative element and should not appear in the accessibility tree.

**Layout:** A horizontal divider uses `alignSelf: 'stretch'` to fill its parent width at zero height (border-only). A vertical divider uses `alignSelf: 'stretch'` to fill its parent height at zero width.

### Usage

```tsx
// Between list items
<Divider />

// Vertical separator in a row
<View style={{ flexDirection: 'row', height: 40 }}>
  <Text>Left</Text>
  <Divider variant="vertical" />
  <Text>Right</Text>
</View>

// Dashed section break
<Divider weight="thick" dashed />
```

---

## EmptyState

Full-panel placeholder shown when a screen or list has no content.

### Import

```tsx
import { EmptyState } from '@/components/ds/EmptyState';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `style` | `'icon' \| 'illustration'` | `'icon'` | Graphic treatment above the text |
| `viewport` | `'desktop' \| 'mobile'` | `'mobile'` | Token set for type scale, icon size, and button sizing |
| `title` | `string` | `'No results'` | Heading text |
| `description` | `string` | `'Description if needed'` | Body copy |
| `showDescription` | `boolean` | `true` | Hides the description when `false` |
| `icon` | `React.ReactNode` | — | Custom icon inside the circle (`icon` style only). Defaults to `apps-outline` |
| `actionLabel` | `string` | — | Label for the action button. Button is shown only when this is provided |
| `onAction` | `() => void` | — | Called when the action button is pressed |
| `showAction` | `boolean` | — | Explicitly show or hide the action button regardless of `actionLabel` |

### Viewport token differences

| | `desktop` | `mobile` |
|---|---|---|
| Icon circle | 60px / 32px icon | 48px / 24px icon |
| Title | `titleMedium` (24px) | `labelLarge` (16px) |
| Description | `bodyMedium` (16px) | `bodySmall` (14px) |
| Content gap | 24px | 16px |
| Button height | 40px | 32px |
| Button font | `labelMedium` | `labelSmall` |

### Illustration style

The `illustration` style renders a pure-View card collage: a central card with a `sysPrimary` active border and three skeleton content lines, surrounded by six faded (`opacity: 0.48`) placeholder cards. No image assets are required.

### Usage

```tsx
// Simple icon empty state
<EmptyState
  title="No messages"
  description="When you receive messages they will appear here."
/>

// With custom icon and action
<EmptyState
  title="No results found"
  description="Try adjusting your search filters."
  icon={<Ionicons name="search-outline" size={24} />}
  actionLabel="Clear filters"
  onAction={clearFilters}
/>

// Illustration style
<EmptyState
  style="illustration"
  title="Nothing here yet"
  actionLabel="Add your first item"
  onAction={handleAdd}
/>

// Description-only (no action)
<EmptyState title="All caught up" showDescription={false} />
```

---

## Input

Single-line text field with label, helper/error text, and icon slots.

### Import

```tsx
import { Input } from '@/components/ds/Input';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Controls height, padding, and font |
| `label` | `string` | — | Floating label above the field |
| `helperText` | `string` | — | Subdued hint text below the field |
| `errorText` | `string` | — | Error message shown below the field (replaces `helperText`) |
| `invalid` | `boolean` | `false` | Applies error styling (red border + error color) |
| `leadingIcon` | `React.ReactNode` | — | Icon at the leading edge inside the field |
| `trailingIcon` | `React.ReactNode` | — | Icon at the trailing edge inside the field |
| *(+ all TextInput props)* | | | Except `style` |

### Sizes

| Size | Height | H Padding | Font |
|------|--------|-----------|------|
| `sm` | 40px | 12px | `bodySmall` |
| `md` | 48px | 16px | `bodyMedium` |
| `lg` | 56px | 20px | `bodyMedium` |

### States

| State | Border | Notes |
|-------|--------|-------|
| Default | `sysOutlineVariant` 1px | Resting |
| Focused | `sysPrimary` 1.5px + 4px `sysPrimary08` halo | Focus ring via padding wrapper |
| Invalid | `sysError` 1.5px | Triggered by `invalid` prop |
| Filled | `sysOutline` 1px | When value is non-empty |
| Disabled | `opacity: 0.48` | Set via `editable={false}` |

### Usage

```tsx
// Basic
<Input label="Email" placeholder="you@example.com" />

// With helper text
<Input
  label="Password"
  secureTextEntry
  helperText="Must be at least 8 characters"
/>

// Error state
<Input
  label="Username"
  value={username}
  onChangeText={setUsername}
  invalid={!!errors.username}
  errorText={errors.username}
/>

// With icons
<Input
  label="Search"
  leadingIcon={<Ionicons name="search" size={20} />}
  trailingIcon={<Ionicons name="close" size={20} />}
  size="lg"
/>
```

---

## Pagination

Page navigation control — numbered with truncation, or compact prev/next for mobile.

### Import

```tsx
import { Pagination } from '@/components/ds/Pagination';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `totalPages` | `number` | — | **Required.** Total number of pages |
| `currentPage` | `number` | — | **Required.** Active page (1-based) |
| `onPageChange` | `(page: number) => void` | — | **Required.** Called on page selection |
| `size` | `'sm' \| 'lg'` | `'lg'` | `lg` renders items inside a pill container; `sm` is bare |
| `siblingCount` | `number` | `1` | Number of page buttons shown on each side of the active page before truncating with `…` |
| `compact` | `boolean` | `false` | Renders only prev/next arrows — no page numbers. Ideal for narrow mobile layouts |

### Truncation logic

The component builds a smart page range: it always shows the first and last pages, the current page and its siblings, and fills gaps with `…` ellipsis items. With `siblingCount=1` and 10 pages at page 5, the sequence renders as: `1 … 4 5 6 … 10`.

### Usage

```tsx
const [page, setPage] = useState(1);

// Standard
<Pagination totalPages={12} currentPage={page} onPageChange={setPage} />

// Small, no pill
<Pagination size="sm" totalPages={8} currentPage={page} onPageChange={setPage} />

// Compact (mobile)
<Pagination compact totalPages={20} currentPage={page} onPageChange={setPage} />

// Wider window
<Pagination totalPages={10} currentPage={page} onPageChange={setPage} siblingCount={2} />
```

---

## ProgressBar

Thin horizontal track showing a percentage value.

### Import

```tsx
import { ProgressBar } from '@/components/ds/ProgressTracker';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `progress` | `number` | — | **Required.** Value from 0 to 100 |

The value is clamped to `[0, 100]`. The fill color is `sysSuccess`; the track is `sysSurfaceContainerHighest`.

### Usage

```tsx
<ProgressBar progress={65} />
<ProgressBar progress={100} />
```

---

## ProgressTracker

Multi-step progress indicator with labelled steps and per-step progress bars.

### Import

```tsx
import { ProgressTracker } from '@/components/ds/ProgressTracker';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `steps` | `TrackerStep[]` | — | **Required.** Ordered array of step descriptors |
| `size` | `'sm' \| 'lg'` | `'lg'` | Label font size |
| `showLabels` | `boolean` | `true` | Whether to render step labels below the bars |

### TrackerStep

| Field | Type | Description |
|-------|------|-------------|
| `label` | `string` | Step display name |
| `state` | `'completed' \| 'active' \| 'pending'` | Determines fill percentage |

| State | Fill |
|-------|------|
| `completed` | 100% |
| `active` | 25% (in-progress indicator) |
| `pending` | 0% |

### Usage

```tsx
<ProgressTracker
  steps={[
    { label: 'Personal info', state: 'completed' },
    { label: 'Address', state: 'completed' },
    { label: 'Review', state: 'active' },
    { label: 'Submit', state: 'pending' },
  ]}
/>

// Small, no labels
<ProgressTracker
  size="sm"
  showLabels={false}
  steps={[
    { label: 'Step 1', state: 'completed' },
    { label: 'Step 2', state: 'active' },
    { label: 'Step 3', state: 'pending' },
  ]}
/>
```

---

## RadioButton

Single-selection control — use within a group where only one option can be selected at a time.

### Import

```tsx
import { RadioButton } from '@/components/ds/RadioButton';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selected` | `boolean` | — | Controlled selected state |
| `defaultSelected` | `boolean` | `false` | Initial state for uncontrolled usage |
| `onValueChange` | `(value: boolean) => void` | — | Called when the value changes |
| `size` | `'sm' \| 'md'` | `'md'` | Controls the hit area and ring size |
| `disabled` | `boolean` | `false` | Disables interaction |
| `accessibilityLabel` | `string` | — | Screen-reader label |

### States

| State | Visual |
|-------|--------|
| Unselected | Empty ring, `sysOutline` border |
| Selected | `sysPrimary` outer ring + filled inner dot |
| Disabled | `opacity: 0.48` |
| Focused | `sysPrimary08` halo (4px padding wrapper) |

### Usage

```tsx
// Controlled group
const [selected, setSelected] = useState<string>('a');

<RadioButton selected={selected === 'a'} onValueChange={() => setSelected('a')} accessibilityLabel="Option A" />
<RadioButton selected={selected === 'b'} onValueChange={() => setSelected('b')} accessibilityLabel="Option B" />
<RadioButton selected={selected === 'c'} onValueChange={() => setSelected('c')} disabled />
```

---

## Slider

Continuous value selector with draggable thumb.

### Import

```tsx
import { Slider } from '@/components/ds/Slider';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | — | Controlled value |
| `defaultValue` | `number` | `min` | Initial value for uncontrolled usage |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `step` | `number` | `1` | Snapping interval |
| `onValueChange` | `(value: number) => void` | — | Called continuously while dragging |
| `onSlidingComplete` | `(value: number) => void` | — | Called once when the user releases the thumb |
| `label` | `string` | — | Label rendered above the track |
| `showMinMax` | `boolean` | `true` | Renders min/max value labels on either side of the track |
| `disabled` | `boolean` | `false` | Disables interaction and applies `opacity: 0.48` to the track row |
| `accessibilityLabel` | `string` | — | Screen-reader label |

### Structure

The track area is 48px tall (providing a comfortable touch target). The 8px track bar and 24px thumb are vertically centred inside it. Tapping anywhere on the track jumps the thumb to that position; dragging moves it continuously. The parent `ScrollView` cannot steal the gesture once dragging has started.

### States

| State | Visual |
|-------|--------|
| Enabled | lv1 shadow on thumb |
| Pressed | lv3 shadow on thumb |
| Focused | 26×26 focus ring (`sysOnPrimaryFixedVariant`, 1.5px) |
| Disabled | slider row `opacity: 0.48`, label stays full opacity |

### Accessibility

Rendered with `accessibilityRole="adjustable"`. Screen readers can use the `increment` and `decrement` accessibility actions to step the value by `step`.

### Usage

```tsx
// Controlled
const [volume, setVolume] = useState(50);
<Slider label="Volume" value={volume} onValueChange={setVolume} />

// Uncontrolled with step
<Slider defaultValue={0} min={0} max={100} step={10} showMinMax />

// On release only
<Slider onSlidingComplete={(v) => savePreference('brightness', v)} />

// Disabled
<Slider value={40} disabled label="Locked setting" />
```

---

## Switch

Binary toggle control with animated thumb slide.

### Import

```tsx
import { Switch } from '@/components/ds/Switch';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `boolean` | — | Controlled value |
| `defaultValue` | `boolean` | `false` | Initial value for uncontrolled usage |
| `onValueChange` | `(value: boolean) => void` | — | Called when the user toggles the switch |
| `disabled` | `boolean` | `false` | Disables interaction |
| `accessibilityLabel` | `string` | — | Screen-reader label |

### Anatomy

| Part | Spec |
|------|------|
| Track | 56×32px, `borderRadius: 9999` |
| Thumb | 24×24px circle, 4px inset from track edge |
| Animation | 150ms timing on thumb `translateX` and track background color |

### Colors

| State | Track | Thumb |
|-------|-------|-------|
| Off | `sysSurfaceContainerHighest` | `sysSurface` |
| On | `sysPrimary` | `sysOnPrimary` |
| Disabled | either color at `opacity: 0.48` | at `opacity: 0.64` |
| Focused | focus ring (`sysOnPrimaryFixedVariant`, 1.5px, 1px outside track) | — |

### Usage

```tsx
// Controlled
const [enabled, setEnabled] = useState(false);
<Switch value={enabled} onValueChange={setEnabled} accessibilityLabel="Notifications" />

// Uncontrolled
<Switch defaultValue={true} onValueChange={handleChange} />

// Disabled
<Switch value={false} disabled />
<Switch value={true} disabled />
```

---

## Tooltip

Short contextual label attached to a target — positioned with a directional arrow.

### Import

```tsx
import { Tooltip } from '@/components/ds/Tooltip';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | — | **Required.** Tooltip content |
| `variant` | `'filled' \| 'elevated'` | `'filled'` | Visual style |
| `direction` | `'none' \| 'top' \| 'bottom' \| 'left' \| 'right'` | `'none'` | Which direction the arrow points (i.e. where the target is relative to the bubble) |

### Variants

| Variant | Background | Text | Border | Shadow |
|---------|-----------|------|--------|--------|
| `filled` | `sysInverseSurface` (dark) | `sysInverseOnSurface` (light) | none | none |
| `elevated` | `sysSurfaceContainerLowest` (white) | `sysOnSurface` | `sysOutline` 1px | lv1 |

### Arrow directions

The `direction` prop describes **where the target is** relative to the bubble:

| Direction | Bubble position | Arrow |
|-----------|----------------|-------|
| `none` | Standalone bubble | No arrow |
| `bottom` | Target is below | Arrow points down, rendered beneath bubble |
| `top` | Target is above | Arrow points up, rendered above bubble |
| `left` | Target is to the left | Arrow points left, rendered to the left of bubble |
| `right` | Target is to the right | Arrow points right, rendered to the right of bubble |

The arrow is a 16×6px CSS triangle (zero-size `View` with the `borderWidth` trick).

### Usage

```tsx
// Dark bubble, no arrow
<Tooltip text="More options" />

// Light elevated bubble pointing down at a button below it
<Tooltip text="Save your work" variant="elevated" direction="bottom" />

// Pointing left at a sidebar item
<Tooltip text="Home" variant="filled" direction="left" />
```

---

## Token reference

All components consume `sys.*` tokens exclusively. The three token namespaces accessed in components are:

```ts
const { colorRoles: cr, dimensions: dim, typeScale: ts } = sys;
```

### colorRoles (`cr`)

| Path | Description |
|------|-------------|
| `cr.accent.primary.sysPrimary` | Brand primary (blue) |
| `cr.accent.primary.sysOnPrimary` | Text/icons on primary |
| `cr.accent.primary.sysPrimaryContainer` | Muted primary surface |
| `cr.accent.primary.sysOnPrimaryContainer` | Text on primary container |
| `cr.addOn.primaryFixed.sysPrimaryFixedDim` | Tonal button background |
| `cr.addOn.primaryFixed.sysOnPrimaryFixed` | Tonal button text |
| `cr.addOn.primaryFixed.sysOnPrimaryFixedVariant` | Focus ring color |
| `cr.surface.surface.sysSurface` | App background / white |
| `cr.surface.surface.sysOnSurface` | Primary text |
| `cr.surface.surface.sysOnSurfaceVariant` | Secondary / subdued text |
| `cr.surface.surfaceContainer.*` | Container backgrounds (low→highest) |
| `cr.surface.inverse.sysInverseSurface` | Dark surface (tooltip filled bg) |
| `cr.surface.inverse.sysInverseOnSurface` | Text on dark surface |
| `cr.outline.sysOutline` | Interactive borders |
| `cr.outline.sysOutlineVariant` | Decorative separators |
| `cr.error.sysError` | Error red |
| `cr.error.sysOnError` | Text on error |
| `cr.error.sysErrorContainer` | Error container background |
| `cr.error.sysOnErrorContainer` | Text on error container |
| `cr.transparent.neutral.sysPrimary08` | Primary at 8% opacity (focus halo) |
| `cr.transparent.neutral.sysBlack10` | Black at 10% (pressed overlay) |
| `cr.custom.info.*` | Info (blue tint) container/text |
| `cr.custom.success.*` | Success (green) container/text |
| `cr.custom.warning.*` | Warning (amber) container/text |

### dimensions (`dim`)

| Path | Value | Description |
|------|-------|-------------|
| `dim.spacing.padding.sysPadding4` | 4 | Extra-tight |
| `dim.spacing.padding.sysPadding8` | 8 | Tight |
| `dim.spacing.padding.sysPadding12` | 12 | Compact |
| `dim.spacing.padding.sysPadding16` | 16 | Default |
| `dim.spacing.padding.sysPadding24` | 24 | Comfortable |
| `dim.spacing.padding.sysPadding32` | 32 | Spacious |
| `dim.spacing.padding.sysPadding48` | 48 | Extra spacious |
| `dim.borderRadius.sysRadiusSm` | 8 | Small corner |
| `dim.borderRadius.sysRadiusMd` | 12 | Medium corner |
| `dim.borderRadius.sysRadiusLg` | 16 | Large corner |
| `dim.borderRadius.sysRadiusXl` | 24 | Extra large corner |
| `dim.borderWidth.sysStrokeThin` | 1 | Standard border |
| `dim.borderWidth.sysStrokeMedium` | 1.5 | Emphasis border |
| `dim.borderWidth.sysStrokeThick` | 2 | Heavy border |

### typeScale (`ts`)

| Path | Size | Line height | Use |
|------|------|------------|-----|
| `ts.titleMedium.*` | 24px | 31px | Empty state heading (desktop) |
| `ts.titleSmall.*` | 20px | 26px | Card titles, alert title |
| `ts.labelLarge.*` | 16px | 22px | Empty state heading (mobile) |
| `ts.labelMedium.*` | 14px | 20px | Button labels, input |
| `ts.labelSmall.*` | 12px | 18px | Small labels, breadcrumb sm |
| `ts.bodyMedium.*` | 16px | 24px | Input values, alert body lg |
| `ts.bodySmall.*` | 14px | 20px | Helper text, compact body |
