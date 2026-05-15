import React, { useState } from 'react';
import {
  PromotionCard,
  type PromotionCardVariant,
  type PromotionCardUsage,
} from '@compsych/mobile-ui';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { PreviewBox } from '../components/PreviewBox';
import { PropChips, ShowcaseGrid, PropsPanel } from '../components/PropsPanel';

const VARIANTS: PromotionCardVariant[] = ['filled', 'tonal'];
const USAGES: PromotionCardUsage[] = [
  'neutral', 'informative', 'positive', 'danger', 'warning', 'image',
];

export function PromotionCardScreen() {
  const [variant, setVariant] = useState<PromotionCardVariant>('filled');
  const [usage, setUsage] = useState<PromotionCardUsage>('neutral');

  return (
    <ScreenWrapper
      name="PromotionCard"
      description="Compact promotional surface with a chip, title, description, action button, and optional progress/ring timer."
    >
      <PreviewBox>
        <PromotionCard
          variant={variant}
          usage={usage}
          chipLabel="New"
          title="Your next session"
          description="Tuesday, June 3 · 2:00 PM with Dr. Patel"
          progress={0.4}
          showProgressBar
          showRingTimer
        />
      </PreviewBox>

      <PropsPanel>
        <PropChips label="Variant" options={VARIANTS} value={variant} onChange={setVariant} />
        <PropChips label="Usage" options={USAGES} value={usage} onChange={setUsage} />
      </PropsPanel>

      <ShowcaseGrid title="All Usages — Filled">
        {USAGES.filter((u) => u !== 'image').map((u) => (
          <PromotionCard
            key={u}
            variant="filled"
            usage={u}
            chipLabel={u.charAt(0).toUpperCase() + u.slice(1)}
            title="Therapy Session"
            description="Tuesday · 2:00 PM"
            progress={0.4}
            showProgressBar
          />
        ))}
      </ShowcaseGrid>

      <ShowcaseGrid title="All Usages — Tonal">
        {USAGES.filter((u) => u !== 'image').map((u) => (
          <PromotionCard
            key={u}
            variant="tonal"
            usage={u}
            chipLabel={u.charAt(0).toUpperCase() + u.slice(1)}
            title="Therapy Session"
            description="Tuesday · 2:00 PM"
            progress={0.4}
            showProgressBar
          />
        ))}
      </ShowcaseGrid>
    </ScreenWrapper>
  );
}
