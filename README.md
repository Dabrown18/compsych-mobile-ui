# ComPsych Design System — React Native

A React Native implementation of the ComPsych Design System component library, built on Expo SDK 54. All components consume only `sys.*` tokens from the `@javierkonpo/design-system` package, ensuring full theme and brand compatibility.

---

## Getting started

```bash
npm install
npx expo start
```

Open the app in a development build, iOS Simulator, Android emulator, or Expo Go.

---

## Components

17 production-ready components are located in `components/ds/`. Each component is fully typed, supports controlled and uncontrolled usage where applicable, and is accessibility-labelled out of the box.

---

### Alert

Inline contextual messaging with six semantic variants, optional title, dismiss button, and action.

![Alert](docs/images/alert.png)

```tsx
import { Alert } from '@/components/ds/Alert';

<Alert variant="informative" description="Your session will expire in 5 minutes." />
<Alert variant="danger" title="Payment failed" description="Check your card details." dismissible onDismiss={() => {}} />
<Alert variant="positive" size="sm" description="Changes saved." actionLabel="Undo" onAction={() => {}} />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'elevated' \| 'informative' \| 'warning' \| 'positive' \| 'danger'` | `'default'` | Color scheme and icon |
| `size` | `'sm' \| 'lg'` | `'lg'` | `lg` shows a bold title; `sm` is compact text-only |
| `title` | `string` | — | Bold heading, `lg` size only |
| `description` | `string` | **required** | Body text |
| `icon` | `ReactNode` | — | Override the default variant icon |
| `hideIcon` | `boolean` | `false` | Hide the leading icon entirely |
| `actionLabel` | `string` | — | Label for the inline action button |
| `onAction` | `() => void` | — | Action button handler |
| `dismissible` | `boolean` | `false` | Show the × dismiss button |
| `onDismiss` | `() => void` | — | Dismiss button handler |

---

### Avatar

User identity graphic in text-initials, image, or icon form, with optional activity ring and presence badge.

![Avatar](docs/images/avatar.png)

```tsx
import { Avatar } from '@/components/ds/Avatar';

<Avatar variant="text" initials="CP" size="md" />
<Avatar variant="image" source={{ uri: 'https://...' }} size="lg" activityRing />
<Avatar variant="icon" size="xl" presenceBadge />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'text' \| 'image' \| 'icon'` | `'icon'` | Graphic type |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl'` | `'md'` | Diameter: 24 / 32 / 40 / 48 / 56 / 72 / 96 px |
| `initials` | `string` | — | Up to 2 characters for the text variant |
| `source` | `ImageSourcePropType` | — | Image source for the image variant |
| `icon` | `ReactNode` | — | Custom icon for the icon variant |
| `activityRing` | `boolean` | `false` | Renders a coloured ring around the avatar |
| `presenceBadge` | `boolean` | `false` | Renders a shield-check badge at the bottom-right corner |

---

### Badge

Compact label for counts, statuses, and categorical tags.

![Badge](docs/images/badge.png)

```tsx
import { Badge } from '@/components/ds/Badge';

<Badge label={4} badgeStyle="filled" size="md" />
<Badge label="New" badgeStyle="positive" size="lg" />
<Badge badgeStyle="dot" size="sm" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `number \| string` | — | Content; ignored for `dot` style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Height: 16 / 20 / 24 px |
| `badgeStyle` | `'filled' \| 'positive' \| 'danger' \| 'elevated' \| 'tonal' \| 'dot'` | `'filled'` | Color treatment |

---

### Breadcrumb

Horizontal navigation trail with home icon, overflow ellipsis, and disabled items.

![Breadcrumb](docs/images/breadcrumb.png)

```tsx
import { Breadcrumb } from '@/components/ds/Breadcrumb';

<Breadcrumb
  size="lg"
  items={[
    { isHome: true, onPress: () => {} },
    { label: 'Settings', onPress: () => {} },
    { label: 'Profile' },         // current — no onPress
  ]}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `BreadcrumbItem[]` | **required** | Ordered list of crumbs |
| `size` | `'sm' \| 'lg'` | `'lg'` | Type scale and spacing |

**BreadcrumbItem**

