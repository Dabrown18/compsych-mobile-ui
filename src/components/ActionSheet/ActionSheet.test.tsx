import React from 'react';

import { Text, View } from 'react-native';

import { fireEvent, render } from '@testing-library/react-native';

import { ActionSheet } from './index';

jest.mock('react-native/Libraries/Modal/Modal', () => {
  const mockModal = ({
    children,
    visible,
  }: {
    children: any;
    visible: boolean;
  }) => {
    const { View } = jest.requireActual('react-native');
    const { createElement } = require('react');
    return visible ? createElement(View, null, children) : null;
  };
  mockModal.displayName = 'Modal';
  return { default: mockModal };
});

describe('ActionSheet', () => {
  it('renders title when visible', () => {
    const { getByText } = render(
      <ActionSheet visible title="Choose an option" onClose={jest.fn()} />,
    );
    expect(getByText('Choose an option')).toBeTruthy();
  });

  it('does not render content when not visible', () => {
    const { queryByText } = render(
      <ActionSheet
        visible={false}
        title="Choose an option"
        onClose={jest.fn()}
      />,
    );
    expect(queryByText('Choose an option')).toBeNull();
  });

  it('calls onClose when close button is pressed', () => {
    const onClose = jest.fn();
    const { getByLabelText } = render(
      <ActionSheet visible title="Options" onClose={onClose} />,
    );
    fireEvent.press(getByLabelText('Close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders primary action and handles press', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <ActionSheet
        visible
        title="Options"
        onClose={jest.fn()}
        primaryAction={{ label: 'Confirm', onPress }}
      />,
    );
    fireEvent.press(getByText('Confirm'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders secondary action and handles press', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <ActionSheet
        visible
        title="Options"
        onClose={jest.fn()}
        secondaryAction={{ label: 'Cancel', onPress }}
      />,
    );
    fireEvent.press(getByText('Cancel'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders children content', () => {
    const { getByText } = render(
      <ActionSheet visible title="Options" onClose={jest.fn()}>
        <Text>Custom content</Text>
      </ActionSheet>,
    );
    expect(getByText('Custom content')).toBeTruthy();
  });
});
