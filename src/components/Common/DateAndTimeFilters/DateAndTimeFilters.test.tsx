import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DateAndTimeFilters from './DateAndTimeFilters';
import { BookingInformationType } from '@/types/enums';

describe('DateAndTimeFilters', () => {
  test('renders component', () => {
    const props = {
      name: 'name',
      isSingleDate: true,
      calendarInfo: {},
      bookingInformationOption: BookingInformationType.DURATION,
      withPrices: true,
      allowWaitlist: false,
      onClickSaveInsideCalendar: jest.fn(),
      onClickWaitlist: jest.fn(),
      onChangeTimeRange: jest.fn(),
      withLabels: true,
      withDivider: false
    }
    render(<DateAndTimeFilters {...props} />);
    expect(screen.queryByText('anchor')).toBeInTheDocument();
  });
});
