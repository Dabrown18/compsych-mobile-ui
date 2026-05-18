import React from 'react';
import { ScrollView, type ScrollViewProps } from 'react-native';
import { sys } from '../../tokens';

const { dimensions: dim, colorRoles: cr } = sys;

export interface ScreenContainerProps extends ScrollViewProps {
  children?: React.ReactNode;
}

export function ScreenContainer({ children, style, contentContainerStyle, ...rest }: ScreenContainerProps) {
  return (
    <ScrollView
      style={[{ flex: 1, backgroundColor: cr.surface.surfaceContainer.sysSurfaceContainerLowest }, style]}
      contentContainerStyle={[
        {
          paddingHorizontal: dim.spacing.padding.sysPadding16,
          paddingVertical: dim.spacing.padding.sysPadding8,
        },
        contentContainerStyle,
      ]}
      {...rest}
    >
      {children}
    </ScrollView>
  );
}
