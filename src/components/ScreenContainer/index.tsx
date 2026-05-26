import React from 'react';

import { ScrollView, type ScrollViewProps } from 'react-native';

import { useTheme } from '../../theme';

export interface ScreenContainerProps extends ScrollViewProps {
  children?: React.ReactNode;
}

export function ScreenContainer({
  children,
  style,
  contentContainerStyle,
  ...rest
}: ScreenContainerProps) {
  const { dimensions: dim, colorRoles: cr } = useTheme();

  return (
    <ScrollView
      style={[
        {
          flex: 1,
          backgroundColor: cr.surface.surface.sysSurface,
        },
        style,
      ]}
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
