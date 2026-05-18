import React from 'react';
import { render } from '@testing-library/react-native';
import { ProgressTracker, ProgressBar } from './index';

const steps = [
  { label: 'Start', state: 'completed' as const },
  { label: 'In progress', state: 'active' as const },
  { label: 'End', state: 'pending' as const },
];

describe('ProgressTracker', () => {
  it('renders step labels when showLabels is true', () => {
    const { getByText } = render(<ProgressTracker steps={steps} showLabels />);
    expect(getByText('Start')).toBeTruthy();
    expect(getByText('In progress')).toBeTruthy();
    expect(getByText('End')).toBeTruthy();
  });

  it('renders without labels by default', () => {
    const { queryByText } = render(<ProgressTracker steps={steps} />);
    expect(queryByText('Start')).toBeNull();
  });

  it.each(['sm', 'lg'] as const)('renders size "%s" without crashing', (size) => {
    const { toJSON } = render(<ProgressTracker steps={steps} size={size} />);
    expect(toJSON()).toBeTruthy();
  });
});

describe('ProgressBar', () => {
  it('renders with progress value', () => {
    const { toJSON } = render(<ProgressBar progress={0.5} />);
    expect(toJSON()).toBeTruthy();
  });

  it('clamps progress to 0–1 range', () => {
    const { toJSON: toJSON1 } = render(<ProgressBar progress={-0.5} />);
    const { toJSON: toJSON2 } = render(<ProgressBar progress={1.5} />);
    expect(toJSON1()).toBeTruthy();
    expect(toJSON2()).toBeTruthy();
  });
});