| Field | Type | Description |
|-------|------|-------------|
| `label` | `string` | Display text |
| `isHome` | `boolean` | Renders the home icon instead of text |
| `isOverflow` | `boolean` | Renders "…" — tap to expand |
| `disabled` | `boolean` | Reduces opacity; non-interactive |
| `onPress` | `() => void` | Omit for the current/last crumb |

---

### Button

Primary call-to-action with seven variants, four sizes, loading state, and optional icons.

![Button](docs/images/button.png)

```tsx
import { Button } from '@/components/ds/Button';

<Button variant="filled" size="md" label="Save changes" onPress={() => {}} />
<Button variant="outlined" size="sm" label="Cancel" />
<Button variant="danger" size="lg" label="Delete" leadingIcon={<Ionicons name="trash" />} />
<Button variant="filled" size="md" label="Saving…" loading />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'filled' \| 'tonal' \| 'outlined' \| 'elevated' \| 'text' \| 'danger' \| 'danger-outlined'` | `'filled'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Height: 32 / 40 / 48 / 56 px |
| `label` | `string` | **required** | Button text |
| `disabled` | `boolean` | `false` | Disables interaction |
| `loading` | `boolean` | `false` | Replaces label with a spinner |
| `fullWidth` | `boolean` | `false` | Stretches to fill container width |
| `iconOnly` | `boolean` | `false` | Square aspect ratio for icon-only buttons |
| `leadingIcon` | `ReactNode` | — | Icon before the label |
| `trailingIcon` | `ReactNode` | — | Icon after the label |

---

### Card

General-purpose container with outlined, filled, and gradient variants; interactive and disabled states.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'outlined' \| 'filled' \| 'gradient'` | `'outlined'` | Visual treatment |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Inner padding and gap |
| `interactive` | `boolean` | `false` | Adds press feedback |
| `disabled` | `boolean` | `false` | Reduces opacity; non-interactive |
| `current` | `boolean` | `false` | Active/selected ring |
| `fullWidth` | `boolean` | `false` | Stretches to fill container width |
| `onPress` | `() => void` | — | Press handler (requires `interactive`) |
| `children` | `ReactNode` | — | Card content |

```tsx
import { Card } from '@/components/ds/Card';

<Card variant="outlined" size="md" interactive onPress={() => {}}>
  <Text>Card content</Text>
</Card>
```

---

### Checkbox

Binary or indeterminate selection control with label, description, invalid state, and two sizes.

![Checkbox](docs/images/checkbox.png)

```tsx
import { Checkbox } from '@/components/ds/Checkbox';

<Checkbox label="Accept terms" size="md" />
<Checkbox label="Subscribe" checked={value} onChange={setValue} />
<Checkbox label="Partial" checked="indeterminate" size="sm" />
<Checkbox label="Disabled" disabled />
<Checkbox label="Invalid" invalid description="This field is required." />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean \| 'indeterminate'` | — | Controlled state |
| `defaultChecked` | `boolean` | `false` | Initial state for uncontrolled usage |
| `onChange` | `(checked: boolean) => void` | — | Change handler |
| `size` | `'sm' \| 'md'` | `'md'` | Box: 20 / 24 px |
| `label` | `string` | — | Inline label |
| `description` | `string` | — | Secondary helper text below the label |
| `disabled` | `boolean` | `false` | Non-interactive |
| `invalid` | `boolean` | `false` | Error border colour |

---

### Chip

Compact tag or filter token with semantic colour, optional leading icon, dismiss button, and count badge.

![Chip](docs/images/chip.png)

```tsx
import { Chip } from '@/components/ds/Chip';

<Chip label="Active" usage="positive" size="md" />
<Chip label="Urgent" usage="danger" size="lg" dismissible onDismiss={() => {}} />
<Chip label="Filters" badge={3} size="xl" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | **required** | Chip text |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Height: 20 / 24 / 32 / 40 px |
| `usage` | `'neutral' \| 'informative' \| 'positive' \| 'danger' \| 'warning'` | `'neutral'` | Semantic colour |
| `leadingIcon` | `ReactNode` | — | Icon before the label |
| `dismissible` | `boolean` | `false` | Renders a close button |
| `onDismiss` | `() => void` | — | Close button handler |
| `badge` | `number \| string` | — | Small count badge after the label |

---

### Divider

Single-line separator for horizontal or vertical use, in thin or thick weights, with optional dashed style.

![Divider](docs/images/divider.png)

```tsx
import { Divider } from '@/components/ds/Divider';

