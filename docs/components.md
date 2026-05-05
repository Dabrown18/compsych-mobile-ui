# ComPsych Design System — React Native Components

All components live in `components/ds/` and are built exclusively on `sys.*` tokens from the ComPsych four-tier token system.

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

`Version: 1.0.0`

Inline feedback banner used to communicate status, warnings, errors, or success messages. Supports an optional title, leading icon, action button, and dismiss control.

**Import**

```tsx
import { Alert } from '@/components/ds/Alert';
```

**Component File:** `components/ds/Alert.tsx`

---

### Usage

#### Variants

There are six alert variants covering the full range of feedback contexts.

```tsx
<Alert variant="default"      description="Neutral information message." />
<Alert variant="elevated"     description="Floating card context." />
<Alert variant="informative"  description="Tips, help, or guidance." />
<Alert variant="warning"      description="Recoverable issue." />
<Alert variant="positive"     description="Action completed successfully." />
<Alert variant="danger"       description="Error or destructive state." />
```

#### Sizes

Alert can be large (with a bold title) or small (compact inline).

```tsx
<Alert size="lg" variant="informative" title="New feature" description="Update the app to access the latest tools." />
<Alert size="sm" variant="warning" description="Your session expires soon." />
```

#### With Action

An optional action button can be added to prompt the user to take a next step.

```tsx
<Alert
  variant="informative"
  title="New feature available"
  description="Update the app to access the latest tools."
  actionLabel="Update now"
  onAction={handleUpdate}
/>
```

#### Dismissible

Add a dismiss button by setting `dismissible` to `true`.

```tsx
<Alert
  variant="danger"
  description="Failed to save changes."
  dismissible
  onDismiss={() => setVisible(false)}
/>
```

#### Without Icon

The leading icon can be removed entirely.

```tsx
<Alert variant="warning" description="Check your connection." hideIcon />
```

---

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'elevated' \| 'informative' \| 'warning' \| 'positive' \| 'danger'` | `'default'` | Controls background color and icon |
| `size` | `'sm' \| 'lg'` | `'lg'` | `lg` shows a bold title and uses larger padding; `sm` is compact |
| `description` | `string` | — | **Required.** Body text |
| `title` | `string` | — | Bold heading — rendered only when `size="lg"` |
| `icon` | `React.ReactNode` | — | Overrides the default per-variant icon |
| `hideIcon` | `boolean` | `false` | Removes the leading icon entirely |
| `actionLabel` | `string` | — | Label for the optional action button |
| `onAction` | `() => void` | — | Called when the action button is pressed |
| `dismissible` | `boolean` | `false` | Shows a × dismiss button |
| `onDismiss` | `() => void` | — | Called when the dismiss button is pressed |

---

## Avatar

`Version: 1.0.0`

Circular user representation that can display text initials, a photo, or an icon. An optional presence badge and activity ring indicate user status.

**Import**

```tsx
import { Avatar } from '@/components/ds/Avatar';
```

**Component File:** `components/ds/Avatar.tsx`

---

### Usage

#### Sizes

Avatar can be rendered in seven sizes ranging from extra-small to triple-extra-large.

```tsx
<Avatar variant="text" initials="CP" size="xs" />
<Avatar variant="text" initials="CP" size="sm" />
<Avatar variant="text" initials="CP" size="md" />
<Avatar variant="text" initials="CP" size="lg" />
<Avatar variant="text" initials="CP" size="xl" />
<Avatar variant="text" initials="CP" size="2xl" />
<Avatar variant="text" initials="CP" size="3xl" />
```

#### Image Avatar

Display a user's photo by providing an image source.

```tsx
<Avatar variant="image" source={{ uri: 'https://example.com/photo.jpg' }} size="md" />
<Avatar variant="image" source={{ uri: 'https://example.com/photo.jpg' }} size="lg" activityRing />
```

#### Letter Avatar

Render up to two initials when no photo is available.

```tsx
<Avatar variant="text" initials="JD" size="md" />
<Avatar variant="text" initials="AB" size="lg" />
```

#### With Presence Badge

Add a shield-check badge to indicate a verified or active status.

```tsx
<Avatar variant="text" initials="CP" size="lg" presenceBadge />
<Avatar variant="icon" size="md" presenceBadge />
```

---

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'text' \| 'image' \| 'icon'` | `'text'` | How the avatar content is rendered |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl'` | `'md'` | Circle diameter |
| `initials` | `string` | — | Up to 2 characters (text variant) |
| `source` | `ImageSourcePropType` | — | Image source (image variant) |
| `icon` | `React.ReactNode` | — | Custom icon node; defaults to `person` icon when omitted |
| `activityRing` | `boolean` | `false` | Renders a coloured ring around the circle |
| `presenceBadge` | `boolean` | `false` | Renders a shield-check badge at the bottom-right corner |

