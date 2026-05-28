import React from 'react';

import { fireEvent, render } from '@testing-library/react-native';

import { ChatInput } from './index';

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

describe('ChatInput', () => {
  it('renders placeholder text', () => {
    const { getByPlaceholderText } = render(
      <ChatInput
        value=""
        onChangeText={jest.fn()}
        onSend={jest.fn()}
        placeholder="Ask Sol Anything..."
      />,
    );
    expect(getByPlaceholderText('Ask Sol Anything...')).toBeTruthy();
  });

  it('calls onChangeText when text is typed', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <ChatInput
        value=""
        onChangeText={onChangeText}
        onSend={jest.fn()}
        placeholder="Type here"
      />,
    );
    fireEvent.changeText(getByPlaceholderText('Type here'), 'Hello');
    expect(onChangeText).toHaveBeenCalledWith('Hello');
  });

  it('calls onSend when send button is pressed and text is present', () => {
    const onSend = jest.fn();
    const { getByLabelText } = render(
      <ChatInput value="Hello" onChangeText={jest.fn()} onSend={onSend} />,
    );
    fireEvent.press(getByLabelText('Send'));
    expect(onSend).toHaveBeenCalledTimes(1);
  });

  it('does not call onSend when text is empty', () => {
    const onSend = jest.fn();
    const { getByLabelText } = render(
      <ChatInput value="" onChangeText={jest.fn()} onSend={onSend} />,
    );
    fireEvent.press(getByLabelText('Send'));
    expect(onSend).not.toHaveBeenCalled();
  });

  it('renders attach button and calls onAttach when pressed', () => {
    const onAttach = jest.fn();
    const { getByLabelText } = render(
      <ChatInput
        value=""
        onChangeText={jest.fn()}
        onSend={jest.fn()}
        onAttach={onAttach}
      />,
    );
    fireEvent.press(getByLabelText('Add attachment'));
    expect(onAttach).toHaveBeenCalledTimes(1);
  });

  it('does not render attach button when onAttach is not provided', () => {
    const { queryByLabelText } = render(
      <ChatInput value="" onChangeText={jest.fn()} onSend={jest.fn()} />,
    );
    expect(queryByLabelText('Add attachment')).toBeNull();
  });

  it('input is not editable when disabled', () => {
    const { getByLabelText } = render(
      <ChatInput
        value=""
        onChangeText={jest.fn()}
        onSend={jest.fn()}
        disabled
        placeholder="Ask Sol Anything..."
      />,
    );
    const input = getByLabelText('Ask Sol Anything...');
    expect(input.props.editable).toBe(false);
  });
});
