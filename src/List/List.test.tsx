import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { List, ListItem } from './index';

describe('List', () => {
  it('renders list items', () => {
    const { getByText } = render(
      <List>
        <ListItem label="Item one" />
        <ListItem label="Item two" />
      </List>
    );
    expect(getByText('Item one')).toBeTruthy();
    expect(getByText('Item two')).toBeTruthy();
  });
});

describe('ListItem', () => {
  it('renders label', () => {
    const { getByText } = render(<ListItem label="Settings" />);
    expect(getByText('Settings')).toBeTruthy();
  });

  it('renders supporting text', () => {
    const { getByText } = render(
      <ListItem label="Notifications" supportingText="Manage your alerts" />
    );
    expect(getByText('Manage your alerts')).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    const { getByRole } = render(<ListItem label="Tappable" onPress={onPress} />);
    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it.each(['default', 'navigation', 'action'] as const)(
    'renders type "%s" without crashing',
    (type) => {
      const { getByText } = render(<ListItem label="Item" type={type} />);
      expect(getByText('Item')).toBeTruthy();
    }
  );
});
