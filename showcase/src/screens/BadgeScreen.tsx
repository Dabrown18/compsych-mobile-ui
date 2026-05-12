import React, { useState } from 'react';
import { View } from 'react-native';
import { Badge, type BadgeSize, type BadgeStyle } from '@compsych/mobile-ui';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { PreviewBox } from '../components/PreviewBox';
import { PropsPanel, PropChips, PropText, ShowcaseGrid } from '../components/PropsPanel';

const STYLES: BadgeStyle[] = ['filled', 'tonal', 'outlined'];
const SIZES: BadgeSize[] = ['sm', 'md', 'lg'];

export function BadgeScreen() {
  const [badgeStyle, setBadgeStyle] = useState<BadgeStyle>('filled');
  const [size, setSize] = useState<BadgeSize>('md');
  const [label, setLabel] = useState('New');

  return (
    <ScreenWrapper
      name="Badge"
      description="Small status indicators. Three styles, three sizes, semantic color roles."
    >
      <PreviewBox>
        <Badge label={label} style={badgeStyle} size={size} />
      </PreviewBox>

      <PropsPanel>
        <PropChips label="Style" options={STYLES} value={badgeStyle} onChange={setBadgeStyle} />
        <PropChips label="Size" options={SIZES} value={size} onChange={setSize} />
        <PropText label="Label" value={label} onChange={setLabel} placeholder="New" />
      </PropsPanel>

      <ShowcaseGrid title="All Styles">
        {STYLES.map((s) => (
          <Badge key={s} label={s} style={s} size="md" />
        ))}
      </ShowcaseGrid>

      <ShowcaseGrid title="Sizes">
        {SIZES.map((s) => (
          <Badge key={s} label={s} style="filled" size={s} />
        ))}
      </ShowcaseGrid>
    </ScreenWrapper>
  );
}
