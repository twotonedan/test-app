import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LocalizationHandler from '@/components/Providers/LocalizationHandler';
import { UserOptionsProvider } from '@/hooks/contexts/useUserOptions';
import { NextAdapter } from 'next-query-params';
import { QueryParamProvider } from 'use-query-params';
import PromoCodeInput from './PromoCodeInput';

describe('PromoCodeInput', () => {
  const props = {
    disabledCondition: false
  }
  const WrappedComponent = () => {
    const form = useForm();
    const [queryClient] = useState(() => new QueryClient());
    return <QueryClientProvider client={queryClient}>
      <QueryParamProvider adapter={NextAdapter}>
        <UserOptionsProvider>
          <LocalizationHandler>
            <FormProvider {...form}>
              <PromoCodeInput {...props} />
            </FormProvider>
          </LocalizationHandler>
        </UserOptionsProvider>
      </QueryParamProvider>
    </QueryClientProvider>
  }
  test('renders component', () => {
    const test = render(<WrappedComponent />);
    console.log('test', test.baseElement)
    console.log('test2', screen.getByText('promoCode'))
    expect(screen.getByText('promoCode')).toBeInTheDocument();
  });
});
