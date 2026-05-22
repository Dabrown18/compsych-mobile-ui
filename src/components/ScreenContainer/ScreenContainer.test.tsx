import React, { createRef } from 'react';

import { ScrollView, Text } from 'react-native';

import { render } from '@testing-library/react-native';

import { ScreenContainer } from './index';

describe('ScreenContainer', () => {
  it('renders children', () => {
    const { getByText } = render(
      <ScreenContainer>
        <Text>Screen content</Text>
      </ScreenContainer>,
    );
    expect(getByText('Screen content')).toBeTruthy();
  });

  it('renders multiple children', () => {
    const { getByText } = render(
      <ScreenContainer>
        <Text>First</Text>
        <Text>Second</Text>
      </ScreenContainer>,
    );
    expect(getByText('First')).toBeTruthy();
    expect(getByText('Second')).toBeTruthy();
  });

  it('forwards ref to the underlying ScrollView', () => {
    const ref = createRef<ScrollView>();
    render(
      <ScreenContainer ref={ref}>
        <Text>content</Text>
      </ScreenContainer>,
    );
    expect(ref.current).not.toBeNull();
  });
});
