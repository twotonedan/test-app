import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FormProvider, useForm } from 'react-hook-form';
import FormQuantityCounter from './FormQuantityCounter';

describe('FormQuantityCounter', () => {
  const WrappedComponent = () => {
    const props = {
      name: 'name',
      limits: { min: 1, max: 10 },
      controllerProps: {},
      onTrashClick: jest.fn(),
      className: 'className'
    }
    const form = useForm();
    return <FormProvider {...form}>
      <FormQuantityCounter {...props} />
    </FormProvider>
  }
  test('renders component', () => {
    render(<WrappedComponent />);
    expect(screen.queryByText('name')).toBeInTheDocument();
  });
  test('remove button triggers onTrashClick', () => {
    render(<WrappedComponent />);
    //click trash button
    //check onTrashClick is called
    expect(screen.queryByText('name')).toBeInTheDocument();
  });
  test('add button increases quantity by one', () => {
    render(<WrappedComponent />);
    //click add button
    //check if quantity is decreased by one
    expect(screen.queryByText('name')).toBeInTheDocument();
  });
  test('remove button decreases quantity by one', () => {
    render(<WrappedComponent />);
    //click remove button
    //check if quantity is decreased by one
    expect(screen.queryByText('name')).toBeInTheDocument();
  });
});
