import { ButtonCellFormatter, LinkCellFormatter } from '@/utils/cellFormatters';
import { IColumn, IComparator } from '@/types/dockQueue';

export type ITableData = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  list: any[];
  totalSize: number;
};

export const TABLE_DATA: ITableData = {
  list: [
    {
      id: '1',
      name: 'John Smith',
      email: 'test1',
    },
    {
      id: '2',
      name: 'John2 Smith',
      email: 'test2',
    },
    {
      id: '3',
      name: 'John3 Smith',
      email: 'test3',
    },
    {
      id: '4444',
      name: 'John3 Smith',
      email: 'test3333',
    },
    {
      id: '3',
      name: 'John3 Smith',
      email: 'test3',
    },
    {
      id: '3',
      name: 'John3 Smith',
      email: 'test3',
    },
    {
      id: '3',
      name: 'John3 Smith',
      email: 'test3',
    },
  ],
  totalSize: 7,
};

export const TABLE_COLUMNS: IColumn[] = [
  {
    field: 'id',
    headerName: 'Id',
    comparator: 'string' as IComparator,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formatter: (dataProps): any => ButtonCellFormatter({ onClick: () => {}, dataProps }),
    pinned: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    comparator: 'string',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formatter: (dataProps): any => LinkCellFormatter({ url: '', dataProps }),
    pinned: true,
  },
  {
    field: 'name',
    headerName: 'Name',
    comparator: 'string',
  },
  {
    field: 'name',
    headerName: 'Name',
    comparator: 'string',
  },
  {
    field: 'name',
    headerName: 'Name',
    comparator: 'string',
  },
  {
    field: 'name',
    headerName: 'Name',
    comparator: 'string',
  },
  {
    field: 'name',
    headerName: 'Name',
    comparator: 'string',
  },
  {
    field: 'name',
    headerName: 'Name',
    comparator: 'string',
  },
  {
    field: 'name',
    headerName: 'Name',
    comparator: 'string',
  },
];
