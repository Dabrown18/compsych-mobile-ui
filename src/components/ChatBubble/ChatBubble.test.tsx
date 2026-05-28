import React from 'react';

import { fireEvent, render } from '@testing-library/react-native';

import { ChatBubble } from './index';

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

describe('ChatBubble', () => {
  it('renders message for incoming variant', () => {
    const { getByText } = render(
      <ChatBubble variant="incoming" message="Hello, how can I help?" />,
    );
    expect(getByText('Hello, how can I help?')).toBeTruthy();
  });

  it('renders message for outgoing variant', () => {
    const { getByText } = render(
      <ChatBubble variant="outgoing" message="I need some help" />,
    );
    expect(getByText('I need some help')).toBeTruthy();
  });

  it('renders timestamp when provided', () => {
    const { getByText } = render(
      <ChatBubble variant="incoming" message="Hi" timestamp="11:30 AM" />,
    );
    expect(getByText('11:30 AM')).toBeTruthy();
  });

  it('does not render timestamp when omitted', () => {
    const { queryByText } = render(
      <ChatBubble variant="incoming" message="Hi" />,
    );
    expect(queryByText('11:30 AM')).toBeNull();
  });

  it('renders thumbs-up button and calls onThumbsUp when pressed', () => {
    const onThumbsUp = jest.fn();
    const { getByLabelText } = render(
      <ChatBubble variant="incoming" message="Hi" onThumbsUp={onThumbsUp} />,
    );
    fireEvent.press(getByLabelText('Thumbs up'));
    expect(onThumbsUp).toHaveBeenCalledTimes(1);
  });

  it('renders thumbs-down button and calls onThumbsDown when pressed', () => {
    const onThumbsDown = jest.fn();
    const { getByLabelText } = render(
      <ChatBubble
        variant="incoming"
        message="Hi"
        onThumbsDown={onThumbsDown}
      />,
    );
    fireEvent.press(getByLabelText('Thumbs down'));
    expect(onThumbsDown).toHaveBeenCalledTimes(1);
  });

  it('does not render reaction buttons for outgoing variant', () => {
    const onThumbsUp = jest.fn();
    const { queryByLabelText } = render(
      <ChatBubble variant="outgoing" message="Hey" onThumbsUp={onThumbsUp} />,
    );
    expect(queryByLabelText('Thumbs up')).toBeNull();
  });

  it('does not render reaction buttons when handlers are not provided', () => {
    const { queryByLabelText } = render(
      <ChatBubble variant="incoming" message="Hi" />,
    );
    expect(queryByLabelText('Thumbs up')).toBeNull();
    expect(queryByLabelText('Thumbs down')).toBeNull();
  });
});
