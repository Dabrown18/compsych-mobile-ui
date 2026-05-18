import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Snackbar } from './index';

describe('Snackbar', () => {
  it('renders message when visible', () => {
    const { getByText } = render(
      <Snackbar visible message="Changes saved" onClose={jest.fn()} />
    );
    expect(getByText('Changes saved')).toBeTruthy();
  });

  it('does not render message when not visible', () => {
    const { queryByText } = render(
      <Snackbar visible={false} message="Changes saved" onClose={jest.fn()} />
    );
    expect(queryByText('Changes saved')).toBeNull();
  });

  it('calls onAction when action button is pressed', () => {
    const onAction = jest.fn();
    const { getByText } = render(
      <Snackbar visible message="Item deleted" actionLabel="Undo" onAction={onAction} onClose={jest.fn()} />
    );
    fireEvent.press(getByText('Undo'));
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when close button is pressed', () => {
    const onClose = jest.fn();
    const { getByRole } = render(
      <Snackbar visible message="Done" onClose={onClose} />
    );
    fireEvent.press(getByRole('button', { name: 'Dismiss' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it.each(['filled', 'outlined'] as const)('renders variant "%s" without crashing', (variant) => {
    const { getByText } = render(
      <Snackbar visible message="Hello" variant={variant} onClose={jest.fn()} />
    );
    expect(getByText('Hello')).toBeTruthy();
  });
});
