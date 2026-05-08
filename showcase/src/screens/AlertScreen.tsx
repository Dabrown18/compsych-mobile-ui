import React, { useState } from 'react';
import {
  Alert,
  type AlertVariant,
  type AlertSize,
} from '@compsych/mobile-ui';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { PreviewBox } from '../components/PreviewBox';
import { PropsPanel, PropChips, PropToggle, ShowcaseGrid } from '../components/PropsPanel';

const VARIANTS: AlertVariant[] = ['default', 'elevated', 'informative', 'warning', 'positive', 'danger'];
const SIZES: AlertSize[] = ['sm', 'lg'];

export function AlertScreen() {
  const [variant, setVariant] = useState<AlertVariant>('informative');
  const [size, setSize] = useState<AlertSize>('sm');
  const [dismissible, setDismissible] = useState(false);
  const [hasAction, setHasAction] = useState(false);
  const [hideIcon, setHideIcon] = useState(false);

  return (
    <ScreenWrapper
      name="Alert"
      description="Inline feedback banners. Six semantic variants, two sizes, optional action and dismiss controls."
    >
      <PreviewBox>
        <Alert
          variant={variant}
          size={size}
          description="Your session will expire in 5 minutes. Save your work to avoid losing changes."
          title={size === 'lg' ? 'Session expiring soon' : undefined}
          dismissible={dismissible}
          actionLabel={hasAction ? 'Renew' : undefined}
          onAction={hasAction ? () => {} : undefined}
          hideIcon={hideIcon}
        />
      </PreviewBox>

      <PropsPanel>
        <PropChips label="Variant" options={VARIANTS} value={variant} onChange={setVariant} />
        <PropChips label="Size" options={SIZES} value={size} onChange={setSize} />
        <PropToggle label="Dismissible" value={dismissible} onChange={setDismissible} />
        <PropToggle label="Action button" value={hasAction} onChange={setHasAction} />
        <PropToggle label="Hide icon" value={hideIcon} onChange={setHideIcon} />
      </PropsPanel>

      <ShowcaseGrid title="All Variants">
        {VARIANTS.map((v) => (
          <Alert key={v} variant={v} description={v.charAt(0).toUpperCase() + v.slice(1)} />
        ))}
      </ShowcaseGrid>

      <ShowcaseGrid title="Sizes">
        <Alert variant="informative" size="sm" description="Small — inline feedback" />
        <Alert
          variant="informative"
          size="lg"
          title="Large alert"
          description="With title and more context for the user."
        />
      </ShowcaseGrid>
    </ScreenWrapper>
  );
}
