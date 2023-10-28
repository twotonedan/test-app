import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SwiperCalendar from './SwiperCalendar';

describe('SwiperCalendar', () => {
  const props = {
    className: 'className',
    handleOnChangeCalendar: jest.fn(),
    handleRenderDay: jest.fn(),
    initialMinDate: new Date(),
    monthsQuantity: 1,
  }
  test('renders component', () => {
    render(<SwiperCalendar {...props} />);
    expect(screen.queryByText(new Date().toString())).toBeInTheDocument();
  });
});
