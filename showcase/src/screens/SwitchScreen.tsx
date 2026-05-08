import React, { useState } from 'react';
import { View } from 'react-native';
import { Switch, BodyText, sys } from '@compsych/mobile-ui';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { PreviewBox } from '../components/PreviewBox';
import { ShowcaseGrid } from '../components/PropsPanel';

const { colorRoles: cr } = sys;

export function SwitchScreen() {
  const [value, setValue] = useState(false);

  return (
    <ScreenWrapper
      name="Switch"
      description="Binary toggle control. On / off with smooth native animation."
    >
      <PreviewBox>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Switch value={value} onValueChange={setValue} />
          <BodyText variant="medium" color={cr.surface.surface.sysOnSurface}>
            {value ? 'On' : 'Off'}
          </BodyText>
        </View>
      </PreviewBox>

      <ShowcaseGrid title="States">
        <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
          <Switch value={false} onValueChange={() => {}} />
          <BodyText variant="small" color={cr.surface.surface.sysOnSurfaceVariant}>Off</BodyText>
        </View>
        <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
          <Switch value={true} onValueChange={() => {}} />
          <BodyText variant="small" color={cr.surface.surface.sysOnSurfaceVariant}>On</BodyText>
        </View>
        <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
          <Switch value={false} disabled onValueChange={() => {}} />
          <BodyText variant="small" color={cr.surface.surface.sysOnSurfaceVariant}>Disabled off</BodyText>
        </View>
        <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
          <Switch value={true} disabled onValueChange={() => {}} />
          <BodyText variant="small" color={cr.surface.surface.sysOnSurfaceVariant}>Disabled on</BodyText>
        </View>
      </ShowcaseGrid>
    </ScreenWrapper>
  );
}
