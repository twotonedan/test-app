import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserOptionsProvider } from '@/hooks/contexts/useUserOptions';
import CustomPickersDay from './CustomPickersDay';

describe('CustomPickersDay', () => {
  test('renders component', () => {
    const props = {
      className: 'className',
      isDaySelected: true,
      isHoliday: false,
      isUnavailable: false,
      withPrices: true,
      price: 5,
      day: new Date(),
      onDaySelect: jest.fn(),
      outsideCurrentMonth: false
    }
    const [queryClient] = useState(() => new QueryClient());
    render(<QueryClientProvider client={queryClient}>
      <UserOptionsProvider>
        <CustomPickersDay {...props} />
      </UserOptionsProvider>
    </QueryClientProvider>
    );
    expect(screen.queryByText('5')).toBeInTheDocument();
  });
});
