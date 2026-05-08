import React from 'react';
import { Text, type TextProps } from 'react-native';
import { useFonts } from 'expo-font';

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

const VARIANT_TOKEN_KEY: Record<HeaderVariant, keyof typeof sys.typeScale> = {
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
  const [fontsLoaded] = useFonts({
    GoogleSans_400Regular: require('./fonts/GoogleSans_400Regular.ttf'),
    GoogleSans_500Medium: require('./fonts/GoogleSans_500Medium.ttf'),
    GoogleSans_600SemiBold: require('./fonts/GoogleSans_600SemiBold.ttf'),
  });

  const token = ts[VARIANT_TOKEN_KEY[variant]];
  const weight = emphasized ? token.sysFontWeightEmphasized : token.sysFontWeight;

  return (
    <Text
      accessibilityRole="header"
      style={[
        {
          fontFamily: fontsLoaded ? FONT_FAMILY[weight] : undefined,
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