---

## Badge

`Version: 1.0.0`

Small status indicator rendered as a pill, dot, or count. Used to surface counts, status labels, or notification states on icons and list items.

**Import**

```tsx
import { Badge } from '@/components/ds/Badge';
```

**Component File:** `components/ds/Badge.tsx`

---

### Usage

#### Styles

Badge supports six visual styles covering neutral, semantic, and dot presentations.

```tsx
<Badge label={5}     badgeStyle="filled"   />
<Badge label="New"   badgeStyle="positive" />
<Badge label="99+"   badgeStyle="danger"   />
<Badge label={3}     badgeStyle="tonal"    />
<Badge label={1}     badgeStyle="elevated" />
<Badge               badgeStyle="dot"      />
```

#### Sizes

Badge can be rendered in three sizes.

```tsx
<Badge label={5} size="sm" />
<Badge label={5} size="md" />
<Badge label={5} size="lg" />
```

#### Dot Badge

Use the `dot` style to show a small status indicator without a label.

```tsx
<Badge badgeStyle="dot" size="sm" />
<Badge badgeStyle="dot" size="md" />
```

---

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `number \| string` | — | Text or count displayed inside the badge |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Controls diameter and font size |
| `badgeStyle` | `'filled' \| 'positive' \| 'danger' \| 'elevated' \| 'tonal' \| 'dot'` | `'filled'` | Color scheme and shape variant |

---

## Breadcrumb

`Version: 1.0.0`

Horizontal scrollable navigation trail that shows the user's location within the app hierarchy. Supports a home icon, overflow truncation, and two sizes.

**Import**

```tsx
import { Breadcrumb } from '@/components/ds/Breadcrumb';
```

**Component File:** `components/ds/Breadcrumb.tsx`

---

### Usage

#### Basic

Provide an ordered array of items. The last item is always treated as the current page.

```tsx
<Breadcrumb
  items={[
    { label: 'Home', onPress: () => navigate('/') },
    { label: 'Settings', onPress: () => navigate('/settings') },
    { label: 'Profile' },
  ]}
/>
```

#### With Home Icon

Use `isHome: true` on the first item to render a home icon instead of text.

```tsx
<Breadcrumb
  items={[
    { isHome: true, onPress: goHome },
    { label: 'Reports', onPress: goReports },
    { label: 'Q1 Summary' },
  ]}
/>
```

#### With Overflow

Use `isOverflow: true` to collapse middle crumbs into an ellipsis.

```tsx
<Breadcrumb
  items={[
    { isHome: true, onPress: goHome },
    { isOverflow: true, onPress: expandCrumbs },
    { label: 'Current Page' },
  ]}
/>
```

#### Sizes

Breadcrumb can be rendered in large (default) or small size.

```tsx
<Breadcrumb size="lg" items={[{ label: 'Home', onPress: goHome }, { label: 'Page' }]} />
<Breadcrumb size="sm" items={[{ label: 'Home', onPress: goHome }, { label: 'Page' }]} />
```

---

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `BreadcrumbItem[]` | — | **Required.** Ordered list of crumb items |
| `size` | `'sm' \| 'lg'` | `'lg'` | Controls font size and vertical padding |

**BreadcrumbItem**

| Name | Type | Description |
|------|------|-------------|
| `label` | `string` | Display text |
| `isHome` | `boolean` | Renders a home icon instead of text |
| `isOverflow` | `boolean` | Renders `…` for collapsed middle crumbs |
| `disabled` | `boolean` | Reduces opacity; non-interactive |
| `onPress` | `() => void` | Press handler. Omit for the current (last) item |

