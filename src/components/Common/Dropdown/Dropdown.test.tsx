import { act, fireEvent, render, renderHook, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';
import Dropdown from './Dropdown';
import { FormProvider, useForm } from 'react-hook-form';

let container: any;

const testData = {
  labelId: 'TestSelect',
  name: 'DropdownName',
  onChange: jest.fn().mockImplementation(() => {}),
  options: [
    { label: 'Option A', value: 'A_Value', },
    { label: 'Option B', value: 'B_Value', },
    { label: 'Option C', value: 'C_Value', },
  ]
};

jest.mock('next/font/google', () => ({
  Maven_Pro: () => ({
    style: {
      fontFamily: 'Maven Pro',
    },
  }),
}));

describe('Dropdown', () => {
    afterEach(() => {
        jest.clearAllMocks();
      });
    
    const FormComponent = ({_testData }: {_testData: any}) => {
        const formMethods = useForm({});
        return <FormProvider {...formMethods}>
        <Dropdown
            labelId={_testData.labelId}
            options={_testData.options}
            name={_testData.name}
            label={_testData.name}
            onChange={_testData.onChange}
            defaultValue={_testData.defaultValue || undefined}
            />
    </FormProvider>
}

  test('No Default, Verify Base, Select Option', async () => {
    render(<FormComponent _testData={testData} />)

    await waitFor(() => {
        expect(screen.getByTestId(testData.labelId)).toBeInTheDocument();
    })
    const selectBox = screen.getByTestId(testData.labelId);
    expect(selectBox).toHaveAttribute('name', testData.name);
    expect(selectBox).toHaveValue('');
    await act( async () => {
        userEvent.click(screen.getByRole('button'));
    })
    await waitFor(() => {
        expect(screen.getAllByRole('option').length).toBe(3);
    })
    await waitFor(() => {
        expect(testData.onChange as jest.Mock).not.toHaveBeenCalled()
    })
    await act( async () => {
        userEvent.click(screen.getAllByRole('option')[0]);
    })
    await waitFor(() => {
        expect(screen.queryAllByRole('option').length).toBe(0);
    })
    await waitFor(() => {
        expect(testData.onChange as jest.Mock).toHaveBeenCalled();
    })
  });

  test('Default Value, Change Option', async () => {
    render(<FormComponent _testData={{...testData, defaultValue: testData.options[1].value}} />)

    await waitFor(() => {
        expect(screen.getByTestId(testData.labelId)).toBeInTheDocument();
    })
    const selectBox = screen.getByTestId(testData.labelId);
    expect(selectBox).toHaveAttribute('name', testData.name);
    expect(selectBox).toHaveValue(testData.options[1].value);
    await act( async () => {
        userEvent.click(screen.getByRole('button'));
    })
    await waitFor(() => {
        expect(screen.getAllByRole('option').length).toBe(3);
    })
    await waitFor(() => {
        expect(testData.onChange as jest.Mock).not.toHaveBeenCalled()
    })
    await act( async () => {
        userEvent.click(screen.getAllByRole('option')[2]);
    })
    await waitFor(() => {
        expect(screen.queryAllByRole('option').length).toBe(0);
    })
    await waitFor(() => {
        expect(testData.onChange as jest.Mock).toHaveBeenCalled();
    })
  });
});
