import { IBookingAccessory, IColumn, ICardView, IActionProps, IBooking, ICharge } from '@/types/dockQueue';
import { viewListStatusIndicator } from '@/types/viewListElement';
import { format } from 'date-fns';

export const DOCK_QUEUE_ACTIONS: IActionProps[] = [
  {
    id: 'accessories',
    name: 'Accessories',
    show: true,
  },
  {
    id: 'assign',
    name: 'Assign',
    show: true,
  },
  {
    id: 'launch',
    name: 'Launch',
    show: true,
  },
];
export const WATER_QUEUE_ACTIONS: IActionProps[] = [
  {
    id: 'assign',
    name: 'Assign',
    show: true,
  },
  {
    id: 'return',
    name: 'Return',
    show: true,
  },
  {
    id: 'addCharges',
    name: 'Add Charges',
    show: true,
  },
];

export const DOCK_QUEUE_COLUMNS: IColumn[] = [
  {
    field: 'bookingId',
    headerName: 'Booking ID',
    formatter: ({ value }) => value,
    pinned: true,
    example: '228495',
    comparator: 'string',
  },
  {
    field: 'customerName',
    headerName: 'Customer Name',
    formatter: ({ value }) => value,
    pinned: true,
    example: 'Dave Smith',
    comparator: 'string',
  },
  {
    field: 'item',
    headerName: 'Item',
    formatter: ({ value }) => <a href='www.google.com'>{value?.title}</a>,
    pinned: false,
    example: 'Pontoon',
    show: true,
    comparator: 'options',
    options: [
      {
        id: '1',
        title: 'Pontoon',
      },
      {
        id: '2',
        title: 'Bike',
      },
    ],
  },
  {
    field: 'launch',
    headerName: 'Launch At',
    formatter: ({ value }) => format(new Date(value), 'MM/dd, h:mm a'),
    pinned: false,
    example: '09/30, 9:00 AM',
    show: true,
    comparator: 'date',
  },
  {
    field: 'return',
    headerName: 'Return',
    formatter: ({ value }) => format(new Date(value), 'MM/dd, h:mm a'),
    pinned: false,
    example: '10/30, 12:00 AM',
    show: true,
    comparator: 'date',
  },
];
export const WATER_QUEUE_COLUMNS = DOCK_QUEUE_COLUMNS;
export const BOOKING_CHARGES: ICharge[] = [
  {
    id: 'numberOfBoatHours',
    name: 'Number of Boat Hours',
    value: 3,
    rate: 10,
    units: 'Hours',
  },
  {
    id: '2',
    name: 'Deposit Refund',
    value: -10,
    isCurrency: true,
  },
  {
    id: '3',
    name: 'Damage Deposit Refund',
    value: 43,
    isCurrency: true,
    required: true,
  },
  {
    id: '4',
    name: 'Late Fees',
    value: 0,
    isCurrency: true,
    required: true,
  },
  {
    id: '5',
    name: 'Misc NON-Taxable',
    value: 0,
    isCurrency: true,
  },
  {
    id: '6',
    name: 'Fuel Charges',
    value: 43,
    isCurrency: true,
  },
];
export const ACCESSORIES: IBookingAccessory[] = [
  {
    id: '1',
    title: 'Bike Rack',
    quantity: 1,
    tag: viewListStatusIndicator.mandatory,
    rate: 10,
    isSelected: true,
  },
  {
    id: '2',
    title: 'Child Seat',
    quantity: 3,
    rate: 10,
  },
  {
    id: '3',
    title: 'Insurance',
    quantity: 1,
    rate: 10,
    isSelected: true,
  },
];
export const BOOKINGS: IBooking[] = [
  {
    id: '1',
    customerName: 'Doug Funny',
    bookingId: '111135',
    item: {
      id: '1',
      title: 'Bike',
    },
    customerNote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    accessories: ACCESSORIES,
    launch: new Date('2023-12-26T01:00:00.000Z'),
    return: new Date('2023-12-26T01:00:00.000Z'),
    assignee: '1',
    charges: BOOKING_CHARGES,
  },
  {
    id: '2',
    customerName: 'Skeeter Valentine',
    bookingId: '333135',
    item: {
      id: '1',
      title: 'Bike',
    },
    customerNote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    accessories: ACCESSORIES,
    launch: new Date('2023-12-26T01:00:00.000Z'),
    return: new Date('2023-12-26T01:00:00.000Z'),
    assignee: '1',
    charges: BOOKING_CHARGES,
  },
  {
    id: '3',
    customerName: 'Patty Mayonnaise',
    bookingId: '666135',
    item: {
      id: '1',
      title: 'Bike',
    },
    customerNote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    accessories: ACCESSORIES,
    launch: new Date('2023-12-26T01:00:00.000Z'),
    return: new Date('2023-12-26T01:00:00.000Z'),
    assignee: '1',
    charges: BOOKING_CHARGES,
  },
  {
    id: '4',
    customerName: 'Roger Klotz',
    bookingId: '222135',
    item: {
      id: '1',
      title: 'Bike',
    },
    customerNote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    accessories: ACCESSORIES,
    launch: new Date('2023-12-26T01:00:00.000Z'),
    return: new Date('2023-12-26T01:00:00.000Z'),
    assignee: '1',
    charges: BOOKING_CHARGES,
  },
  {
    id: '5',
    customerName: 'Mr. Dink',
    bookingId: '635235',
    item: {
      id: '1',
      title: 'Bike',
    },
    customerNote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    accessories: ACCESSORIES,
    launch: new Date('2023-12-26T01:00:00.000Z'),
    return: new Date('2023-12-26T01:00:00.000Z'),
    assignee: '1',
    charges: BOOKING_CHARGES,
  },
  {
    id: '6',
    customerName: 'Quale Man',
    bookingId: '965135',
    item: {
      id: '1',
      title: 'Bike',
    },
    customerNote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    accessories: ACCESSORIES,
    launch: new Date('2023-12-26T01:00:00.000Z'),
    return: new Date('2023-12-26T01:00:00.000Z'),
    assignee: '1',
    charges: BOOKING_CHARGES,
  },
  {
    id: '7',
    customerName: 'Judy Funny',
    bookingId: '985135',
    item: {
      id: '1',
      title: 'Pontoon',
    },
    customerNote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    accessories: ACCESSORIES,
    launch: new Date('2023-12-26T01:00:00.000Z'),
    return: new Date('2023-12-26T01:00:00.000Z'),
    assignee: '1',
    charges: BOOKING_CHARGES,
  },
];
export const WATER_QUEUE_CARD_VIEWS: ICardView[] = [
  {
    id: '1',
    name: 'Card View 1',
    subName: 'Tom Green',
    isPrivate: true,
    tag: viewListStatusIndicator.default,
    sortField: 'bookingId',
    sortOrder: 'asc',
    columns: WATER_QUEUE_COLUMNS,
    actions: WATER_QUEUE_ACTIONS,
    userIsOwner: true,
    isDefault: true,
  },
  {
    id: '2',
    name: 'Card View 2',
    subName: 'Admin',
    isPrivate: true,
    tag: viewListStatusIndicator.private,
    sortField: 'bookingId',
    isCustomView: true,
    sortOrder: 'asc',
    columns: WATER_QUEUE_COLUMNS.slice(0, 2),
    actions: WATER_QUEUE_ACTIONS.slice(0, 1),
    userIsOwner: true,
    isDefault: false,
  },
  {
    id: '3',
    name: 'Card View 3',
    subName: 'Tom Green',
    isPrivate: true,
    tag: viewListStatusIndicator.standard,
    sortField: 'bookingId',
    sortOrder: 'asc',
    columns: WATER_QUEUE_COLUMNS.slice(0, 3),
    actions: WATER_QUEUE_ACTIONS,
    userIsOwner: true,
    isDefault: false,
  },
  {
    id: '4',
    name: 'Card View 4',
    subName: 'Tom Green',
    isPrivate: false,
    sortField: 'bookingId',
    isCustomView: true,
    sortOrder: 'asc',
    columns: WATER_QUEUE_COLUMNS,
    actions: WATER_QUEUE_ACTIONS,
    userIsOwner: false,
    isDefault: false,
  },
];
export const WATER_QUEUE_TABLE_VIEWS: ICardView[] = [
  {
    id: '1',
    name: 'Card View 1',
    subName: 'Tom Green',
    isPrivate: true,
    tag: viewListStatusIndicator.default,
    sortField: 'bookingId',
    sortOrder: 'asc',
    columns: WATER_QUEUE_COLUMNS,
    actions: WATER_QUEUE_ACTIONS,
    userIsOwner: true,
    isDefault: true,
  },
  {
    id: '2',
    name: 'Card View 2',
    subName: 'Admin',
    isPrivate: true,
    tag: viewListStatusIndicator.private,
    sortField: 'bookingId',
    sortOrder: 'asc',
    columns: WATER_QUEUE_COLUMNS.slice(0, 2),
    actions: WATER_QUEUE_ACTIONS.slice(0, 1),
    userIsOwner: true,
    isDefault: false,
  },
  {
    id: '3',
    name: 'Card View 3',
    subName: 'Tom Green',
    isPrivate: true,
    tag: viewListStatusIndicator.standard,
    sortField: 'bookingId',
    sortOrder: 'asc',
    columns: WATER_QUEUE_COLUMNS.slice(0, 3),
    actions: WATER_QUEUE_ACTIONS,
    userIsOwner: true,
    isDefault: false,
  },
  {
    id: '4',
    name: 'Card View 4',
    subName: 'Tom Green',
    isPrivate: false,
    sortField: 'bookingId',
    sortOrder: 'asc',
    columns: WATER_QUEUE_COLUMNS,
    actions: WATER_QUEUE_ACTIONS,
    userIsOwner: false,
    isDefault: false,
  },
];
export const DOCK_QUEUE_CARD_VIEWS: ICardView[] = [
  {
    id: '1',
    name: 'Card View 1',
    subName: 'Tom Green',
    isPrivate: true,
    tag: viewListStatusIndicator.default,
    sortField: 'bookingId',
    sortOrder: 'asc',
    columns: DOCK_QUEUE_COLUMNS,
    actions: DOCK_QUEUE_ACTIONS,
    userIsOwner: true,
    isDefault: true,
  },
  {
    id: '2',
    name: 'Card View 2',
    subName: 'Admin',
    isPrivate: true,
    tag: viewListStatusIndicator.private,
    sortField: 'bookingId',
    sortOrder: 'asc',
    columns: DOCK_QUEUE_COLUMNS.slice(0, 2),
    actions: DOCK_QUEUE_ACTIONS.slice(0, 1),
    userIsOwner: true,
    isDefault: false,
  },
  {
    id: '3',
    name: 'Card View 3',
    subName: 'Tom Green',
    isPrivate: true,
    tag: viewListStatusIndicator.standard,
    sortField: 'bookingId',
    sortOrder: 'asc',
    columns: DOCK_QUEUE_COLUMNS.slice(0, 3),
    actions: DOCK_QUEUE_ACTIONS,
    userIsOwner: true,
    isDefault: false,
  },
  {
    id: '4',
    name: 'Card View 4',
    subName: 'Tom Green',
    isPrivate: false,
    sortField: 'bookingId',
    sortOrder: 'asc',
    columns: DOCK_QUEUE_COLUMNS,
    actions: DOCK_QUEUE_ACTIONS,
    userIsOwner: false,
    isDefault: false,
  },
];
export const DOCK_QUEUE_TABLE_VIEWS: ICardView[] = [
  {
    id: '1',
    name: 'Table View 1',
    subName: 'Tom Green',
    isPrivate: true,
    tag: viewListStatusIndicator.default,
    sortField: 'bookingId',
    sortOrder: 'asc',
    columns: DOCK_QUEUE_COLUMNS,
    actions: DOCK_QUEUE_ACTIONS,
    userIsOwner: true,
    isDefault: true,
  },
  {
    id: '2',
    name: 'Table View 2',
    subName: 'Admin',
    isPrivate: true,
    tag: viewListStatusIndicator.private,
    sortField: 'bookingId',
    sortOrder: 'asc',
    columns: DOCK_QUEUE_COLUMNS.slice(0, 2),
    actions: DOCK_QUEUE_ACTIONS.slice(0, 1),
    userIsOwner: true,
    isDefault: false,
  },
  {
    id: '3',
    name: 'Table View 3',
    subName: 'Tom Green',
    isPrivate: true,
    tag: viewListStatusIndicator.standard,
    sortField: 'bookingId',
    sortOrder: 'asc',
    columns: DOCK_QUEUE_COLUMNS.slice(0, 3),
    actions: DOCK_QUEUE_ACTIONS,
    userIsOwner: true,
    isDefault: false,
  },
  {
    id: '4',
    name: 'Table View 4',
    subName: 'Tom Green',
    isPrivate: false,
    sortField: 'bookingId',
    sortOrder: 'asc',
    columns: DOCK_QUEUE_COLUMNS,
    actions: DOCK_QUEUE_ACTIONS,
    userIsOwner: false,
    isDefault: false,
  },
];
export type IViews = {
  cardViews: ICardView[];
  tableViews: ICardView[];
};
export const DOCK_QUEUE_VIEWS: IViews = {
  cardViews: DOCK_QUEUE_CARD_VIEWS,
  tableViews: DOCK_QUEUE_TABLE_VIEWS,
};
export const WATER_QUEUE_VIEWS: IViews = {
  cardViews: WATER_QUEUE_CARD_VIEWS,
  tableViews: WATER_QUEUE_TABLE_VIEWS,
};