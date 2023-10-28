import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import LocalizationHandler from '@/components/Providers/LocalizationHandler';
import { UserOptionsProvider } from '@/hooks/contexts/useUserOptions';
import DatePickerInput from './DatePickerInput';

describe('DatePickerInput', () => {
  test('renders props on card', () => {
    const WrappedComponent = () => {
      const form = useForm();
      const [queryClient] = useState(() => new QueryClient());
      const onChange = jest.fn();
      return <QueryClientProvider client={queryClient}>
        <UserOptionsProvider>
          <LocalizationHandler>
            <FormProvider {...form}>
              <DatePickerInput
                name='DatePickerInputTitle'
                controllerProps={{}}
                renderInputProps={{}}
                onChange={onChange}
                validateFields={[]}
              />
            </FormProvider>
          </LocalizationHandler>
        </UserOptionsProvider>
      </QueryClientProvider>
    }
    render(
      <WrappedComponent />
    );
    expect(screen.queryByText('DatePickerInputTitle')).toBeInTheDocument();
  });
});