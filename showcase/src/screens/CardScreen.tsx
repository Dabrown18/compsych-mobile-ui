import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ServiceCard, type ServiceCardVariant, type ServiceCardSize, sys } from '@compsych/mobile-ui';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { PreviewBox } from '../components/PreviewBox';
import { PropsPanel, PropChips, ShowcaseGrid } from '../components/PropsPanel';

const VARIANTS: ServiceCardVariant[] = ['outlined', 'tonal', 'filled', 'doubled', 'image'];
const SIZES: ServiceCardSize[] = ['sm', 'md', 'lg'];
const { colorRoles: cr } = sys;

const sampleIcon = <Ionicons name="heart-outline" size={24} color={cr.accent.primary.sysPrimary} />;

export function CardScreen() {
  const [variant, setVariant] = useState<ServiceCardVariant>('outlined');
  const [size, setSize] = useState<ServiceCardSize>('md');

  return (
    <ScreenWrapper
      name="ServiceCard"
      description="Content containers in three sizes and five variants including doubled (gradient) and image backgrounds."
    >
      <PreviewBox>
        <ServiceCard
          variant={variant}
          size={size}
          title="Essential Reads"
          description="Curated articles to help you build resilience and manage stress."
          interactive
          onPress={() => {}}
        />
      </PreviewBox>

      <PropsPanel>
        <PropChips label="Variant" options={VARIANTS} value={variant} onChange={setVariant} />
        <PropChips label="Size" options={SIZES} value={size} onChange={setSize} />
      </PropsPanel>

      <ShowcaseGrid title="All Variants">
        {VARIANTS.map((v) => (
          <ServiceCard
            key={v}
            variant={v}
            size="sm"
            title={v.charAt(0).toUpperCase() + v.slice(1)}
            interactive
            onPress={() => {}}
          />
        ))}
      </ShowcaseGrid>

      <ShowcaseGrid title="Sizes">
        {SIZES.map((s) => (
          <ServiceCard
            key={s}
            variant="outlined"
            size={s}
            title={`Size ${s}`}
            description="Card description text"
            interactive
            onPress={() => {}}
          />
        ))}
      </ShowcaseGrid>
    </ScreenWrapper>
  );
}
