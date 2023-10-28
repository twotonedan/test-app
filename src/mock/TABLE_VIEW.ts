import { IColumn } from '@/types/dockQueue';

type IData = {
  items: IColumn[];
};

export const TABLE_VIEW_DATA: IData = {
  items: [
    {
      field: '1',
      headerName: 'ID',
      show: true,
      pinned: true,
      comparator: 'string',
    },
    {
      field: '3',
      headerName: 'Name',
      show: false,
      pinned: true,
      comparator: 'string',
    },
    {
      field: '2',
      headerName: 'Email',
      show: true,
      pinned: false,
      comparator: 'string',
    },
    {
      field: '4',
      headerName: 'Address',
      show: true,
      pinned: false,
      comparator: 'string',
    },
    {
      field: '5',
      headerName: 'Phone',
      show: true,
      pinned: false,
      comparator: 'string',
    },
  ],
};
