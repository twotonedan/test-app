import { IViewFormValues } from '@/types/dockQueue';

type IModalType = 'add' | 'edit' | 'duplicate';

export type ICardViewModalProps = {
  data: IViewFormValues;
  modalType: IModalType;
};

export const CARD_VIEW_DATA: IViewFormValues = {
  name: 'Card View 1',
  isPrivate: true,
  sortField: '2',
  sortOrder: 'asc',
  actions: [
    {
      id: '1',
      name: 'Assign',
      show: true,
    },
    {
      id: '2',
      name: 'Return',
      show: false,
    },
    {
      id: '3',
      name: 'Add Accessory',
      show: true,
    },
  ],
  columns: [
    {
      field: '1',
      headerName: 'ID',
      show: true,
      formatter: ({ value }) => value,
      example: '123',
      comparator: 'string',
    },
    {
      field: '3',
      headerName: 'Name',
      show: false,
      formatter: ({ value }) => value,
      example: 'John Doe',
      comparator: 'string',
    },
    {
      field: '2',
      headerName: 'Email',
      show: true,
      formatter: ({ value }) => value,
      example: 'john@doe.com',
      comparator: 'string',
    },
    {
      field: '4',
      headerName: 'Address',
      show: true,
      formatter: ({ value }) => value,
      example: '123 Main St.',
      comparator: 'string',
    },
    {
      field: '5',
      headerName: 'Phone',
      show: true,
      formatter: ({ value }) => value,
      example: '123-456-7890',
      comparator: 'string',
    },
  ],
};
