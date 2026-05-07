import React from 'react';
import { Text, type TextProps } from 'react-native';

import { sys } from './tokens';

export type HeaderVariant =
  | 'large'
  | 'medium'
  | 'small'
  | 'headlineLarge'
  | 'headlineMedium'
  | 'headlineSmall'
  | 'titleLarge'
  | 'titleMedium'
  | 'titleSmall';

export interface HeaderTextProps extends TextProps {
  variant?: HeaderVariant;
  emphasized?: boolean;
  color?: string;
}

const FONT_FAMILY: Record<string, string> = {
  regular: 'GoogleSans_400Regular',
  medium: 'GoogleSans_500Medium',
  semibold: 'GoogleSans_600SemiBold',
};

const VARIANT_TOKEN_KEY: Record<HeaderVariant, string> = {
  large: 'displayLarge',
  medium: 'displayMedium',
  small: 'displaySmall',
  headlineLarge: 'headlineLarge',
  headlineMedium: 'headlineMedium',
  headlineSmall: 'headlineSmall',
  titleLarge: 'titleLarge',
  titleMedium: 'titleMedium',
  titleSmall: 'titleSmall',
};

const { typeScale: ts } = sys;

export function HeaderText({
  variant = 'medium',
  emphasized = false,
  color,
  style,
  ...rest
}: HeaderTextProps) {
  const token = ts[VARIANT_TOKEN_KEY[variant]];
  const weight = emphasized ? token.sysFontWeightEmphasized : token.sysFontWeight;

  return (
    <Text
      accessibilityRole="header"
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
