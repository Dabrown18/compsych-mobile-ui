import React from 'react';
import { Animated } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { Switch } from './index';

beforeEach(() => {
  jest.spyOn(Animated, 'parallel').mockReturnValue({ start: jest.fn(), stop: jest.fn(), reset: jest.fn() } as any);
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Switch', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<Switch />);
    expect(toJSON()).toBeTruthy();
  });

  it('calls onValueChange with true when toggled on', () => {
    const onValueChange = jest.fn();
    const { getByRole } = render(
      <Switch value={false} onValueChange={onValueChange} />
    );
    fireEvent.press(getByRole('switch'));
    expect(onValueChange).toHaveBeenCalledWith(true);
  });

  it('calls onValueChange with false when toggled off', () => {
    const onValueChange = jest.fn();
    const { getByRole } = render(
      <Switch value={true} onValueChange={onValueChange} />
    );
    fireEvent.press(getByRole('switch'));
    expect(onValueChange).toHaveBeenCalledWith(false);
  });

  it('is accessible as a switch', () => {
    const { getByRole } = render(<Switch value={false} />);
    expect(getByRole('switch')).toBeTruthy();
  });

  it('reflects disabled state in accessibility', () => {
    const { getByRole } = render(<Switch value={false} disabled />);
    expect(getByRole('switch').props.accessibilityState.disabled).toBe(true);
  });
});
