import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { ActionSheet } from './index';

describe('ActionSheet', () => {
  it('renders title when visible', () => {
    const { getByText } = render(
      <ActionSheet visible title="Choose an option" onClose={jest.fn()} />
    );
    expect(getByText('Choose an option')).toBeTruthy();
  });

  it('does not render content when not visible', () => {
    const { queryByText } = render(
      <ActionSheet visible={false} title="Choose an option" onClose={jest.fn()} />
    );
    expect(queryByText('Choose an option')).toBeNull();
  });

  it('calls onClose when close button is pressed', () => {
    const onClose = jest.fn();
    const { getByRole } = render(
      <ActionSheet visible title="Options" onClose={onClose} />
    );
    fireEvent.press(getByRole('button', { name: 'Close' }));
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
      />
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
      />
    );
    fireEvent.press(getByText('Cancel'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders children content', () => {
    const { getByText } = render(
      <ActionSheet visible title="Options" onClose={jest.fn()}>
        <Text>Custom content</Text>
      </ActionSheet>
    );
    expect(getByText('Custom content')).toBeTruthy();
  });
});