---

## Button

`Version: 1.0.0`

Buttons are touchable elements used to trigger actions. They support seven visual variants, four sizes, leading and trailing icons, a loading state, and full-width layout.

**Import**

```tsx
import { Button } from '@/components/ds/Button';
```

**Component File:** `components/ds/Button.tsx`

---

### Usage

#### Variants

There are filled, tonal, outlined, elevated, text, danger, and danger-outlined button types.

```tsx
<Button label="Filled"          variant="filled"          onPress={handlePress} />
<Button label="Tonal"           variant="tonal"           onPress={handlePress} />
<Button label="Outlined"        variant="outlined"        onPress={handlePress} />
<Button label="Elevated"        variant="elevated"        onPress={handlePress} />
<Button label="Text"            variant="text"            onPress={handlePress} />
<Button label="Danger"          variant="danger"          onPress={handlePress} />
<Button label="Danger Outlined" variant="danger-outlined" onPress={handlePress} />
```

#### Sizes

Button can be small, medium, large, or extra-large.

```tsx
<Button label="Small"       size="sm" onPress={handlePress} />
<Button label="Medium"      size="md" onPress={handlePress} />
<Button label="Large"       size="lg" onPress={handlePress} />
<Button label="Extra Large" size="xl" onPress={handlePress} />
```

#### Disabled

Disabled buttons reduce opacity and ignore press interactions.

```tsx
<Button label="Filled"   variant="filled"   disabled />
<Button label="Outlined" variant="outlined" disabled />
<Button label="Text"     variant="text"     disabled />
```

#### Icon Button

Can contain a leading or trailing icon, or be rendered as an icon-only square button.

```tsx
<Button
  label="Delete"
  variant="danger"
  leadingIcon={<Ionicons name="trash-outline" size={16} />}
  onPress={handleDelete}
/>
<Button
  label="Next"
  trailingIcon={<Ionicons name="chevron-forward" size={16} />}
  onPress={handleNext}
/>
<Button
  label=""
  iconOnly
  variant="outlined"
  leadingIcon={<Ionicons name="search" size={20} />}
  onPress={handleSearch}
/>
```

#### Loading

Use the `loading` prop to replace the label with an activity indicator while an async operation is in progress.

```tsx
<Button label="Saving…" loading />
<Button label="Saving…" loading variant="outlined" />
```

---

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | **Required.** Button text |
| `variant` | `'filled' \| 'tonal' \| 'outlined' \| 'elevated' \| 'text' \| 'danger' \| 'danger-outlined'` | `'filled'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Height and padding |
| `disabled` | `boolean` | `false` | Disables interaction and reduces opacity |
| `loading` | `boolean` | `false` | Replaces label with an `ActivityIndicator` |
| `fullWidth` | `boolean` | `false` | Stretches to fill the parent container |
| `iconOnly` | `boolean` | `false` | Square layout — use with a single icon |
| `leadingIcon` | `React.ReactNode` | — | Icon placed before the label |
| `trailingIcon` | `React.ReactNode` | — | Icon placed after the label |
| `onPress` | `() => void` | — | Press handler |

---

## Card

`Version: 1.0.0`

Surface container for grouping related content. Supports three visual variants, four padding sizes, interactive press states, and a current/selected highlight.

**Import**

```tsx
import { Card } from '@/components/ds/Card';
```

**Component File:** `components/ds/Card.tsx`

---

### Usage

#### Variants

There are outlined, filled, and gradient card types.

```tsx
<Card variant="outlined">
  <Text>Outlined card</Text>
</Card>

<Card variant="filled">
  <Text>Filled card — primary container background</Text>
</Card>

<Card variant="gradient">
  <Text>Gradient card</Text>
</Card>
```

#### Sizes

Card padding can be small, medium, large, or extra-large.

```tsx
<Card size="sm"><Text>Small padding</Text></Card>
<Card size="md"><Text>Medium padding</Text></Card>
<Card size="lg"><Text>Large padding</Text></Card>
<Card size="xl"><Text>Extra-large padding</Text></Card>
```

#### Interactive

Set `interactive` to enable press feedback. Use `onPress` to handle the action.

```tsx
<Card interactive onPress={handleCardPress}>
  <Text>Tap me</Text>
