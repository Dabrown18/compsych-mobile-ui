import React from 'react';

import { fireEvent, render } from '@testing-library/react-native';

import { PromotionCard } from './index';

describe('PromotionCard', () => {
  it('renders title and description', () => {
    const { getByText } = render(
      <PromotionCard title="New feature" description="Check it out" />,
    );
    expect(getByText('New feature')).toBeTruthy();
    expect(getByText('Check it out')).toBeTruthy();
  });

  it('renders chip label when provided', () => {
    const { getByText } = render(
      <PromotionCard title="Card" chipLabel="NEW" />,
    );
    expect(getByText('NEW')).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    const { getByRole } = render(
      <PromotionCard
        title="Promo"
        accessibilityLabel="Promo card"
        onPress={onPress}
      />,
    );
    fireEvent.press(getByRole('button', { name: 'Promo card' }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders disabled state without crashing', () => {
    const { toJSON } = render(
      <PromotionCard
        title="Promo"
        accessibilityLabel="Promo card"
        onPress={jest.fn()}
        disabled
      />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it.each(['filled', 'tonal'] as const)(
    'renders variant "%s" without crashing',
    (variant) => {
      const { toJSON } = render(
        <PromotionCard title="Card" variant={variant} />,
      );
      expect(toJSON()).toBeTruthy();
    },
  );

  it.each(['md', 'lg'] as const)(
    'renders size "%s" without crashing',
    (size) => {
      const { toJSON } = render(<PromotionCard title="Card" size={size} />);
      expect(toJSON()).toBeTruthy();
    },
  );

  it.each(['neutral', 'informative', 'positive', 'danger', 'warning'] as const)(
    'renders usage "%s" without crashing',
    (usage) => {
      const { toJSON } = render(<PromotionCard title="Card" usage={usage} />);
      expect(toJSON()).toBeTruthy();
    },
  );
});
