import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DataTable from './DataTable';
import { TABLE_DATA, TABLE_COLUMNS } from '@/mock/TABLE_DATA';
import { ButtonCellFormatter } from '@/utils/cellFormatters';
import { IComparator } from '@/types/dockQueue';

jest.mock('next/font/google', () => ({
  Maven_Pro: () => ({
    style: {
      fontFamily: 'Maven Pro',
    },
  }),
}));

describe('DataTable', () => {
  test('renders component correctly', () => {
    render(<DataTable data={TABLE_DATA} columns={TABLE_COLUMNS} />);

    expect(screen.getByText('Id')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('test1')).toBeInTheDocument();
  });
  test('add button', async () => {
    const onClickJest = jest.fn();
    render(<DataTable
      data={TABLE_DATA}
      columns={TABLE_COLUMNS}
      addButtonConfig={{
        onClick: onClickJest,
        label: '+ Add Stuff',
      }}
    />);

    expect(screen.queryByText('+ Add Stuff')).toBeInTheDocument();

    userEvent.click(screen.getByText('+ Add Stuff'));
    await waitFor(() => {
      expect(onClickJest).toBeCalled();
    });
  });
  test('cell button', async () => {
    const onClickJest = jest.fn();
    const dataProps = {
      row: [],
      value: '4444',
    }
    const appendedTableColumns = [
      ...TABLE_COLUMNS,
      {
        field: 'test',
        headerName: 'Id2',
        comparator: 'string' as IComparator,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatter: (): any => ButtonCellFormatter({ onClick: onClickJest, dataProps }),
        pinned: true,
      }
    ];
    render(<DataTable data={TABLE_DATA} columns={appendedTableColumns} />);

    expect(screen.queryAllByText('4444')[0]).toBeInTheDocument();
    userEvent.click(screen.queryAllByText('4444')[0]);
    await waitFor(() => {
      expect(onClickJest).toBeCalled();
    });
  });
  test('add button', async () => {
    const onClickJest = jest.fn();
    render(<DataTable
      data={TABLE_DATA}
      columns={TABLE_COLUMNS}
      addButtonConfig={{
        onClick: onClickJest,
        label: '+ Add Stuff',
      }}
    />);

    expect(screen.queryByText('+ Add Stuff')).toBeInTheDocument();

    userEvent.click(screen.getByText('+ Add Stuff'));
    await waitFor(() => {
      expect(onClickJest).toBeCalled();
    });
  });
});
