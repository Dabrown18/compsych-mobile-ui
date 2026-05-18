import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Switch } from './index';

describe('Switch', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<Switch />);
    expect(toJSON()).toBeTruthy();
  });

  it('calls onValueChange when toggled', () => {
    const onValueChange = jest.fn();
    const { getByRole } = render(
      <Switch value={false} onValueChange={onValueChange} />
    );
    fireEvent.press(getByRole('switch'));
    expect(onValueChange).toHaveBeenCalledWith(true);
  });

  it('does not call onValueChange when disabled', () => {
    const onValueChange = jest.fn();
    const { getByRole } = render(
      <Switch value={false} onValueChange={onValueChange} disabled />
    );
    fireEvent.press(getByRole('switch'));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('reflects on state', () => {
    const { getByRole } = render(<Switch value={true} />);
    expect(getByRole('switch')).toBeTruthy();
  });
});
