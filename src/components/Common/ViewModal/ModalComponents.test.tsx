import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { Header, Body, Footer } from './ModalComponents';
import { TABLE_VIEW_DATA } from '@/mock/TABLE_VIEW';
import { IColumn, IActionProps } from '@/types/dockQueue';

jest.mock('next/font/google', () => ({
  Maven_Pro: () => ({
    style: {
      fontFamily: 'Maven Pro',
    },
  }),
}));

describe('ModalComponents', () => {
  test('Header', async () => {
    const handleOnClose = jest.fn();
    const title = 'Test Title';

    render(<Header title={title} handleOnClose={handleOnClose} />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.queryAllByRole('button')[0]).toBeInTheDocument();
    userEvent.click(screen.queryAllByRole('button')[0]);
    await waitFor(() => {
      expect(handleOnClose).toBeCalled();
    });
  });
  test('Body', async () => {
    const viewFormSchema = yup.lazy(() =>
      yup.object().shape({
        id: yup.string().required(),
        name: yup.string().required(),
        private: yup.boolean(),
        columns: yup.array(),
      })
    );
    type IViewFormValues = {
      id?: string;
      name: string;
      private: boolean;
      columns: IColumn[];
      actions: IActionProps[];
    };
    const deleteView = jest.fn();
    const columns = TABLE_VIEW_DATA.items;
    const Form = () => {
      return <FormProvider
        {...useForm<IViewFormValues>({
          resolver: yupResolver(viewFormSchema),
          defaultValues: {
            name: '',
            private: false,
            columns: columns,
            actions: [],
          }
        })}>
        <Body
          deleteView={deleteView}
          modalType="add"
          isCardView={false} />
      </FormProvider>
    }
    render(<Form />);

    expect(screen.getByText('tableView.viewName')).toBeInTheDocument();
  });
  test('Footer', async () => {
    const onSave = jest.fn();
    const onCancel = jest.fn();
    render(<Footer onSave={onSave} onCancel={onCancel} />);

    expect(screen.queryByText('save')).toBeInTheDocument();
    userEvent.click(screen.getByText('save'));
    await waitFor(() => {
      expect(onSave).toBeCalled();
    });
    expect(screen.queryByText('cancel')).toBeInTheDocument();
    userEvent.click(screen.getByText('cancel'));
    await waitFor(() => {
      expect(onCancel).toBeCalled();
    });
  });
});
