import React from 'react';

import { render } from '@testing-library/react-native';

import { Divider } from './index';

describe('Divider', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<Divider />);
    expect(toJSON()).toBeTruthy();
  });

  it.each(['full', 'inset', 'middle'] as const)(
    'renders variant "%s" without crashing',
    (variant) => {
      const { toJSON } = render(<Divider variant={variant} />);
      expect(toJSON()).toBeTruthy();
    },
  );

  it.each(['thin', 'medium', 'thick'] as const)(
    'renders weight "%s" without crashing',
    (weight) => {
      const { toJSON } = render(<Divider weight={weight} />);
      expect(toJSON()).toBeTruthy();
    },
  );
});
