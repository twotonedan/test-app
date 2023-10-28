import { IAvailableMultiDate, IAvailableSingleDate } from '@/types/cards';
import { toUTC } from '@/utils/timezone';
import { addDays, addMonths } from 'date-fns';

export type AvailableSingleDatesPayload = IAvailableSingleDate[];
export type AvailableMultiDatesPayload = IAvailableMultiDate[];

const baseDate = toUTC(new Date());

export const AVAILABLE_SINGLE_DATES: AvailableSingleDatesPayload = [
  { date: addDays(baseDate, 1), id: 1 },
  { date: addDays(baseDate, 2), id: 2 },
  { date: addDays(baseDate, 3), id: 3 },
  { date: addDays(baseDate, 4), id: 4 },

  { date: addDays(addMonths(baseDate, 1), 1), id: 5 },
  { date: addDays(addMonths(baseDate, 1), 2), id: 6 },
  { date: addDays(addMonths(baseDate, 1), 3), id: 7 },
  { date: addDays(addMonths(baseDate, 1), 4), id: 8 },

  { date: addDays(addMonths(baseDate, 2), 1), id: 9 },
  { date: addDays(addMonths(baseDate, 2), 2), id: 10 },
  { date: addDays(addMonths(baseDate, 2), 3), id: 11 },
  { date: addDays(addMonths(baseDate, 2), 4), id: 12 },

  { date: addDays(addMonths(baseDate, 3), 1), id: 13 },
  { date: addDays(addMonths(baseDate, 3), 2), id: 14 },
  { date: addDays(addMonths(baseDate, 3), 3), id: 15 },
  { date: addDays(addMonths(baseDate, 3), 4), id: 16 },
];

export const AVAILABLE_MULTI_DATES: AvailableMultiDatesPayload = [
  {
    dateRange: {
      start: addDays(baseDate, 1),
      end: addDays(baseDate, 5),
    },
    id: 1,
  },
  {
    dateRange: {
      start: addDays(baseDate, 2),
      end: addDays(baseDate, 6),
    },
    id: 2,
  },
  {
    dateRange: {
      start: addDays(baseDate, 3),
      end: addDays(baseDate, 7),
    },
    id: 3,
  },
  {
    dateRange: {
      start: addDays(baseDate, 4),
      end: addDays(baseDate, 8),
    },
    id: 4,
  },

  {
    dateRange: {
      start: addDays(addMonths(baseDate, 1), 1),
      end: addDays(addMonths(baseDate, 1), 5),
    },
    id: 5,
  },
  {
    dateRange: {
      start: addDays(addMonths(baseDate, 1), 2),
      end: addDays(addMonths(baseDate, 1), 6),
    },
    id: 6,
  },
  {
    dateRange: {
      start: addDays(addMonths(baseDate, 1), 3),
      end: addDays(addMonths(baseDate, 1), 7),
    },
    id: 7,
  },
  {
    dateRange: {
      start: addDays(addMonths(baseDate, 1), 4),
      end: addDays(addMonths(baseDate, 1), 8),
    },
    id: 8,
  },

  {
    dateRange: {
      start: addDays(addMonths(baseDate, 2), 1),
      end: addDays(addMonths(baseDate, 2), 5),
    },
    id: 9,
  },
  {
    dateRange: {
      start: addDays(addMonths(baseDate, 2), 2),
      end: addDays(addMonths(baseDate, 2), 6),
    },
    id: 10,
  },
  {
    dateRange: {
      start: addDays(addMonths(baseDate, 2), 3),
      end: addDays(addMonths(baseDate, 2), 7),
    },
    id: 11,
  },
  {
    dateRange: {
      start: addDays(addMonths(baseDate, 2), 4),
      end: addDays(addMonths(baseDate, 2), 8),
    },
    id: 12,
  },

  {
    dateRange: {
      start: addDays(addMonths(baseDate, 3), 1),
      end: addDays(addMonths(baseDate, 3), 5),
    },
    id: 13,
  },
  {
    dateRange: {
      start: addDays(addMonths(baseDate, 3), 2),
      end: addDays(addMonths(baseDate, 3), 6),
    },
    id: 14,
  },
  {
    dateRange: {
      start: addDays(addMonths(baseDate, 3), 3),
      end: addDays(addMonths(baseDate, 3), 7),
    },
    id: 15,
  },
  {
    dateRange: {
      start: addDays(addMonths(baseDate, 3), 4),
      end: addDays(addMonths(baseDate, 3), 8),
    },
    id: 16,
  },
];
