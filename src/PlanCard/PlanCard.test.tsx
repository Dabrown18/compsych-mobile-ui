import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { PlanCard, PlanCardDropdownItem } from './index';

const items = [
  { id: '1', title: 'Session 1', subtitle: 'Introduction', checked: false },
  { id: '2', title: 'Session 2', subtitle: 'Deep work', checked: true },
];

describe('PlanCard', () => {
  it('renders title', () => {
    const { getByText } = render(<PlanCard title="My Plan" />);
    expect(getByText('My Plan')).toBeTruthy();
  });

  it('renders tag when provided', () => {
    const { getByText } = render(<PlanCard title="Plan" tag="Recommended" />);
    expect(getByText('Recommended')).toBeTruthy();
  });

  it('renders items when expanded', () => {
    const { getByText } = render(
      <PlanCard title="Plan" items={items} expanded />
    );
    expect(getByText('Session 1')).toBeTruthy();
    expect(getByText('Session 2')).toBeTruthy();
  });

  it('calls onToggle when header is pressed', () => {
    const onToggle = jest.fn();
    const { getByText } = render(<PlanCard title="Plan" onToggle={onToggle} />);
    fireEvent.press(getByText('Plan'));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
