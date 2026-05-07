import React from 'react';
import { Text, type TextProps } from 'react-native';

import { sys } from './tokens';

export type BodyVariant =
  | 'large'
  | 'medium'
  | 'small'
  | 'labelLarge'
  | 'labelMedium'
  | 'labelSmall';

export interface BodyTextProps extends TextProps {
  variant?: BodyVariant;
  emphasized?: boolean;
  color?: string;
}

const FONT_FAMILY: Record<string, string> = {
  regular: 'GoogleSans_400Regular',
  medium: 'GoogleSans_500Medium',
  semibold: 'GoogleSans_600SemiBold',
};

const VARIANT_TOKEN_KEY: Record<BodyVariant, string> = {
  large: 'bodyLarge',
  medium: 'bodyMedium',
  small: 'bodySmall',
  labelLarge: 'labelLarge',
  labelMedium: 'labelMedium',
  labelSmall: 'labelSmall',
};

const { typeScale: ts } = sys;

export function BodyText({
  variant = 'medium',
  emphasized = false,
  color,
  style,
  ...rest
}: BodyTextProps) {
  const token = ts[VARIANT_TOKEN_KEY[variant]];
  const weight = emphasized ? token.sysFontWeightEmphasized : token.sysFontWeight;

  return (
    <Text
      style={[
        {
          fontFamily: FONT_FAMILY[weight],
          fontSize: token.sysFontSize,
          lineHeight: token.sysLineHeight,
          letterSpacing: token.sysTracking,
          color,
        },
        style,
      ]}
      {...rest}
    />
  );
}
