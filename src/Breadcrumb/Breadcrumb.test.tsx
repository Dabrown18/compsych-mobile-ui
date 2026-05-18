import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Breadcrumb } from './index';

const items = [
  { label: 'Home', onPress: jest.fn() },
  { label: 'Settings', onPress: jest.fn() },
  { label: 'Profile' },
];

describe('Breadcrumb', () => {
  it('renders all item labels', () => {
    const { getByText } = render(<Breadcrumb items={items} />);
    expect(getByText('Home')).toBeTruthy();
    expect(getByText('Settings')).toBeTruthy();
    expect(getByText('Profile')).toBeTruthy();
  });

  it('calls onPress for a tappable item', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Breadcrumb items={[{ label: 'Home', onPress }, { label: 'Current' }]} />
    );
    fireEvent.press(getByText('Home'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it.each(['sm', 'md', 'lg'] as const)('renders size "%s" without crashing', (size) => {
    const { getByText } = render(<Breadcrumb items={items} size={size} />);
    expect(getByText('Home')).toBeTruthy();
  });
});
