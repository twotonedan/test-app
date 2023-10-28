import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DateRangePicker from './DateRangePicker';

describe('DateRangePicker', () => {
  const props = {
    name: 'name',
    className: 'className',
    calendarInfo: {},
    withPrices: true,
    initialMinDate: Date.now(),
    monthsQuantity:12,
  }
  test('renders component', () => {
    render(<DateRangePicker {...props} />);
    expect(screen.queryByText('start')).toBeInTheDocument();
    expect(screen.queryByText('end')).toBeInTheDocument();
  });
});
