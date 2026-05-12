import React, { useState } from 'react';
import { View } from 'react-native';
import { Checkbox, type CheckboxSize, type CheckboxCheckedState } from '@compsych/mobile-ui';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { PreviewBox } from '../components/PreviewBox';
import { PropsPanel, PropChips, ShowcaseGrid } from '../components/PropsPanel';

const SIZES: CheckboxSize[] = ['sm', 'md'];

export function CheckboxScreen() {
  const [size, setSize] = useState<CheckboxSize>('md');
  const [checked, setChecked] = useState<CheckboxCheckedState>('unchecked');

  function cycle() {
    setChecked((c) =>
      c === 'unchecked' ? 'checked' : c === 'checked' ? 'indeterminate' : 'unchecked',
    );
  }

  return (
    <ScreenWrapper
      name="Checkbox"
      description="Three check states (checked, unchecked, indeterminate), two sizes, with optional label."
    >
      <PreviewBox>
        <Checkbox
          checked={checked}
          size={size}
          label="I agree to the terms"
          onChange={cycle}
        />
      </PreviewBox>

      <PropsPanel>
        <PropChips label="Size" options={SIZES} value={size} onChange={setSize} />
        <PropChips
          label="State"
          options={['unchecked', 'checked', 'indeterminate'] as CheckboxCheckedState[]}
          value={checked}
          onChange={setChecked}
        />
      </PropsPanel>

      <ShowcaseGrid title="States">
        <Checkbox checked="unchecked" label="Unchecked" onChange={() => {}} />
        <Checkbox checked="checked" label="Checked" onChange={() => {}} />
        <Checkbox checked="indeterminate" label="Indeterminate" onChange={() => {}} />
        <Checkbox checked="unchecked" label="Disabled" disabled onChange={() => {}} />
      </ShowcaseGrid>

      <ShowcaseGrid title="Sizes">
        <Checkbox checked="checked" size="sm" label="Small" onChange={() => {}} />
        <Checkbox checked="checked" size="md" label="Medium" onChange={() => {}} />
      </ShowcaseGrid>
    </ScreenWrapper>
  );
}
