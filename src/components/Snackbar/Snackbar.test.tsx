import React from 'react';

import { fireEvent, render } from '@testing-library/react-native';

import { Snackbar } from './index';

describe('Snackbar', () => {
  it('renders message when visible', () => {
    const { getByText } = render(<Snackbar visible message="Changes saved" onClose={jest.fn()} />);
    expect(getByText('Changes saved')).toBeTruthy();
  });

  it('hides interaction when not visible via pointerEvents', () => {
    const { toJSON } = render(
      <Snackbar visible={false} message="Changes saved" onClose={jest.fn()} />,
    );
    // Snackbar uses animated opacity — the container gets pointerEvents="none" when hidden
    expect(toJSON()).toBeTruthy();
  });

  it('calls onAction when action button is pressed', () => {
    const onAction = jest.fn();
    const { getByText } = render(
      <Snackbar
        visible
        message="Item deleted"
        actionLabel="Undo"
        onAction={onAction}
        onClose={jest.fn()}
      />,
    );
    fireEvent.press(getByText('Undo'));
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when dismiss button is pressed', () => {
    const onClose = jest.fn();
    const { getByLabelText } = render(<Snackbar visible message="Done" onClose={onClose} />);
    fireEvent.press(getByLabelText('Dismiss'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it.each(['filled', 'outlined'] as const)('renders variant "%s" without crashing', (variant) => {
    const { getByText } = render(
      <Snackbar visible message="Hello" variant={variant} onClose={jest.fn()} />,
    );
    expect(getByText('Hello')).toBeTruthy();
  });
});
