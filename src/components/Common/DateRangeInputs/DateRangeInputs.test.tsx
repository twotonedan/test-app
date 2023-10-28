import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import DateRangeInputs from './DateRangeInputs';

describe('DateRangeInputs', () => {
  const props = {
    className: 'className',
    name: 'name',
    start: {
      validateFields: [],
      onChange: jest.fn(),
    },
    end: {
      validateFields: [],
      onChange: jest.fn(),
    }
  }
  test('renders component', () => {
    render(<DateRangeInputs {...props} />);
    expect(screen.queryByText('start')).toBeInTheDocument();
    expect(screen.queryByText('end')).toBeInTheDocument();
  });
  test('changing start date, calls onChange', () => {
    render(<DateRangeInputs {...props} />);
    // click start date field
    userEvent.click(screen.getByText('start'));
    // click date
    userEvent.click(screen.getByText('25'));
    // expect onChange to be called 
    expect(props.start.onChange).toBeCalled();
  });
  test('changing end date, calls onChange', () => {
    render(<DateRangeInputs {...props} />);
    // click end date field
    userEvent.click(screen.getByText('end'));
    // click date
    userEvent.click(screen.getByText('25'));
    // expect onChange to be called 
    expect(props.end.onChange).toBeCalled();
  });
});
