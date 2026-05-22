import React from 'react';

import { ScrollView, type ScrollViewProps } from 'react-native';

import { sys } from '../../tokens';

const { dimensions: dim, colorRoles: cr } = sys;

export interface ScreenContainerProps extends ScrollViewProps {
  children?: React.ReactNode;
}

/**
 * Scrollable screen wrapper that applies the default surface background and
 * standard padding. The ref is forwarded to the underlying ScrollView so
 * callers can imperatively scroll, measure, or attach scroll listeners.
 *
 * @example
 * const scrollRef = useRef<ScrollView>(null);
 * <ScreenContainer ref={scrollRef}>...</ScreenContainer>
 */
export const ScreenContainer = React.forwardRef<
  ScrollView,
  ScreenContainerProps
>(function ScreenContainer(
  { children, style, contentContainerStyle, ...rest },
  ref,
) {
  return (
    <ScrollView
      ref={ref}
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
});