<Divider />
<Divider variant="vertical" weight="thick" />
<Divider dashed />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientation |
| `weight` | `'thin' \| 'thick'` | `'thin'` | Stroke width |
| `dashed` | `boolean` | `false` | Dashed line style |

---

### EmptyState

Placeholder panel shown when a list or view has no content, with icon or illustration graphic, optional description, and action button.

![EmptyState](docs/images/emptystate.png)

```tsx
import { EmptyState } from '@/components/ds/EmptyState';

<EmptyState
  title="No results"
  description="Try adjusting your filters."
  actionLabel="Clear filters"
  onAction={() => {}}
/>
<EmptyState style="illustration" viewport="desktop" title="Nothing here yet" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `style` | `'icon' \| 'illustration'` | `'icon'` | Graphic area — icon circle or card collage illustration |
| `viewport` | `'desktop' \| 'mobile'` | `'mobile'` | Type scale and icon circle size |
| `title` | `string` | `'No results'` | Heading text |
| `description` | `string` | `'Description if needed'` | Body text below the title |
| `showDescription` | `boolean` | `true` | Hide description even when provided |
| `icon` | `ReactNode` | — | Custom icon inside the icon circle |
| `actionLabel` | `string` | — | Action button label |
| `onAction` | `() => void` | — | Action button handler |
| `showAction` | `boolean` | auto | Override action button visibility |

---

### Input

Text input field with floating label, helper/error text, leading and trailing icons, and two sizes.

![Input](docs/images/input.png)

```tsx
import { Input } from '@/components/ds/Input';

<Input label="Email" size="md" />
<Input label="Search" leadingIcon={<Ionicons name="search" />} />
<Input label="Password" invalid errorText="Must be at least 8 characters." />
<Input label="Notes" helperText="Optional" size="sm" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md'` | `'md'` | Height: 40 / 48 px |
| `label` | `string` | — | Floating label |
| `helperText` | `string` | — | Hint text below the field |
| `errorText` | `string` | — | Error message (shown when `invalid`) |
| `invalid` | `boolean` | `false` | Error border and error text |
| `leadingIcon` | `ReactNode` | — | Icon inside the left edge |
| `trailingIcon` | `ReactNode` | — | Icon inside the right edge |
| `...TextInputProps` | — | — | All standard React Native `TextInput` props |

---

### Pagination

Page navigation control with numbered page buttons, prev/next arrows, ellipsis, and compact mode.

![Pagination](docs/images/pagination.png)

```tsx
import { Pagination } from '@/components/ds/Pagination';

<Pagination
  totalPages={10}
  currentPage={page}
  onPageChange={setPage}
  size="lg"
/>
<Pagination
  totalPages={20}
  currentPage={page}
  onPageChange={setPage}
  siblingCount={1}
  compact  // prev/next only
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `totalPages` | `number` | **required** | Total number of pages |
| `currentPage` | `number` | **required** | Active page (1-indexed) |
| `onPageChange` | `(page: number) => void` | **required** | Page change handler |
| `size` | `'sm' \| 'lg'` | `'lg'` | Item size: 32 / 40 px |
| `siblingCount` | `number` | `1` | Pages shown on each side of the current page |
| `compact` | `boolean` | `false` | Renders only previous/next arrows |

---

### ProgressTracker

Multi-step progress indicator with completed, active, and pending states per step.

![ProgressTracker](docs/images/progress.png)

```tsx
import { ProgressTracker } from '@/components/ds/ProgressTracker';

<ProgressTracker
  size="lg"
  steps={[
    { label: 'Account', state: 'completed' },
    { label: 'Plan',    state: 'active' },
    { label: 'Payment', state: 'pending' },
  ]}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `steps` | `TrackerStep[]` | **required** | Ordered step definitions |
| `size` | `'sm' \| 'lg'` | `'lg'` | Type scale and spacing |
| `showLabels` | `boolean` | `true` | Show step label text |

