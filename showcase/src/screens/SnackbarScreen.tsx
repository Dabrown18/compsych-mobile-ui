import React, { useState } from 'react';
import { View } from 'react-native';
import { Snackbar, Button, type SnackbarVariant } from '@compsych/mobile-ui';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { PropsPanel, PropChips, PropToggle, ShowcaseGrid } from '../components/PropsPanel';
import { PreviewBox } from '../components/PreviewBox';

const VARIANTS: SnackbarVariant[] = ['filled', 'outlined'];

export function SnackbarScreen() {
  const [variant, setVariant] = useState<SnackbarVariant>('filled');
  const [hasAction, setHasAction] = useState(true);
  const [hasClose, setHasClose] = useState(true);
  const [visible, setVisible] = useState(true);

  return (
    <ScreenWrapper
      name="Snackbar"
      description="Brief bottom-of-screen notifications. Two variants, optional action, spring slide animation."
    >
      <PreviewBox label="Live Demo">
        <View style={{ height: 80, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <Button variant="filled" size="md" label={visible ? 'Hide' : 'Show'} onPress={() => setVisible(v => !v)} />
        </View>
        <View style={{ position: 'relative', width: '100%', height: 0 }}>
          <Snackbar
            visible={visible}
            message="Changes saved successfully."
            variant={variant}
            actionLabel={hasAction ? 'Undo' : undefined}
            onAction={hasAction ? () => {} : undefined}
            onClose={hasClose ? () => setVisible(false) : undefined}
          />
        </View>
      </PreviewBox>

      <PropsPanel>
        <PropChips label="Variant" options={VARIANTS} value={variant} onChange={setVariant} />
        <PropToggle label="Action button" value={hasAction} onChange={setHasAction} />
        <PropToggle label="Close button" value={hasClose} onChange={setHasClose} />
      </PropsPanel>

      <ShowcaseGrid title="Variants">
        {VARIANTS.map((v) => (
          <Snackbar
            key={v}
            visible
            message={v === 'filled' ? 'Filled snackbar' : 'Outlined snackbar'}
            variant={v}
            onClose={() => {}}
          />
        ))}
      </ShowcaseGrid>
    </ScreenWrapper>
  );
}
