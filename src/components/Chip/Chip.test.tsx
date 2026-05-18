import React from 'react';

import { fireEvent, render } from '@testing-library/react-native';

import { Chip } from './index';

describe('Chip', () => {
  it('renders label', () => {
    const { getByText } = render(<Chip label="Filter" />);
    expect(getByText('Filter')).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Chip label="Filter" onPress={onPress} />);
    fireEvent.press(getByText('Filter'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders selected state', () => {
    const { toJSON } = render(<Chip label="Selected" selected />);
    expect(toJSON()).toBeTruthy();
  });

  it.each(['sm', 'md', 'lg', 'xl'] as const)(
    'renders size "%s" without crashing',
    (size) => {
      const { getByText } = render(<Chip label="Chip" size={size} />);
      expect(getByText('Chip')).toBeTruthy();
    },
  );

  it.each(['neutral', 'informative', 'positive', 'danger', 'warning'] as const)(
    'renders usage "%s" without crashing',
    (usage) => {
      const { getByText } = render(<Chip label="Chip" usage={usage} />);
      expect(getByText('Chip')).toBeTruthy();
    },
  );
});
