import React from 'react';

import { fireEvent, render } from '@testing-library/react-native';

import { ServiceCard } from './index';

describe('ServiceCard', () => {
  it('renders title', () => {
    const { getByText } = render(<ServiceCard title="Therapy" />);
    expect(getByText('Therapy')).toBeTruthy();
  });

  it('renders description', () => {
    const { getByText } = render(<ServiceCard title="Therapy" description="One-on-one sessions" />);
    expect(getByText('One-on-one sessions')).toBeTruthy();
  });

  it('calls onPress when interactive and tapped', () => {
    const onPress = jest.fn();
    const { getByLabelText } = render(
      <ServiceCard
        title="Therapy"
        interactive
        onPress={onPress}
        accessibilityLabel="Therapy card"
      />,
    );
    fireEvent.press(getByLabelText('Therapy card'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders in disabled state', () => {
    const { toJSON } = render(
      <ServiceCard title="Therapy" interactive disabled accessibilityLabel="Therapy card" />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it.each(['outlined', 'tonal', 'filled', 'doubled'] as const)(
    'renders variant "%s" without crashing',
    (variant) => {
      const { toJSON } = render(<ServiceCard title="Card" variant={variant} />);
      expect(toJSON()).toBeTruthy();
    },
  );

  it.each(['sm', 'md', 'lg'] as const)('renders size "%s" without crashing', (size) => {
    const { toJSON } = render(<ServiceCard title="Card" size={size} />);
    expect(toJSON()).toBeTruthy();
  });
});
