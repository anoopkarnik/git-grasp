import { describe, test, expect } from 'vitest';
;
import { endOfMonth, startOfMonth } from 'date-fns';
import { DatesToDurationString, PeriodToDateRange } from '../../../../lib/helper/dates';

describe('DatesToDurationString', () => {
  test('returns null if start or end is missing', () => {
    expect(DatesToDurationString(null, new Date())).toBeNull();
    expect(DatesToDurationString(new Date(), null)).toBeNull();
    expect(DatesToDurationString(undefined, new Date())).toBeNull();
    expect(DatesToDurationString(new Date(), undefined)).toBeNull();
  });

  test('returns milliseconds if less than 1 second', () => {
    const start = new Date();
    const end = new Date(start.getTime() + 500); // 500ms later
    expect(DatesToDurationString(end, start)).toBe('500ms');
  });

  test('returns minutes and seconds correctly', () => {
    const start = new Date();
    const end = new Date(start.getTime() + 65000); // 65 seconds (1m 5s)
    expect(DatesToDurationString(end, start)).toBe('1m 5s');
  });

  test('handles exact minute cases correctly', () => {
    const start = new Date();
    const end = new Date(start.getTime() + 120000); // 2 minutes
    expect(DatesToDurationString(end, start)).toBe('2m 0s');
  });
});

describe('PeriodToDateRange', () => {
  test('returns correct start and end dates for given period', () => {
    const period = { year: 2024, month: 0 }; // January 2024
    const { startDate, endDate } = PeriodToDateRange(period);

    expect(startDate).toEqual(startOfMonth(new Date(2024, 0)));
    expect(endDate).toEqual(endOfMonth(new Date(2024, 0)));
  });

  test('handles February correctly (leap year)', () => {
    const period = { year: 2024, month: 1 }; // February 2024 (leap year)
    const { startDate, endDate } = PeriodToDateRange(period);

    expect(startDate).toEqual(startOfMonth(new Date(2024, 1)));
    expect(endDate).toEqual(endOfMonth(new Date(2024, 1))); // Should be Feb 29, 2024
  });

  test('handles December correctly', () => {
    const period = { year: 2023, month: 11 }; // December 2023
    const { startDate, endDate } = PeriodToDateRange(period);

    expect(startDate).toEqual(startOfMonth(new Date(2023, 11)));
    expect(endDate).toEqual(endOfMonth(new Date(2023, 11))); // Should be Dec 31, 2023
  });
});