</Card>
```

#### Current State

The `current` prop applies a primary-colored border to indicate the selected or active card.

```tsx
<Card interactive current onPress={handlePress}>
  <Text>This card is selected</Text>
</Card>
```

---

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'outlined' \| 'filled' \| 'gradient'` | `'outlined'` | Visual treatment |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Inner padding and gap |
| `interactive` | `boolean` | `false` | Wraps in a `Pressable` with press feedback |
| `disabled` | `boolean` | `false` | Reduces opacity; non-interactive |
| `current` | `boolean` | `false` | Applies `sysPrimary` border — indicates the selected card |
| `fullWidth` | `boolean` | `false` | Stretches to fill the parent |
| `onPress` | `() => void` | — | Press handler (only active when `interactive` is `true`) |
| `children` | `React.ReactNode` | — | Card content |
| `accessibilityLabel` | `string` | — | Screen-reader label |

---

## Checkbox

`Version: 1.0.0`

Binary or indeterminate selection control with full support for controlled and uncontrolled usage. Accessible via screen reader increment/decrement actions.

**Import**

```tsx
import { Checkbox } from '@/components/ds/Checkbox';
```

**Component File:** `components/ds/Checkbox.tsx`

---

### Usage

#### Basic

Checkbox can be used in uncontrolled mode with a `defaultChecked` value.

```tsx
<Checkbox defaultChecked={false} onValueChange={console.log} />
<Checkbox defaultChecked={true}  onValueChange={console.log} />
```

#### Controlled

Use the `checked` prop together with `onValueChange` for controlled usage.

```tsx
const [checked, setChecked] = useState(false);

<Checkbox checked={checked} onValueChange={setChecked} />
```

#### Indeterminate

The indeterminate state is used when a parent checkbox represents a mix of checked and unchecked children.

```tsx
<Checkbox checked="indeterminate" onValueChange={handleChange} />
```

#### Sizes

Checkbox supports medium (default) and small sizes.

```tsx
<Checkbox size="md" defaultChecked />
<Checkbox size="sm" defaultChecked />
```

#### Disabled

Disabled checkboxes reduce opacity and ignore press interactions.

```tsx
<Checkbox disabled />
<Checkbox disabled defaultChecked />
```

---

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean \| 'indeterminate'` | — | Controlled checked state |
| `defaultChecked` | `boolean` | `false` | Initial state for uncontrolled usage |
| `onValueChange` | `(value: boolean \| 'indeterminate') => void` | — | Called when the value changes |
| `size` | `'sm' \| 'md'` | `'md'` | Controls hit area and box size |
| `disabled` | `boolean` | `false` | Disables interaction |
| `accessibilityLabel` | `string` | — | Screen-reader label |

---

## Chip

`Version: 1.0.0`

Compact label pill for displaying status, category, or filter values. Supports a leading icon, trailing dismiss button, and inline badge count.

**Import**

```tsx
import { Chip } from '@/components/ds/Chip';
```

**Component File:** `components/ds/Chip.tsx`

---

### Usage

#### Sizes

Chip can be rendered in four sizes.

```tsx
<Chip label="Small"       size="sm" />
<Chip label="Medium"      size="md" />
<Chip label="Large"       size="lg" />
<Chip label="Extra Large" size="xl" />
```

#### Colors

Chip supports neutral, informative, positive, danger, and warning semantic colors.

```tsx
<Chip label="Neutral"     usage="neutral"     />
<Chip label="Info"        usage="informative" />
<Chip label="Completed"   usage="positive"    />
<Chip label="Overdue"     usage="danger"      />
<Chip label="Pending"     usage="warning"     />
```

#### With Leading Icon

An icon can be placed before the label using the `leadingIcon` prop.

```tsx
<Chip
  label="Category"
  leadingIcon={<Ionicons name="folder-outline" size={14} />}
