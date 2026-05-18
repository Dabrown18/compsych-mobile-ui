# Claude Code Instructions

## Mobile UI + Design System Sync

Whenever a UI component, style, layout, or shared UI behavior is updated in this repo, the same change must also be reflected in the Design System repo if it affects reusable or shared components.

This includes:
- Shared components
- Styles, spacing, typography, colors, or layouts
- Component props or APIs
- Examples and usage documentation
- README files when component behavior or usage changes
- Naming and structure consistency across both repos

**Before completing any UI-related task:**

1. Check whether the change belongs in the Design System repo
2. Update the Design System repo if needed
3. Update README/documentation files accordingly
4. Make sure both repos follow the same implementation patterns
5. Avoid creating one-off UI solutions in this repo when a reusable component should exist in the Design System repo

---

## Component Test Requirement

Every component under `src/components/` must have a corresponding test file.

**Rule:** When creating a new component at `src/components/ComponentName/index.tsx`, you must also create `src/components/ComponentName/ComponentName.test.tsx` in the same commit.

The test file must cover at minimum:
- Renders without crashing
- Renders required props (title, label, etc.) visibly
- Fires callbacks (onPress, onChange, etc.) when triggered
- Each variant/size/usage value renders without crashing (use `it.each`)
- Disabled / inactive states

The pre-commit hook will block any commit that adds a component folder without a test file. Do not skip or work around this check.
