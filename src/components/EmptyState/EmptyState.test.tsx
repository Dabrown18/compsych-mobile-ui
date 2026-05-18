import React from 'react';

import { fireEvent, render } from '@testing-library/react-native';

import { EmptyState } from './index';

describe('EmptyState', () => {
  it('renders title and description', () => {
    const { getByText } = render(
      <EmptyState
        title="Nothing here"
        description="Add something to get started"
      />,
    );
    expect(getByText('Nothing here')).toBeTruthy();
    expect(getByText('Add something to get started')).toBeTruthy();
  });

  it('renders action button and handles press', () => {
    const onAction = jest.fn();
    const { getByText } = render(
      <EmptyState
        title="No results"
        description="Try a different search"
        actionLabel="Clear filters"
        onAction={onAction}
      />,
    );
    fireEvent.press(getByText('Clear filters'));
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it.each(['desktop', 'mobile'] as const)(
    'renders viewport "%s" without crashing',
    (viewport) => {
      const { getByText } = render(
        <EmptyState
          title="Empty"
          description="Nothing to show"
          viewport={viewport}
        />,
      );
      expect(getByText('Empty')).toBeTruthy();
    },
  );

  it.each(['icon', 'illustration'] as const)(
    'renders style "%s" without crashing',
    (emptyStyle) => {
      const { getByText } = render(
        <EmptyState
          title="Empty"
          description="Nothing"
          emptyStyle={emptyStyle}
        />,
      );
      expect(getByText('Empty')).toBeTruthy();
    },
  );
});