/>
```

#### Dismissible

Add a dismiss button at the trailing end using the `dismissible` prop.

```tsx
<Chip label="Filter" dismissible onDismiss={handleDismiss} />
```

#### With Badge

A count or short text can be appended at the trailing end using the `badge` prop.

```tsx
<Chip label="Messages" badge={5} />
<Chip label="Updates"  badge="New" usage="informative" />
```

---

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | **Required.** Chip text |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Controls height and font |
| `usage` | `'neutral' \| 'informative' \| 'positive' \| 'danger' \| 'warning'` | `'neutral'` | Semantic color |
| `leadingIcon` | `React.ReactNode` | — | Icon before the label |
| `dismissible` | `boolean` | `false` | Shows a × button at the trailing end |
| `onDismiss` | `() => void` | — | Called when the × button is pressed |
| `badge` | `number \| string` | — | Count or short text shown at the trailing end |

---

## Divider

`Version: 1.0.0`

Decorative separator line used to create visual hierarchy between sections or list items. Supports horizontal and vertical orientations, two weights, and a dashed style.

**Import**

```tsx
import { Divider } from '@/components/ds/Divider';
```

**Component File:** `components/ds/Divider.tsx`

---

### Usage

#### Horizontal

A horizontal divider stretches to fill its parent width and is the default orientation.

```tsx
<Divider />
<Divider weight="thick" />
```

#### Vertical

A vertical divider fills its parent height and is used as a separator inside a row layout.

```tsx
<View style={{ flexDirection: 'row', height: 40, alignItems: 'center' }}>
  <Text>Left</Text>
  <Divider variant="vertical" />
  <Text>Right</Text>
</View>
```

#### Dashed

The dashed style is used for section breaks or to indicate optional content areas.

```tsx
<Divider dashed />
<Divider weight="thick" dashed />
```

---

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientation |
| `weight` | `'thin' \| 'thick'` | `'thin'` | Line thickness (1px or 2px) |
| `dashed` | `boolean` | `false` | Renders a dashed line pattern |

> Dividers are always `accessible={false}` — they are decorative and do not appear in the accessibility tree.

---

## EmptyState

`Version: 1.0.0`

Full-panel placeholder shown when a screen or list has no content. Supports an icon circle or an illustrated card-collage graphic, optional description, and an action button.

**Import**

```tsx
import { EmptyState } from '@/components/ds/EmptyState';
```

**Component File:** `components/ds/EmptyState.tsx`

---

### Usage

#### Icon Style

The default style renders an icon inside a circular container above the title and description.

```tsx
<EmptyState
  title="No messages"
  description="When you receive messages they will appear here."
/>
```

#### Illustration Style

The `illustration` style renders a pure-View card collage — no image assets required.

```tsx
<EmptyState
  style="illustration"
  title="Nothing here yet"
  description="Get started by creating your first item."
/>
```

#### With Action

An optional action button prompts the user to take a next step.

```tsx
<EmptyState
  title="No results found"
  description="Try adjusting your search filters."
  icon={<Ionicons name="search-outline" size={24} />}
  actionLabel="Clear filters"
  onAction={clearFilters}
/>
```

#### Viewport

Use the `viewport` prop to switch between mobile and desktop token sets.

```tsx
<EmptyState viewport="mobile"  title="No results" />
<EmptyState viewport="desktop" title="No results" />
```

---

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `style` | `'icon' \| 'illustration'` | `'icon'` | Graphic treatment above the text |
| `viewport` | `'desktop' \| 'mobile'` | `'mobile'` | Token set for type scale, icon size, and button sizing |
| `title` | `string` | `'No results'` | Heading text |
| `description` | `string` | `'Description if needed'` | Body copy |
| `showDescription` | `boolean` | `true` | Hides the description when `false` |
| `icon` | `React.ReactNode` | — | Custom icon inside the circle (`icon` style only) |
| `actionLabel` | `string` | — | Label for the action button |
| `onAction` | `() => void` | — | Called when the action button is pressed |
| `showAction` | `boolean` | — | Explicitly show or hide the action button |

---

## Input

`Version: 1.0.0`

Single-line text field with a floating label, helper and error text, and leading and trailing icon slots. Built on top of React Native's `TextInput`.

**Import**

```tsx
import { Input } from '@/components/ds/Input';
```

**Component File:** `components/ds/Input.tsx`

---

### Usage

#### Basic

A simple text field with a floating label and placeholder.

```tsx
<Input label="Email" placeholder="you@example.com" />
```

#### Sizes

Input supports three sizes that control height, padding, and font scale.

```tsx
<Input size="sm" label="Small"  placeholder="Small field"  />
<Input size="md" label="Medium" placeholder="Medium field" />
<Input size="lg" label="Large"  placeholder="Large field"  />
```

#### With Helper Text

Use `helperText` to show a hint below the field.

```tsx
<Input
  label="Password"
  secureTextEntry
  helperText="Must be at least 8 characters."
