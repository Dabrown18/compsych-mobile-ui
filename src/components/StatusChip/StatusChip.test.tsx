import React from 'react';

import { render, screen } from '@testing-library/react-native';

import { ThemeProvider } from '../../theme';
import { StatusChip } from './index';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('StatusChip', () => {
  it('renders the label', () => {
    renderWithTheme(<StatusChip label="10 minutes remaining" />);
    expect(screen.getByText('10 minutes remaining')).toBeTruthy();
  });

  it('renders warning variant by default', () => {
    renderWithTheme(<StatusChip label="Warning" />);
    expect(screen.getByText('Warning')).toBeTruthy();
  });

  it('renders error variant', () => {
    renderWithTheme(<StatusChip label="Session ended" variant="error" />);
    expect(screen.getByText('Session ended')).toBeTruthy();
  });

  it('accepts a custom icon', () => {
    renderWithTheme(<StatusChip label="Custom" icon="TimerIcon" />);
    expect(screen.getByText('Custom')).toBeTruthy();
  });

  it('renders with left alignment', () => {
    renderWithTheme(<StatusChip label="Left" align="left" />);
    expect(screen.getByText('Left')).toBeTruthy();
  });

  it('renders with right alignment', () => {
    renderWithTheme(<StatusChip label="Right" align="right" />);
    expect(screen.getByText('Right')).toBeTruthy();
  });

  it('renders fullWidth', () => {
    renderWithTheme(<StatusChip label="Full" fullWidth />);
    expect(screen.getByText('Full')).toBeTruthy();
  });
});
