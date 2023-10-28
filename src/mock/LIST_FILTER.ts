import { IListFilter, SortDirections } from '@/types/dockQueue';

export const LIST_FILTER: IListFilter = {
  sortField: 'id',
  sortOrder: SortDirections.ASC,
  setFilterFields: () => {},
  setSortField: () => {},
  setSortOrder: () => {},
  fields: [
    {
      field: 'customer',
      headerName: 'Customer',
      comparator: 'string',
      example: 'Doug Funny',
      show: true,
      pinned: true,
    },
    {
      field: 'itemGroup',
      headerName: 'Item Group',
      comparator: 'string',
      example: 'Pontoon',
      show: true,
      pinned: true,
    },
    {
      field: 'itemType',
      headerName: 'Item Type',
      comparator: 'string',
      example: 'Doug Funny',
      show: true,
      pinned: true,
    },
  ],
  savedFilters: [],
  filterFields: [
    {
      field: 'customer',
      contains: 'Pontoon',
    },
    {
      field: 'itemGroup',
      contains: 'Pontoon',
    },
    {
      field: 'itemType',
      contains: 'Pontoon',
    },
  ],
};
