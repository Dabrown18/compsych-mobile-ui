import React from 'react';
import { render } from '@testing-library/react-native';
import { HeaderText } from './index';

describe('HeaderText', () => {
  it('renders children', () => {
    const { getByText } = render(<HeaderText>Page Title</HeaderText>);
    expect(getByText('Page Title')).toBeTruthy();
  });

  it.each(['large', 'medium', 'small', 'headlineLarge', 'headlineMedium', 'headlineSmall', 'titleLarge', 'titleMedium', 'titleSmall'] as const)(
    'renders variant "%s" without crashing',
    (variant) => {
      const { getByText } = render(<HeaderText variant={variant}>Title</HeaderText>);
      expect(getByText('Title')).toBeTruthy();
    }
  );

  it('applies custom color', () => {
    const { getByText } = render(<HeaderText color="#0000ff">Blue Title</HeaderText>);
    expect(getByText('Blue Title')).toBeTruthy();
  });

  it('renders emphasized text', () => {
    const { getByText } = render(<HeaderText emphasized>Emphasized</HeaderText>);
    expect(getByText('Emphasized')).toBeTruthy();
  });
});
