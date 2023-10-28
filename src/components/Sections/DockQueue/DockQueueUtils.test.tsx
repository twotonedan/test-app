import '@testing-library/jest-dom';
import { sortFunction, mapCardProps } from './DockQueueUtils';
import { DOCK_QUEUE_CARD_VIEWS, BOOKINGS } from '@/mock/DOCK_QUEUE';

jest.mock('next/font/google', () => ({
  Maven_Pro: () => ({
    style: {
      fontFamily: 'Maven Pro',
    },
  }),
}));

describe('DockQueueUtils', () => {
  test('sortFunction', async () => {
    const a = BOOKINGS[0]
    const b = BOOKINGS[1]
    const currentCardView = DOCK_QUEUE_CARD_VIEWS[0]
    expect(sortFunction(a, b, currentCardView, 'bookingId', 'asc')).toBe(-1);
    expect(sortFunction(a, b, currentCardView, 'bookingId', 'desc')).toBe(1);
    expect(sortFunction(a, b, currentCardView, 'customerName', 'asc')).toBe(-1);
    expect(sortFunction(a, b, currentCardView, 'customerName', 'desc')).toBe(1);
  });
  test('mapCardProps', async () => {
    const expected = {
      id: '111135',
      name: 'Doug Funny',
      fields: [
        {
          headerName: 'Item',
          value: 'Bike'
        },
        {
          headerName: 'Launch At',
          value: '2015-03-25'
        },
        {
          headerName: 'Return',
          value: '2015-03-25'
        },
      ],
      cardButtons: [
        {
          buttonLabel: 'Accessories',
          onClick: () => { }
        },
        {
          buttonLabel: 'Assign',
          onClick: () => { }
        },
        {
          buttonLabel: 'Launch',
          onClick: () => { }
        },
      ]
    }
    expect(mapCardProps({ view: DOCK_QUEUE_CARD_VIEWS[0], entry: BOOKINGS[0], actionsMap: {} }).toString()).toBe(expected.toString());
  });
});