/>
```

#### Error State

Use `invalid` and `errorText` to communicate a validation error.

```tsx
<Input
  label="Username"
  value={username}
  onChangeText={setUsername}
  invalid={!!errors.username}
  errorText={errors.username}
/>
```

#### With Icons

Leading and trailing icons can be placed inside the field.

```tsx
<Input
  label="Search"
  leadingIcon={<Ionicons name="search" size={20} />}
  trailingIcon={<Ionicons name="close-circle" size={20} />}
/>
```

#### Disabled

Pass `editable={false}` to render the field in a disabled state.

```tsx
<Input label="Read Only" value="Cannot be changed" editable={false} />
```

---

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Controls height, padding, and font |
| `label` | `string` | — | Floating label above the field |
| `helperText` | `string` | — | Subdued hint text below the field |
| `errorText` | `string` | — | Error message shown below the field; replaces `helperText` |
| `invalid` | `boolean` | `false` | Applies error styling (red border and error color) |
| `leadingIcon` | `React.ReactNode` | — | Icon at the leading edge inside the field |
| `trailingIcon` | `React.ReactNode` | — | Icon at the trailing edge inside the field |
| *(+ all TextInput props)* | | | Except `style` |

---

## Pagination

`Version: 1.0.0`

Page navigation control with smart truncation. Supports a numbered layout with first/last/prev/next controls, or a compact prev/next-only mode for narrow mobile layouts.

**Import**

```tsx
import { Pagination } from '@/components/ds/Pagination';
```

**Component File:** `components/ds/Pagination.tsx`

---

### Usage

#### Standard

The default layout renders numbered page buttons with prev and next arrows inside a pill container.

```tsx
const [page, setPage] = useState(1);

<Pagination totalPages={12} currentPage={page} onPageChange={setPage} />
```

#### Small

The small size renders bare page buttons without the pill wrapper.

```tsx
<Pagination size="sm" totalPages={8} currentPage={page} onPageChange={setPage} />
```

#### Compact

Compact mode renders only prev/next arrows — ideal for narrow mobile screens.

```tsx
<Pagination compact totalPages={20} currentPage={page} onPageChange={setPage} />
```

#### Custom Sibling Window

Use `siblingCount` to control how many page buttons appear on each side of the active page.

```tsx
<Pagination totalPages={10} currentPage={page} onPageChange={setPage} siblingCount={2} />
```

---

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `totalPages` | `number` | — | **Required.** Total number of pages |
| `currentPage` | `number` | — | **Required.** Active page (1-based) |
| `onPageChange` | `(page: number) => void` | — | **Required.** Called on page selection |
| `size` | `'sm' \| 'lg'` | `'lg'` | `lg` renders inside a pill; `sm` is bare |
| `siblingCount` | `number` | `1` | Number of page buttons on each side before truncating with `…` |
| `compact` | `boolean` | `false` | Renders only prev/next arrows — no page numbers |

---

## ProgressBar

`Version: 1.0.0`

Thin horizontal track showing a percentage completion value. Used for file uploads, loading sequences, and onboarding flows.

**Import**

```tsx
import { ProgressBar } from '@/components/ds/ProgressTracker';
```

**Component File:** `components/ds/ProgressTracker.tsx`

---

### Usage

#### Basic

Pass a `progress` value between 0 and 100.

```tsx
<ProgressBar progress={0}   />
<ProgressBar progress={45}  />
<ProgressBar progress={100} />
```

#### In Context

Combine with a label to give the user explicit progress feedback.

```tsx
<Text>Uploading… 65%</Text>
<ProgressBar progress={65} />
```

---

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `progress` | `number` | — | **Required.** Value from 0 to 100 |

> The fill color is `sysSuccess`. The track background is `sysSurfaceContainerHighest`. Values are clamped to `[0, 100]`.

---

## ProgressTracker

`Version: 1.0.0`

Multi-step progress indicator with labelled steps and per-step progress bars. Used to communicate where a user is in a multi-page flow.

**Import**

```tsx
import { ProgressTracker } from '@/components/ds/ProgressTracker';
```

**Component File:** `components/ds/ProgressTracker.tsx`

---

### Usage

#### Basic

Provide an array of steps with a `label` and a `state` for each.

```tsx
<ProgressTracker
  steps={[
    { label: 'Personal info', state: 'completed' },
    { label: 'Address',       state: 'completed' },
    { label: 'Review',        state: 'active'    },
    { label: 'Submit',        state: 'pending'   },
  ]}
