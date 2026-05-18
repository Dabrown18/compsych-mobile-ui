import React from 'react';

import { fireEvent, render } from '@testing-library/react-native';

import { RadioButton } from './index';

describe('RadioButton', () => {
  it('renders label', () => {
    const { getByText } = render(<RadioButton label="Option A" />);
    expect(getByText('Option A')).toBeTruthy();
  });

  it('renders description when provided', () => {
    const { getByText } = render(
      <RadioButton label="Option A" description="Best for most users" />,
    );
    expect(getByText('Best for most users')).toBeTruthy();
  });

  it('calls onChange when pressed', () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <RadioButton label="Option A" checked={false} onChange={onChange} />,
    );
    fireEvent.press(getByRole('radio'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('does not call onChange when disabled', () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <RadioButton
        label="Option A"
        checked={false}
        onChange={onChange}
        disabled
      />,
    );
    fireEvent.press(getByRole('radio'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it.each(['sm', 'md'] as const)(
    'renders size "%s" without crashing',
    (size) => {
      const { getByText } = render(<RadioButton label="Option" size={size} />);
      expect(getByText('Option')).toBeTruthy();
    },
  );
});
