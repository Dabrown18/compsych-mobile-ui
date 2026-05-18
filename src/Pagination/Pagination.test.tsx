import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Pagination } from './index';

describe('Pagination', () => {
  it('renders current and total page info', () => {
    const { getByText } = render(
      <Pagination currentPage={2} totalPages={10} onPageChange={jest.fn()} />
    );
    expect(getByText('2')).toBeTruthy();
    expect(getByText('10')).toBeTruthy();
  });

  it('calls onPageChange with next page when next is pressed', () => {
    const onPageChange = jest.fn();
    const { getByLabelText } = render(
      <Pagination currentPage={3} totalPages={10} onPageChange={onPageChange} />
    );
    fireEvent.press(getByLabelText('Next page'));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it('calls onPageChange with previous page when prev is pressed', () => {
    const onPageChange = jest.fn();
    const { getByLabelText } = render(
      <Pagination currentPage={3} totalPages={10} onPageChange={onPageChange} />
    );
    fireEvent.press(getByLabelText('Previous page'));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it.each(['sm', 'md'] as const)('renders size "%s" without crashing', (size) => {
    const { toJSON } = render(
      <Pagination currentPage={1} totalPages={5} onPageChange={jest.fn()} size={size} />
    );
    expect(toJSON()).toBeTruthy();
  });
});
