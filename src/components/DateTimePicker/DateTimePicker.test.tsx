import React from 'react';

import { fireEvent, render } from '@testing-library/react-native';

import { DateTimePicker } from './index';

jest.mock('../../theme', () => ({
  useTheme: () => ({
    colorRoles: {
      accent: {
        primary: {
          sysPrimary: '#0057B8',
          sysOnPrimary: '#FFFFFF',
        },
      },
      outline: {
        sysOutline: '#C4C4C4',
      },
      surface: {
        surface: {
          sysOnSurface: '#1A1A1A',
          sysOnSurfaceVariant: '#6B6B6B',
          sysSurface: '#FFFFFF',
        },
        surfaceContainer: {
          sysSurfaceContainerLowest: '#FFFFFF',
          sysSurfaceContainer: '#F5F5F5',
        },
      },
    },
    dimensions: {
      spacing: { padding: { sysPadding8: 8, sysPadding16: 16 } },
      borderRadius: { sysRadiusFull: 999 },
      borderWidth: { sysStrokeThin: 1, sysStrokeMedium: 1.5 },
    },
    typeScale: {
      labelSmall: { sysFontSize: 12, sysLineHeight: 16 },
      labelMedium: { sysFontSize: 14, sysLineHeight: 20 },
    },
    iconography: { sysSizeXs: 16, sysSizeSm: 20, sysSizeMd: 24 },
  }),
}));

const BASE_PROPS = {
  selectedDate: null,
  onSelectDate: jest.fn(),
  selectedTime: null,
  onSelectTime: jest.fn(),
  availableTimes: ['10:00 AM', '10:30 AM', '11:00 AM'],
  availableTimeLabel: 'Available time',
  maxMonthsAhead: 1,
};

describe('DateTimePicker', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Fix current date to avoid flakiness: 2026-07-02
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2026, 6, 2));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders without crashing', () => {
    const { getByTestId } = render(<DateTimePicker {...BASE_PROPS} />);
    expect(getByTestId('calendar-picker')).toBeTruthy();
    expect(getByTestId('calendar-month-label')).toBeTruthy();
    expect(getByTestId('calendar-prev-button')).toBeTruthy();
    expect(getByTestId('calendar-next-button')).toBeTruthy();
  });

  it('does not show time slots when no date is selected', () => {
    const { queryByTestId } = render(<DateTimePicker {...BASE_PROPS} />);
    expect(queryByTestId('time-slot-list')).toBeNull();
    expect(queryByTestId('available-time-label')).toBeNull();
  });

  it('shows time slots after a date is selected', () => {
    const { getByTestId } = render(
      <DateTimePicker {...BASE_PROPS} selectedDate="2026-07-10" />,
    );
    expect(getByTestId('time-slot-list')).toBeTruthy();
    expect(getByTestId('available-time-label')).toBeTruthy();
  });

  it('calls onSelectDate when a day is tapped', () => {
    const onSelectDate = jest.fn();
    const { getByTestId } = render(
      <DateTimePicker {...BASE_PROPS} onSelectDate={onSelectDate} />,
    );
    // Day 10 should be enabled (in the future)
    fireEvent.press(getByTestId('calendar-day-10'));
    expect(onSelectDate).toHaveBeenCalledWith('2026-07-10');
  });

  it('calls onSelectTime when a time slot is tapped', () => {
    const onSelectTime = jest.fn();
    const { getByTestId } = render(
      <DateTimePicker
        {...BASE_PROPS}
        selectedDate="2026-07-10"
        onSelectTime={onSelectTime}
      />,
    );
    fireEvent.press(getByTestId('time-slot-10-00-AM'));
    expect(onSelectTime).toHaveBeenCalledWith('10:00 AM');
  });

  it('does not show the language/timezone info row when neither label is provided', () => {
    const { queryByTestId } = render(<DateTimePicker {...BASE_PROPS} />);
    expect(queryByTestId('calendar-info-row')).toBeNull();
  });

  it('shows the language label when provided', () => {
    const { getByTestId, getByText } = render(
      <DateTimePicker {...BASE_PROPS} languageLabel="English" />,
    );
    expect(getByTestId('calendar-language-info')).toBeTruthy();
    expect(getByText('English')).toBeTruthy();
  });

  it('shows the timezone label when provided', () => {
    const { getByTestId, getByText } = render(
      <DateTimePicker {...BASE_PROPS} timezoneLabel="America/Chicago" />,
    );
    expect(getByTestId('calendar-timezone-info')).toBeTruthy();
    expect(getByText('America/Chicago')).toBeTruthy();
  });

  it('renders the language/timezone info as non-interactive (no press handler)', () => {
    const { getByTestId } = render(
      <DateTimePicker
        {...BASE_PROPS}
        languageLabel="English"
        timezoneLabel="America/Chicago"
      />,
    );
    expect(getByTestId('calendar-language-info').props.onPress).toBeUndefined();
    expect(getByTestId('calendar-timezone-info').props.onPress).toBeUndefined();
  });
});
