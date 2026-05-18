import React from 'react';
import { render } from '@testing-library/react-native';
import { BodyText } from './index';

describe('BodyText', () => {
  it('renders children', () => {
    const { getByText } = render(<BodyText>Hello world</BodyText>);
    expect(getByText('Hello world')).toBeTruthy();
  });

  it.each(['small', 'medium', 'large', 'labelMedium', 'labelLarge'] as const)(
    'renders variant "%s" without crashing',
    (variant) => {
      const { getByText } = render(<BodyText variant={variant}>Text</BodyText>);
      expect(getByText('Text')).toBeTruthy();
    }
  );

  it('applies custom color', () => {
    const { getByText } = render(<BodyText color="#ff0000">Colored</BodyText>);
    expect(getByText('Colored')).toBeTruthy();
  });

  it('renders emphasized text', () => {
    const { getByText } = render(<BodyText emphasized>Bold</BodyText>);
    expect(getByText('Bold')).toBeTruthy();
  });
});
