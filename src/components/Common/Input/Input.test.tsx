import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FormProvider, useForm } from 'react-hook-form';
import Input from './Input';

describe('Input', () => {
  const props = {
    controllerProps: {},
    name: 'name',
    InputProps: {},
    InputLabelProps: {},
    keepInputFocused: true,
    validateFields: [],
    onChange: jest.fn(),
    onFocus: jest.fn(),
    onBlur: jest.fn(),
    supportingText: 'supportingText',
    isRequired: true,
    className: 'className'
  }
  const WrappedComponent = () => {
    const form = useForm();
    return <FormProvider {...form}>
      <Input {...props} />
    </FormProvider>
  }
  test('renders component', () => {
    render(<WrappedComponent />);
    expect(screen.queryByText('name')).toBeInTheDocument();
  });
  test('onChange', () => {
    render(<WrappedComponent />);
    //change input value
    //check onChange is called
    expect(props.onChange).toBeCalled();
  });
  test('onFocus', () => {
    render(<WrappedComponent />);
    //click input
    //check onFocus is called
    expect(props.onFocus).toBeCalled();
  });
  test('onBlur', () => {
    render(<WrappedComponent />);
    //click off of input
    //check onBlur is called
    expect(props.onBlur).toBeCalled();
  });
});