**TrackerStep**

| Field | Type | Description |
|-------|------|-------------|
| `label` | `string` | Step label |
| `state` | `'completed' \| 'active' \| 'pending'` | Visual state — completed = full bar, active = partial bar, pending = empty |

---

### RadioButton

Single-selection control with label, description, invalid state, and two sizes.

![RadioButton](docs/images/radio.png)

```tsx
import { RadioButton } from '@/components/ds/RadioButton';

const [selected, setSelected] = useState('a');

<RadioButton label="Option A" checked={selected === 'a'} onChange={() => setSelected('a')} />
<RadioButton label="Option B" checked={selected === 'b'} onChange={() => setSelected('b')} />
<RadioButton label="Option C" disabled />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | — | Controlled state |
| `defaultChecked` | `boolean` | `false` | Initial state for uncontrolled usage |
| `onChange` | `(checked: boolean) => void` | — | Change handler |
| `size` | `'sm' \| 'md'` | `'md'` | Circle: 20 / 24 px |
| `label` | `string` | — | Inline label |
| `description` | `string` | — | Secondary helper text |
| `disabled` | `boolean` | `false` | Non-interactive |
| `invalid` | `boolean` | `false` | Error border colour |

---

### Slider

Draggable continuous value selector with optional label, min/max labels, step snapping, and disabled state.

![Slider](docs/images/slider.png)

```tsx
import { Slider } from '@/components/ds/Slider';

<Slider
  label="Volume"
  value={volume}
  onValueChange={setVolume}
  min={0}
  max={100}
/>
<Slider defaultValue={50} step={10} showMinMax />
<Slider value={30} disabled />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | — | Controlled value |
| `defaultValue` | `number` | `min` | Initial value for uncontrolled usage |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `step` | `number` | `1` | Snapping interval |
| `onValueChange` | `(value: number) => void` | — | Called continuously while dragging |
| `onSlidingComplete` | `(value: number) => void` | — | Called on release |
| `label` | `string` | — | Label above the track |
| `showMinMax` | `boolean` | `true` | Show min/max labels beside the track |
| `disabled` | `boolean` | `false` | Non-interactive |
| `accessibilityLabel` | `string` | — | Overrides `label` for screen readers |

---

### Switch

Animated binary toggle with controlled and uncontrolled usage, disabled state, and accessible role.

![Switch](docs/images/switch.png)

```tsx
import { Switch } from '@/components/ds/Switch';

<Switch value={enabled} onValueChange={setEnabled} />
<Switch defaultValue={true} />
<Switch value={false} disabled />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `boolean` | — | Controlled on/off state |
| `defaultValue` | `boolean` | `false` | Initial state for uncontrolled usage |
| `onValueChange` | `(value: boolean) => void` | — | Change handler |
| `disabled` | `boolean` | `false` | Non-interactive |
| `accessibilityLabel` | `string` | — | Screen reader label |

---

### Tooltip

Static informational label with filled or elevated variant and five directional arrow options.

![Tooltip](docs/images/tooltip.png)

```tsx
import { Tooltip } from '@/components/ds/Tooltip';

<Tooltip text="Saved to your account" direction="top" />
<Tooltip text="More info" variant="elevated" direction="right" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | **required** | Tooltip content |
| `variant` | `'filled' \| 'elevated'` | `'filled'` | Dark background vs. elevated surface |
| `direction` | `'none' \| 'top' \| 'bottom' \| 'left' \| 'right'` | `'none'` | Directional arrow placement |

---

## Token system

All components reference only `sys.*` tokens via:

```ts
import { sys } from '@/components/ds/tokens';
const { colorRoles: cr, dimensions: dim, typeScale: ts } = sys;
```

Never apply `core.*`, `product.*`, or `brand.*` tokens directly in UI — they are internal plumbing. Only `sys.*` tokens respond to theme and brand changes.

---

## Project structure

```
components/ds/       Design system components + tokens
app/(tabs)/          Expo Router tab screens
docs/
  components.md      Full component API reference
  components.pdf     Print-ready reference with Figma screenshots
  images/            Figma component screenshots
```
