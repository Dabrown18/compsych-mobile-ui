import React from 'react';
import { render } from '@testing-library/react-native';
import { Tooltip } from './index';

describe('Tooltip', () => {
  it('renders tooltip text', () => {
    const { getByText } = render(<Tooltip text="Helpful hint" />);
    expect(getByText('Helpful hint')).toBeTruthy();
  });

  it.each(['filled', 'elevated'] as const)('renders variant "%s" without crashing', (variant) => {
    const { getByText } = render(<Tooltip text="Hint" variant={variant} />);
    expect(getByText('Hint')).toBeTruthy();
  });

  it.each(['none', 'top', 'bottom', 'left', 'right'] as const)(
    'renders direction "%s" without crashing',
    (direction) => {
      const { getByText } = render(<Tooltip text="Hint" direction={direction} />);
      expect(getByText('Hint')).toBeTruthy();
    }
  );
});
