import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { List, ListItem } from './index';

const items = [
  { label: 'Item one' },
  { label: 'Item two' },
];

describe('List', () => {
  it('renders list items from items prop', () => {
    const { getByText } = render(<List items={items} />);
    expect(getByText('Item one')).toBeTruthy();
    expect(getByText('Item two')).toBeTruthy();
  });

  it('renders items with onPress callbacks', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <List items={[{ label: 'Tappable', onPress }]} />
    );
    fireEvent.press(getByText('Tappable'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('ListItem', () => {
  it('renders label', () => {
    const { getByText } = render(<ListItem label="Settings" />);
    expect(getByText('Settings')).toBeTruthy();
  });

  it('renders subLabel when type is detailed', () => {
    const { getByText } = render(
      <ListItem type="detailed" label="Notifications" subLabel="Manage your alerts" />
    );
    expect(getByText('Manage your alerts')).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    const { getByRole } = render(<ListItem label="Tappable" onPress={onPress} />);
    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it.each(['simple', 'detailed'] as const)(
    'renders type "%s" without crashing',
    (type) => {
      const { getByText } = render(<ListItem label="Item" type={type} />);
      expect(getByText('Item')).toBeTruthy();
    }
  );
});
