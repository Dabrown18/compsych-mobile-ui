import React from 'react';
import { render } from '@testing-library/react-native';
import { Badge } from './index';

describe('Badge', () => {
  it('renders label text', () => {
    const { getByText } = render(<Badge label="New" />);
    expect(getByText('New')).toBeTruthy();
  });

  it.each(['sm', 'md', 'lg'] as const)('renders size "%s" without crashing', (size) => {
    const { getByText } = render(<Badge label="Badge" size={size} />);
    expect(getByText('Badge')).toBeTruthy();
  });

  it.each(['filled', 'positive', 'danger', 'elevated', 'tonal'] as const)(
    'renders style "%s" without crashing',
    (badgeStyle) => {
      const { getByText } = render(<Badge label="Badge" badgeStyle={badgeStyle} />);
      expect(getByText('Badge')).toBeTruthy();
    }
  );
});
