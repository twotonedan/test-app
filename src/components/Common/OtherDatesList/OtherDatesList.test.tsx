import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import OtherDatesList from './OtherDatesList';

describe('OtherDatesList', () => {
  const props = {
    title: 'title',
    formBaseName: 'formBaseName',
    isSingleDate: true,
    limit: 1,
    className: 'className',
    showMore: true,
    calendarInfo: {
      '2023-05-31T00:00:00.000Z': { price: 98602, isHoliday: false, isUnavailable: false },
      '2023-06-01T00:00:00.000Z': { price: 95556, isHoliday: true, isUnavailable: false },
      '2023-06-02T00:00:00.000Z': { price: 36690, isHoliday: false, isUnavailable: false }
    }
  }
  const WrappedComponent = () => {
    const form = useForm();
    const [queryClient] = useState(() => new QueryClient());
    return <QueryClientProvider client={queryClient}>
      <FormProvider {...form}>
        <OtherDatesList {...props} />
      </FormProvider>
    </QueryClientProvider>
  }
  test('renders component', () => {
    render(<WrappedComponent />);
    expect(screen.queryByText('title')).toBeInTheDocument();
    expect(screen.queryByText('$986.02')).toBeInTheDocument();
  });
});
