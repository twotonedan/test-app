import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import { RadioGroup } from '@mui/material';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import RadioButton from './RadioButton';

describe('RadioButton', () => {
  const props = {
    label: 'label',
    value: 'value',
    handleClick: jest.fn()
  }
  const props2 = {
    label: 'label 2',
    value: 'value',
    handleClick: jest.fn()
  }
  const WrappedComponent = ({ disabled }: { disabled: boolean }) => {
    const form = useForm();
    const [queryClient] = useState(() => new QueryClient());
    return <QueryClientProvider client={queryClient}>
      <FormProvider {...form}>
        <RadioGroup>
          <RadioButton {...props} disabled={disabled} />
          <RadioButton {...props2} disabled={disabled} />
        </RadioGroup>
      </FormProvider>
    </QueryClientProvider>
  }
  test('renders component', () => {
    render(<WrappedComponent disabled={false} />);
    expect(screen.queryByText('label')).toBeInTheDocument();
  });
  test('clicking component triggers handleClick, when NOT disabled', () => {
    render(<WrappedComponent disabled={false} />);
    //click checkbox
    userEvent.click(screen.getByText('label 2'));
    //check onChange is called
    expect(props2.handleClick).toBeCalled();
  });
  test('clicking component does NOT trigger handleClick, when disabled', () => {
    render(<WrappedComponent disabled={true} />);
    //click checkbox
    userEvent.click(screen.getByText('label 2'));
    //check onChange is NOT called
    expect(props2.handleClick).not.toBeCalled();
  });
});
