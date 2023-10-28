import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
  const props = {
    validateFields: [],
    onChange: jest.fn(),
    controllerProps: {},
    label: 'checkbox label',
    disabled: false,
    name: 'name',
    className: 'className',
    defaultChecked: false
  }
  const WrappedCheckbox = () => {
    const form = useForm();
    return <FormProvider {...form}>
      <Checkbox {...props} />
    </FormProvider>
  }
  test('renders component', () => {
    render(<WrappedCheckbox />);
    expect(screen.queryByText('checkbox label')).toBeInTheDocument();
  });
  test('on click triggers on change', () => {
    render(<WrappedCheckbox />);
    //click checkbox
    userEvent.click(screen.getByText('checkbox label'));
    //check onChange is called
    expect(props.onChange).toBeCalled();
  });
});
