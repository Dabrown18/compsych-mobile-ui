import React from 'react';

import { fireEvent, render } from '@testing-library/react-native';

import { SelectionCard } from './index';

describe('SelectionCard', () => {
  it('renders title', () => {
    const { getByText } = render(<SelectionCard title="Option A" />);
    expect(getByText('Option A')).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    const { getByText } = render(<SelectionCard title="Option A" onPress={onPress} />);
    fireEvent.press(getByText('Option A'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders disabled state', () => {
    const { toJSON } = render(<SelectionCard title="Option A" disabled />);
    expect(toJSON()).toBeTruthy();
  });

  it.each(['sm', 'md'] as const)('renders size "%s" without crashing', (size) => {
    const { getByText } = render(<SelectionCard title="Option" size={size} />);
    expect(getByText('Option')).toBeTruthy();
  });

  it('renders selected state', () => {
    const { toJSON } = render(<SelectionCard title="Selected" selected />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders multi-select variant', () => {
    const { toJSON } = render(<SelectionCard title="Multi" multiSelect selected />);
    expect(toJSON()).toBeTruthy();
  });
});
