import React from 'react';

import { render } from '@testing-library/react-native';

import { Avatar } from './index';

describe('Avatar', () => {
  it('renders initials in text variant', () => {
    const { getByText } = render(<Avatar variant="text" initials="CP" />);
    expect(getByText('CP')).toBeTruthy();
  });

  it('renders image variant without crashing', () => {
    const { getByLabelText } = render(
      <Avatar
        variant="image"
        source={{ uri: 'https://example.com/avatar.jpg' }}
        accessibilityLabel="User avatar"
      />,
    );
    expect(getByLabelText('User avatar')).toBeTruthy();
  });

  it('renders icon variant without crashing', () => {
    const { getByLabelText } = render(<Avatar variant="icon" accessibilityLabel="Icon avatar" />);
    expect(getByLabelText('Icon avatar')).toBeTruthy();
  });

  it.each(['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const)(
    'renders size "%s" without crashing',
    (size) => {
      const { getByText } = render(<Avatar variant="text" initials="AB" size={size} />);
      expect(getByText('AB')).toBeTruthy();
    },
  );

  it('renders activity ring when activityRing is true', () => {
    const { getByLabelText } = render(
      <Avatar variant="text" initials="CP" activityRing accessibilityLabel="Active user" />,
    );
    expect(getByLabelText('Active user')).toBeTruthy();
  });
});
