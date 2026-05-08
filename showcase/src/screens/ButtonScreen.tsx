import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Button,
  type ButtonVariant,
  type ButtonSize,
} from '@compsych/mobile-ui';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { PreviewBox } from '../components/PreviewBox';
import { PropsPanel, PropChips, PropToggle, PropText, ShowcaseGrid } from '../components/PropsPanel';

const VARIANTS: ButtonVariant[] = ['filled', 'tonal', 'outlined', 'elevated', 'text', 'danger', 'danger-outlined'];
const SIZES: ButtonSize[] = ['sm', 'md', 'lg', 'xl'];

export function ButtonScreen() {
  const [variant, setVariant] = useState<ButtonVariant>('filled');
  const [size, setSize] = useState<ButtonSize>('md');
  const [label, setLabel] = useState('Button');
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fullWidth, setFullWidth] = useState(false);

  return (
    <ScreenWrapper
      name="Button"
      description="The canonical interactive element. Seven visual variants, four sizes, five states."
    >
      <PreviewBox>
        <Button
          variant={variant}
          size={size}
          label={label}
          disabled={disabled}
          loading={loading}
          fullWidth={fullWidth}
          onPress={() => {}}
        />
      </PreviewBox>

      <PropsPanel>
        <PropChips label="Variant" options={VARIANTS} value={variant} onChange={setVariant} />
        <PropChips label="Size" options={SIZES} value={size} onChange={setSize} />
        <PropText label="Label" value={label} onChange={setLabel} placeholder="Button" />
        <PropToggle label="Full Width" value={fullWidth} onChange={setFullWidth} />
        <PropToggle label="Loading" value={loading} onChange={setLoading} />
        <PropToggle label="Disabled" value={disabled} onChange={setDisabled} />
      </PropsPanel>

      <ShowcaseGrid title="All Variants">
        {VARIANTS.map((v) => (
          <Button key={v} variant={v} size="md" label={v} onPress={() => {}} />
        ))}
      </ShowcaseGrid>

      <ShowcaseGrid title="Sizes">
        {SIZES.map((s) => (
          <Button key={s} variant="filled" size={s} label={s} onPress={() => {}} />
        ))}
      </ShowcaseGrid>

      <ShowcaseGrid title="States">
        <Button variant="filled" size="md" label="Default" onPress={() => {}} />
        <Button variant="filled" size="md" label="Disabled" disabled onPress={() => {}} />
        <Button variant="filled" size="md" label="Loading" loading onPress={() => {}} />
        <Button variant="filled" size="md" label="Full Width" fullWidth onPress={() => {}} />
      </ShowcaseGrid>
    </ScreenWrapper>
  );
}
