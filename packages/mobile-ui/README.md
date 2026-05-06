# @compsych/mobile-ui

ComPsych React Native Design System — 17 mobile UI components built on the ComPsych token system.

## Components

Alert · Avatar · Badge · Breadcrumb · Button · Card · Checkbox · Chip · Divider · EmptyState · Input · Pagination · ProgressTracker · RadioButton · Slider · Switch · Tooltip

## Installation

### From this monorepo (local)

Add to your project's `package.json`:

```json
"dependencies": {
  "@compsych/mobile-ui": "file:../expo-test-app/packages/mobile-ui"
}
```

Then in `metro.config.js`, add `@compsych` to `transformIgnorePatterns` and the package path to `watchFolders`:

```js
const mobileUiPath = path.resolve(__dirname, '../expo-test-app/packages/mobile-ui');

config.watchFolders = [...(config.watchFolders ?? []), mobileUiPath];

config.transformer.transformIgnorePatterns = [
  'node_modules/(?!(...|@compsych(/.*)?))',
];
```

### Peer dependencies

Your consuming project must have these installed:

```json
"@expo/vector-icons": ">=15.0.0",
"@javierkonpo/design-system": "*",
"react": ">=18.0.0",
"react-native": ">=0.73.0"
```

## Usage

```tsx
import { Button, Alert, Avatar } from '@compsych/mobile-ui';

export default function MyScreen() {
  return (
    <>
      <Button label="Primary" variant="filled" onPress={() => {}} />
      <Alert
        variant="informative"
        title="Heads up"
        description="Something to know about."
      />
      <Avatar size="md" variant="text" initials="JD" />
    </>
  );
}
```

## Token access

The package re-exports the ComPsych token system for components that need direct token access:

```tsx
import { sys } from '@compsych/mobile-ui';

const styles = StyleSheet.create({
  container: {
    backgroundColor: sys.colorRoles.surface,
    padding: sys.dimensions.spacingMd,
  },
});
```

## Full documentation

See [`docs/components.md`](../../docs/components.md) in the parent project for the complete component API reference.