/>
```

#### Without Labels

Set `showLabels` to `false` to render a compact bar-only indicator.

```tsx
<ProgressTracker
  showLabels={false}
  steps={[
    { label: 'Step 1', state: 'completed' },
    { label: 'Step 2', state: 'active'    },
    { label: 'Step 3', state: 'pending'   },
  ]}
/>
```

#### Small

The small size reduces the label font scale for tighter layouts.

```tsx
<ProgressTracker
  size="sm"
  steps={[
    { label: 'Info',    state: 'completed' },
    { label: 'Address', state: 'active'    },
    { label: 'Confirm', state: 'pending'   },
  ]}
/>
```

---

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `steps` | `TrackerStep[]` | — | **Required.** Ordered array of step descriptors |
| `size` | `'sm' \| 'lg'` | `'lg'` | Label font size |
| `showLabels` | `boolean` | `true` | Whether to render step labels below the bars |

**TrackerStep**

| Name | Type | Description |
|------|------|-------------|
| `label` | `string` | Step display name |
| `state` | `'completed' \| 'active' \| 'pending'` | Determines fill percentage (100% / 25% / 0%) |

---

## RadioButton

`Version: 1.0.0`

Single-selection control. Use within a group where only one option can be selected at a time. Supports controlled and uncontrolled usage.

**Import**

```tsx
import { RadioButton } from '@/components/ds/RadioButton';
```

**Component File:** `components/ds/RadioButton.tsx`

---

### Usage

#### States

RadioButton can be unselected, selected, or disabled.

```tsx
<RadioButton defaultSelected={false} />
<RadioButton defaultSelected={true}  />
<RadioButton disabled />
<RadioButton disabled defaultSelected />
```

#### Sizes

RadioButton supports medium (default) and small sizes.

```tsx
<RadioButton size="md" defaultSelected />
<RadioButton size="sm" defaultSelected />
```

#### In a Group

Manage selection state externally and pass `selected` and `onValueChange` to each option.

```tsx
const [selected, setSelected] = useState<string>('a');

<RadioButton
  selected={selected === 'a'}
  onValueChange={() => setSelected('a')}
  accessibilityLabel="Option A"
/>
<RadioButton
  selected={selected === 'b'}
  onValueChange={() => setSelected('b')}
  accessibilityLabel="Option B"
/>
<RadioButton
  selected={selected === 'c'}
  onValueChange={() => setSelected('c')}
  accessibilityLabel="Option C"
  disabled
/>
```

---

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `selected` | `boolean` | — | Controlled selected state |
| `defaultSelected` | `boolean` | `false` | Initial state for uncontrolled usage |
| `onValueChange` | `(value: boolean) => void` | — | Called when the value changes |
| `size` | `'sm' \| 'md'` | `'md'` | Controls hit area and ring size |
| `disabled` | `boolean` | `false` | Disables interaction |
| `accessibilityLabel` | `string` | — | Screen-reader label |

---

## Slider

`Version: 1.0.0`

Continuous value selector with a draggable thumb. Tapping anywhere on the track jumps the thumb to that position. The parent `ScrollView` cannot steal the gesture once dragging starts.

**Import**

```tsx
import { Slider } from '@/components/ds/Slider';
```

**Component File:** `components/ds/Slider.tsx`

---

### Usage

#### Basic

A simple uncontrolled slider with default `min` (0) and `max` (100).

```tsx
<Slider onSlidingComplete={(v) => console.log(v)} />
```

#### With Label

Use the `label` prop to render a descriptor above the track.

```tsx
const [volume, setVolume] = useState(50);

