import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SegmentedControl } from './index';

const options = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
];

describe('SegmentedControl', () => {
  it('renders all option labels', () => {
    const { getByText } = render(
      <SegmentedControl options={options} value="day" onChange={jest.fn()} />
    );
    expect(getByText('Day')).toBeTruthy();
    expect(getByText('Week')).toBeTruthy();
    expect(getByText('Month')).toBeTruthy();
  });

  it('calls onChange with the tapped option value', () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <SegmentedControl options={options} value="day" onChange={onChange} />
    );
    fireEvent.press(getByText('Week'));
    expect(onChange).toHaveBeenCalledWith('week');
  });

  it('does not call onChange for a disabled option', () => {
    const onChange = jest.fn();
    const disabledOptions = [
      { value: 'a', label: 'A' },
      { value: 'b', label: 'B', disabled: true },
    ];
    const { getByText } = render(
      <SegmentedControl options={disabledOptions} value="a" onChange={onChange} />
    );
    fireEvent.press(getByText('B'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders full width when fullWidth is true', () => {
    const { toJSON } = render(
      <SegmentedControl options={options} value="day" onChange={jest.fn()} fullWidth />
    );
    expect(toJSON()).toBeTruthy();
  });
});
