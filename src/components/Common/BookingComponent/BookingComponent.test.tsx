import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LocalizationHandler from '@/components/Providers/LocalizationHandler';
import { UserOptionsProvider } from '@/hooks/contexts/useUserOptions';
import { FormProvider, useForm } from 'react-hook-form';
import { BookingInformationType } from '@/types/enums';
import BookingComponent from './BookingComponent';

const onChange = jest.fn();
const [queryClient] = useState(() => new QueryClient());
const form = useForm();

describe('BookingComponent', () => {
  test('renders duration component', () => {
    const WrappedComponent = () => {
      return <QueryClientProvider client={queryClient}>
        <UserOptionsProvider>
          <LocalizationHandler>
            <FormProvider {...form}>
              <BookingComponent
                name='test-name'
                type={BookingInformationType.DURATION}
                validateFields={[]}
                withHourLabel
                onChange={onChange}
              />
            </FormProvider>
          </LocalizationHandler>
        </UserOptionsProvider>
      </QueryClientProvider>
    }
    render(<WrappedComponent />);
    expect(screen.queryByText('Duration')).toBeInTheDocument();
  });
  test('renders predefined component', () => {
    const WrappedComponent = () => {
      return <QueryClientProvider client={queryClient}>
        <UserOptionsProvider>
          <LocalizationHandler>
            <FormProvider {...form}>
              <BookingComponent
                name='test-name'
                type={BookingInformationType.DURATION}
                validateFields={[]}
                withHourLabel
                onChange={onChange}
              />
            </FormProvider>
          </LocalizationHandler>
        </UserOptionsProvider>
      </QueryClientProvider>
    }
    render(<WrappedComponent />);
    expect(screen.queryByText('Predefined')).toBeInTheDocument();
  });
  test('renders custom range component', () => {
    const WrappedComponent = () => {
      return <QueryClientProvider client={queryClient}>
        <UserOptionsProvider>
          <LocalizationHandler>
            <FormProvider {...form}>
              <BookingComponent
                name='test-name'
                type={BookingInformationType.DURATION}
                validateFields={[]}
                withHourLabel
                onChange={onChange}
              />
            </FormProvider>
          </LocalizationHandler>
        </UserOptionsProvider>
      </QueryClientProvider>
    }
    render(<WrappedComponent />);
    expect(screen.queryByText('Custom Range')).toBeInTheDocument();
  });
});