<Slider label="Volume" value={volume} onValueChange={setVolume} />
```

#### Step

Use the `step` prop to snap the thumb to fixed intervals.

```tsx
<Slider defaultValue={0} min={0} max={100} step={10} showMinMax />
```

#### Disabled

A disabled slider reduces opacity and ignores interaction.

```tsx
<Slider value={40} disabled label="Locked setting" />
```

---

### Props

| Name | Type | Default | Description |
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

---

## Switch

`Version: 1.0.0`

Binary toggle with an animated thumb slide and background color transition. Supports controlled and uncontrolled usage. Rendered with `accessibilityRole="switch"`.

**Import**

```tsx
import { Switch } from '@/components/ds/Switch';
```

**Component File:** `components/ds/Switch.tsx`

---

### Usage

#### On and Off

Switch can be toggled between on and off states.

```tsx
<Switch defaultValue={false} onValueChange={console.log} />
<Switch defaultValue={true}  onValueChange={console.log} />
```

#### Controlled

Use the `value` prop together with `onValueChange` for controlled usage.

```tsx
const [enabled, setEnabled] = useState(false);

<Switch value={enabled} onValueChange={setEnabled} accessibilityLabel="Notifications" />
```

#### Disabled

Disabled switches reduce opacity and ignore press interactions.

```tsx
<Switch value={false} disabled />
<Switch value={true}  disabled />
```

---

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `boolean` | — | Controlled value |
| `defaultValue` | `boolean` | `false` | Initial value for uncontrolled usage |
| `onValueChange` | `(value: boolean) => void` | — | Called when the user toggles the switch |
| `disabled` | `boolean` | `false` | Disables interaction |
| `accessibilityLabel` | `string` | — | Screen-reader label |

---

## Tooltip

`Version: 1.0.0`

Short contextual label attached to a target element and positioned with a directional arrow. Use to clarify icon buttons, abbreviations, or truncated text.

**Import**

```tsx
import { Tooltip } from '@/components/ds/Tooltip';
```

**Component File:** `components/ds/Tooltip.tsx`

---

### Usage

#### Filled

The filled variant uses a dark inverse surface — the default and most common style.

```tsx
<Tooltip text="More options" />
<Tooltip text="Delete item" direction="bottom" />
```

#### Elevated

The elevated variant uses a white surface with a border and shadow — for use on dark backgrounds.

```tsx
<Tooltip text="Save your work" variant="elevated" direction="bottom" />
<Tooltip text="Home"           variant="elevated" direction="left"   />
```

#### Directions

The `direction` prop describes where the target is relative to the bubble, which determines where the arrow is drawn.

```tsx
<Tooltip text="No arrow"           direction="none"   />
<Tooltip text="Target is above"    direction="top"    />
<Tooltip text="Target is below"    direction="bottom" />
<Tooltip text="Target is to left"  direction="left"   />
<Tooltip text="Target is to right" direction="right"  />
```

---

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | — | **Required.** Tooltip content |
| `variant` | `'filled' \| 'elevated'` | `'filled'` | Visual style |
| `direction` | `'none' \| 'top' \| 'bottom' \| 'left' \| 'right'` | `'none'` | Which direction the arrow points (where the target is relative to the bubble) |

---

## Token Reference

All components consume `sys.*` tokens exclusively via the three-namespace destructure:

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
| `cr.surface.surfaceContainer.*` | Container backgrounds (low → highest) |
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

| Path | Size | Line Height | Use |
|------|------|-------------|-----|
| `ts.titleMedium.*` | 24px | 31px | Empty state heading (desktop) |
| `ts.titleSmall.*` | 20px | 26px | Card titles, alert title |
| `ts.labelLarge.*` | 16px | 22px | Empty state heading (mobile) |
| `ts.labelMedium.*` | 14px | 20px | Button labels, input |
| `ts.labelSmall.*` | 12px | 18px | Small labels, breadcrumb sm |
| `ts.bodyMedium.*` | 16px | 24px | Input values, alert body lg |
| `ts.bodySmall.*` | 14px | 20px | Helper text, compact body |
