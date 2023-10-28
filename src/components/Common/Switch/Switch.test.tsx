import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';
import Switch from './Switch';

describe('Switch', () => {
  const props = {
    name: 'name',
    controllerProps: {},
    onChange: jest.fn(),
    validateFields: [],
    defaultValue: 'false',
    defaultChecked: false,
    label: 'switch label',
    className: 'className'
  }
  const WrappedComponent = () => {
    const form = useForm();
    return <FormProvider {...form}>
      <Switch {...props} />
    </FormProvider>
  }
  test('renders component', () => {
    render(<WrappedComponent />);
    expect(screen.queryByText('switch label')).toBeInTheDocument();
  });
  test('on click triggers on change', () => {
    render(<WrappedComponent />);
    //click switch
    userEvent.click(screen.getByText('switch label'));
    //check onChange is called
    expect(props.onChange).toBeCalled();
  });
});
