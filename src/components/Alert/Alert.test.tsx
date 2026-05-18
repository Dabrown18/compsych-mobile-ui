import React from 'react';

import { fireEvent, render } from '@testing-library/react-native';

import { Alert } from './index';

describe('Alert', () => {
  it('renders description text', () => {
    const { getByText } = render(<Alert description="Something went wrong" />);
    expect(getByText('Something went wrong')).toBeTruthy();
  });

  it('renders title when size is lg', () => {
    const { getByText } = render(<Alert size="lg" title="Heads up" description="Details here" />);
    expect(getByText('Heads up')).toBeTruthy();
  });

  it('does not render title when size is sm', () => {
    const { queryByText } = render(<Alert size="sm" title="Heads up" description="Details here" />);
    expect(queryByText('Heads up')).toBeNull();
  });

  it('calls onAction when action button is pressed', () => {
    const onAction = jest.fn();
    const { getByRole } = render(
      <Alert description="Try again" actionLabel="Retry" onAction={onAction} />,
    );
    fireEvent.press(getByRole('button', { name: 'Retry' }));
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('calls onDismiss when dismiss button is pressed', () => {
    const onDismiss = jest.fn();
    const { getByRole } = render(
      <Alert description="Dismissible" dismissible onDismiss={onDismiss} />,
    );
    fireEvent.press(getByRole('button', { name: 'Dismiss' }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it.each(['default', 'elevated', 'informative', 'warning', 'positive', 'danger'] as const)(
    'renders variant "%s" without crashing',
    (variant) => {
      const { toJSON } = render(<Alert variant={variant} description="Test" />);
      expect(toJSON()).toBeTruthy();
    },
  );

  it('hides icon when hideIcon is true', () => {
    const { toJSON } = render(<Alert description="No icon" hideIcon />);
    expect(toJSON()).toBeTruthy();
  });
});
