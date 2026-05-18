import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from './index';

describe('Button', () => {
  it('renders label', () => {
    const { getByText } = render(<Button label="Submit" />);
    expect(getByText('Submit')).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    const { getByRole } = render(<Button label="Submit" onPress={onPress} />);
    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('is accessible as disabled when disabled prop is set', () => {
    const { getByRole } = render(<Button label="Submit" disabled />);
    expect(getByRole('button').props.accessibilityState.disabled).toBe(true);
  });

  it.each(['filled', 'tonal', 'outlined', 'elevated', 'text'] as const)(
    'renders variant "%s" without crashing',
    (variant) => {
      const { getByText } = render(<Button label="Button" variant={variant} />);
      expect(getByText('Button')).toBeTruthy();
    }
  );

  it.each(['sm', 'md', 'lg', 'xl'] as const)('renders size "%s" without crashing', (size) => {
    const { getByText } = render(<Button label="Button" size={size} />);
    expect(getByText('Button')).toBeTruthy();
  });

  it('renders in full width mode', () => {
    const { getByText } = render(<Button label="Full" fullWidth />);
    expect(getByText('Full')).toBeTruthy();
  });
});
