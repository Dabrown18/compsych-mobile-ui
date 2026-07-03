import React, { useCallback, useMemo, useState } from 'react';

import {
  I18nManager,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useTheme } from '../../theme';

export interface DateTimePickerProps {
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
  availableTimes: string[];
  availableTimeLabel: string;
  maxMonthsAhead?: number;
}

const DAY_HEADERS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

function toLocalDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function addMonths(date: Date, count: number): Date {
  const result = new Date(date.getFullYear(), date.getMonth() + count, 1);
  return result;
}

export function DateTimePicker({
  selectedDate,
  onSelectDate,
  selectedTime,
  onSelectTime,
  availableTimes,
  availableTimeLabel,
  maxMonthsAhead = 1,
}: DateTimePickerProps) {
  const { colorRoles: cr } = useTheme();

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const maxDate = useMemo(() => {
    const d = addMonths(today, maxMonthsAhead);
    // Last day of the maxMonthsAhead month
    return new Date(d.getFullYear(), d.getMonth() + 1, 0);
  }, [today, maxMonthsAhead]);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const canGoPrev = useMemo(() => {
    return viewYear > today.getFullYear() || viewMonth > today.getMonth();
  }, [viewYear, viewMonth, today]);

  const canGoNext = useMemo(() => {
    const maxMonth = addMonths(today, maxMonthsAhead);
    return (
      viewYear < maxMonth.getFullYear() ||
      (viewYear === maxMonth.getFullYear() && viewMonth < maxMonth.getMonth())
    );
  }, [viewYear, viewMonth, today, maxMonthsAhead]);

  const handlePrevMonth = useCallback(() => {
    if (!canGoPrev) return;
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  }, [canGoPrev, viewMonth]);

  const handleNextMonth = useCallback(() => {
    if (!canGoNext) return;
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  }, [canGoNext, viewMonth]);

  const monthLabel = useMemo(() => {
    const d = new Date(viewYear, viewMonth, 1);
    return d.toLocaleString('default', { month: 'long', year: 'numeric' });
  }, [viewYear, viewMonth]);

  // Build calendar grid
  const calendarDays = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const cells: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    // Pad to complete last row
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [viewYear, viewMonth]);

  const isDisabled = useCallback(
    (day: number) => {
      const d = new Date(viewYear, viewMonth, day);
      d.setHours(0, 0, 0, 0);
      return d < today || d > maxDate;
    },
    [viewYear, viewMonth, today, maxDate],
  );

  const isSelected = useCallback(
    (day: number) => {
      const d = new Date(viewYear, viewMonth, day);
      return toLocalDateString(d) === selectedDate;
    },
    [viewYear, viewMonth, selectedDate],
  );

  const handleDayPress = useCallback(
    (day: number) => {
      if (isDisabled(day)) return;
      const d = new Date(viewYear, viewMonth, day);
      onSelectDate(toLocalDateString(d));
    },
    [viewYear, viewMonth, isDisabled, onSelectDate],
  );

  const sysPrimary = cr.accent.primary.sysPrimary;
  const sysOutline = cr.outline.sysOutline;
  const sysOnSurface = cr.surface.surface.sysOnSurface;
  const sysOnSurfaceVariant = cr.surface.surface.sysOnSurfaceVariant;
  const sysSurfaceContainerHighest =
    cr.surface.surfaceContainer.sysSurfaceContainerHighest;

  const prevChevron = I18nManager.isRTL ? '>' : '<';
  const nextChevron = I18nManager.isRTL ? '<' : '>';

  const weeks: (number | null)[][] = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }

  return (
    <View
      testID="calendar-picker"
      style={[
        styles.card,
        { borderColor: sysOutline, backgroundColor: '#FFFFFF' },
      ]}
    >
      {/* Calendar section */}
      <View style={styles.calendarSection}>
        {/* Month nav row */}
        <View style={styles.monthNavRow}>
          <Pressable
            testID="calendar-prev-button"
            onPress={handlePrevMonth}
            style={[styles.navButton, !canGoPrev && styles.navButtonDisabled]}
            disabled={!canGoPrev}
            accessibilityRole="button"
            accessibilityLabel="Previous month"
          >
            <Text
              style={[
                styles.navChevron,
                { color: canGoPrev ? sysOnSurface : sysOnSurfaceVariant },
              ]}
            >
              {prevChevron}
            </Text>
          </Pressable>

          <Text
            testID="calendar-month-label"
            style={[styles.monthLabel, { color: sysOnSurface }]}
          >
            {monthLabel}
          </Text>

          <Pressable
            testID="calendar-next-button"
            onPress={handleNextMonth}
            style={[styles.navButton, !canGoNext && styles.navButtonDisabled]}
            disabled={!canGoNext}
            accessibilityRole="button"
            accessibilityLabel="Next month"
          >
            <Text
              style={[
                styles.navChevron,
                { color: canGoNext ? sysOnSurface : sysOnSurfaceVariant },
              ]}
            >
              {nextChevron}
            </Text>
          </Pressable>
        </View>

        {/* Day headers */}
        <View style={styles.weekRow}>
          {DAY_HEADERS.map((h) => (
            <View key={h} style={styles.dayCell}>
              <Text
                testID={`day-header-${h}`}
                style={[styles.dayHeader, { color: sysOnSurfaceVariant }]}
              >
                {h}
              </Text>
            </View>
          ))}
        </View>

        {/* Week rows */}
        {weeks.map((week, wi) => (
          <View key={wi} style={styles.weekRow}>
            {week.map((day, di) => {
              if (day === null) {
                return <View key={`empty-${di}`} style={styles.dayCell} />;
              }
              const disabled = isDisabled(day);
              const selected = isSelected(day);

              const cellStyle = [
                styles.dayCellInner,
                !disabled &&
                  !selected && { backgroundColor: sysSurfaceContainerHighest },
                selected && {
                  backgroundColor: '#FFFFFF',
                  borderColor: sysPrimary,
                  borderWidth: 2,
                },
                disabled && styles.dayCellDisabled,
              ];

              const textStyle = [
                styles.dayText,
                { color: selected ? sysPrimary : sysOnSurface },
              ];

              return (
                <Pressable
                  key={day}
                  testID={`calendar-day-${day}`}
                  style={styles.dayCell}
                  onPress={() => handleDayPress(day)}
                  disabled={disabled}
                  accessibilityRole="button"
                  accessibilityLabel={`Day ${day}`}
                  accessibilityState={{ disabled, selected }}
                >
                  <View style={cellStyle}>
                    <Text style={textStyle}>{day}</Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>

      {/* Divider + time section */}
      {selectedDate != null && (
        <>
          <View style={[styles.divider, { backgroundColor: sysOutline }]} />
          <View style={styles.timeSection}>
            <Text
              testID="available-time-label"
              style={[styles.availableTimeLabel, { color: sysOnSurface }]}
            >
              {availableTimeLabel}
            </Text>
            <ScrollView
              testID="time-slot-list"
              style={styles.timeList}
              contentContainerStyle={styles.timeListContent}
              showsVerticalScrollIndicator={false}
            >
              {availableTimes.map((slot) => {
                const slotTestId = `time-slot-${slot.replace(/[: ]/g, '-')}`;
                const slotSelected = slot === selectedTime;
                return (
                  <Pressable
                    key={slot}
                    testID={slotTestId}
                    onPress={() => onSelectTime(slot)}
                    accessibilityRole="button"
                    accessibilityState={{ selected: slotSelected }}
                    style={[
                      styles.timeSlot,
                      {
                        borderColor: slotSelected ? sysPrimary : sysOutline,
                        borderWidth: slotSelected ? 2 : 1.5,
                        backgroundColor: '#FFFFFF',
                      },
                      slotSelected && {
                        shadowColor: sysPrimary,
                        shadowOffset: { width: 1, height: 2 },
                        shadowOpacity: 1,
                        shadowRadius: 0,
                        elevation: 2,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.timeSlotText,
                        { color: slotSelected ? sysPrimary : sysOnSurface },
                      ]}
                    >
                      {slot}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  calendarSection: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  monthNavRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  navButton: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonDisabled: {
    opacity: 0.3,
  },
  navChevron: {
    fontSize: 18,
    fontWeight: '600',
  },
  monthLabel: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
  },
  weekRow: {
    flexDirection: 'row',
  },
  dayCell: {
    flex: 1,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayHeader: {
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'center',
  },
  dayCellInner: {
    width: '80%',
    aspectRatio: 1,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderColor: 'transparent',
  },
  dayCellDisabled: {
    opacity: 0.3,
  },
  dayText: {
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
  },
  divider: {
    height: 1,
    width: '100%',
  },
  timeSection: {
    padding: 16,
  },
  availableTimeLabel: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 12,
  },
  timeList: {
    maxHeight: 200,
  },
  timeListContent: {
    gap: 8,
  },
  timeSlot: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeSlotText: {
    fontSize: 14,
    textAlign: 'center',
  },
});
