import React from 'react';

import { fireEvent, render } from '@testing-library/react-native';

import { Checkbox } from './index';

describe('Checkbox', () => {
  it('renders label', () => {
    const { getByText } = render(<Checkbox label="Accept terms" />);
    expect(getByText('Accept terms')).toBeTruthy();
  });

  it('renders description when provided', () => {
    const { getByText } = render(<Checkbox label="Subscribe" description="Get weekly updates" />);
    expect(getByText('Get weekly updates')).toBeTruthy();
  });

  it('calls onChange when pressed', () => {
    const onChange = jest.fn();
    const { getByRole } = render(<Checkbox label="Check me" checked={false} onChange={onChange} />);
    fireEvent.press(getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('does not call onChange when disabled', () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <Checkbox label="Disabled" checked={false} onChange={onChange} disabled />,
    );
    fireEvent.press(getByRole('checkbox'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders indeterminate state', () => {
    const { getByRole } = render(<Checkbox label="Indeterminate" checked="indeterminate" />);
    expect(getByRole('checkbox')).toBeTruthy();
  });

  it.each(['sm', 'md'] as const)('renders size "%s" without crashing', (size) => {
    const { getByText } = render(<Checkbox label="Size test" size={size} />);
    expect(getByText('Size test')).toBeTruthy();
  });
});
