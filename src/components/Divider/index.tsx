import React from 'react';

import { StyleProp, View, ViewStyle } from 'react-native';

import { useTheme } from '../../theme';

export type DividerVariant = 'horizontal' | 'vertical';
export type DividerWeight = 'thin' | 'thick';

export interface DividerProps {
  variant?: DividerVariant;
  weight?: DividerWeight;
  dashed?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function Divider({
  variant = 'horizontal',
  weight = 'thin',
  dashed = false,
  style,
}: DividerProps) {
  const { colorRoles: cr, dimensions: dim } = useTheme();

  const thickness =
    weight === 'thin'
      ? dim.borderWidth.sysStrokeThin
      : dim.borderWidth.sysStrokeThick;

  const color = cr.outline.sysOutlineVariant;

  if (variant === 'horizontal') {
    return (
      <View
        style={[
          {
            // Zero height — the line is drawn as a top border
            height: 0,
            // Stretch to fill parent width
            alignSelf: 'stretch',
            borderTopWidth: thickness,
            borderTopColor: color,
            borderStyle: dashed ? 'dashed' : 'solid',
          },
          style,
        ]}
        accessible={false}
      />
    );
  }

  // Vertical
  return (
    <View
      style={[
        {
          // Zero width — the line is drawn as a left border
          width: 0,
          // Stretch to fill parent height
          alignSelf: 'stretch',
          borderLeftWidth: thickness,
          borderLeftColor: color,
          borderStyle: dashed ? 'dashed' : 'solid',
        },
        style,
      ]}
      accessible={false}
    />
  );
}
