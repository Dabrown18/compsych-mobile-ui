import React from 'react';

import { fireEvent, render } from '@testing-library/react-native';

import { Input } from './index';

describe('Input', () => {
  it('renders label', () => {
    const { getByText } = render(<Input label="Email" />);
    expect(getByText('Email')).toBeTruthy();
  });

  it('renders helper text', () => {
    const { getByText } = render(<Input label="Email" helperText="Enter your work email" />);
    expect(getByText('Enter your work email')).toBeTruthy();
  });

  it('renders error text when invalid', () => {
    const { getByText } = render(<Input label="Email" invalid errorText="Invalid email address" />);
    expect(getByText('Invalid email address')).toBeTruthy();
  });

  it('calls onChangeText when text changes', () => {
    const onChangeText = jest.fn();
    const { getByDisplayValue } = render(
      <Input label="Name" value="" onChangeText={onChangeText} />,
    );
    fireEvent.changeText(getByDisplayValue(''), 'John');
    expect(onChangeText).toHaveBeenCalledWith('John');
  });

  it.each(['sm', 'md', 'lg'] as const)('renders size "%s" without crashing', (size) => {
    const { getByText } = render(<Input label="Field" size={size} />);
    expect(getByText('Field')).toBeTruthy();
  });
});
